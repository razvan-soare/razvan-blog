import { codeToHtml } from 'shiki';

export interface ParsedProjectContent {
  html: string;
  components: ParsedComponent[];
}

export interface ParsedComponent {
  type: 'quote' | 'video' | 'image' | 'gallery' | 'codeblock' | 'callout' | 'linkcard';
  props: Record<string, unknown>;
  id: string;
}

// ============================================
// HTML Escaping
// ============================================

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

// ============================================
// Code Block Processing
// ============================================

interface CodeBlockMatch {
  fullMatch: string;
  language: string;
  code: string;
  showLineNumbers: boolean;
  filename?: string;
}

function parseCodeBlockMeta(firstLine: string): { language: string; showLineNumbers: boolean; filename?: string } {
  // Parse format: ```language{lineNumbers=true,filename=example.ts}
  const metaMatch = firstLine.match(/^```(\w+)?(?:\{([^}]*)\})?/);

  if (!metaMatch) {
    return { language: 'text', showLineNumbers: false };
  }

  const language = metaMatch[1] || 'text';
  const metaString = metaMatch[2] || '';

  let showLineNumbers = false;
  let filename: string | undefined;

  if (metaString) {
    // Parse meta options
    const lineNumbersMatch = metaString.match(/lineNumbers\s*=\s*(true|false)/i);
    if (lineNumbersMatch) {
      showLineNumbers = lineNumbersMatch[1].toLowerCase() === 'true';
    }

    const filenameMatch = metaString.match(/filename\s*=\s*["']?([^,"'}\s]+)["']?/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }

  return { language, showLineNumbers, filename };
}

async function processCodeBlocks(content: string): Promise<{ content: string; codeBlocks: Map<string, CodeBlockMatch> }> {
  // Match code blocks with optional meta
  const codeBlockRegex = /```(\w+)?(?:\{[^}]*\})?\n([\s\S]*?)```/g;
  const matches = [...content.matchAll(codeBlockRegex)];
  const codeBlocks = new Map<string, CodeBlockMatch>();

  let result = content;
  let blockIndex = 0;

  for (const match of matches) {
    const fullMatch = match[0];
    const firstLine = fullMatch.split('\n')[0];
    const code = match[2] || '';

    const { language, showLineNumbers, filename } = parseCodeBlockMeta(firstLine);

    const blockId = `__CODE_BLOCK_${blockIndex}__`;
    blockIndex++;

    codeBlocks.set(blockId, {
      fullMatch,
      language,
      code: code.trim(),
      showLineNumbers,
      filename,
    });

    result = result.replace(fullMatch, blockId);
  }

  return { content: result, codeBlocks };
}

async function highlightCodeBlock(code: string, language: string): Promise<string> {
  try {
    const highlighted = await codeToHtml(code, {
      lang: language,
      theme: 'tokyo-night',
    });
    return highlighted;
  } catch {
    // Fallback for unsupported languages
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

// ============================================
// Custom Component Processing
// ============================================

interface ComponentMatch {
  fullMatch: string;
  type: string;
  props: Record<string, string>;
  content?: string;
}

function parseComponentProps(propsString: string): Record<string, string> {
  const props: Record<string, string> = {};

  // Match key="value" or key='value' or key={value}
  const propRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/g;
  let match;

  while ((match = propRegex.exec(propsString)) !== null) {
    const key = match[1];
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    props[key] = value;
  }

  return props;
}

function extractCustomComponents(content: string): { content: string; components: Map<string, ComponentMatch> } {
  const components = new Map<string, ComponentMatch>();
  let result = content;
  let componentIndex = 0;

  // Self-closing components: <ComponentName prop="value" />
  const selfClosingRegex = /<(Quote|Video|Image|Gallery|Callout|LinkCard)\s+([^>]*?)\s*\/>/g;
  let match;

  while ((match = selfClosingRegex.exec(result)) !== null) {
    const fullMatch = match[0];
    const type = match[1];
    const propsString = match[2];

    const componentId = `__COMPONENT_${componentIndex}__`;
    componentIndex++;

    components.set(componentId, {
      fullMatch,
      type,
      props: parseComponentProps(propsString),
    });
  }

  // Replace in reverse order to preserve positions
  for (const [id, comp] of components) {
    result = result.replace(comp.fullMatch, id);
  }

  // Components with children: <ComponentName prop="value">content</ComponentName>
  const withChildrenRegex = /<(Quote|Callout)\s*([^>]*)>([\s\S]*?)<\/\1>/g;

  while ((match = withChildrenRegex.exec(result)) !== null) {
    const fullMatch = match[0];
    const type = match[1];
    const propsString = match[2];
    const childContent = match[3];

    const componentId = `__COMPONENT_${componentIndex}__`;
    componentIndex++;

    components.set(componentId, {
      fullMatch,
      type,
      props: parseComponentProps(propsString),
      content: childContent.trim(),
    });
  }

  // Replace in result
  for (const [id, comp] of components) {
    if (result.includes(comp.fullMatch)) {
      result = result.replace(comp.fullMatch, id);
    }
  }

  return { content: result, components };
}

// ============================================
// Inline Markdown Processing
// ============================================

function parseInlineElements(text: string): string {
  // Inline code (must be before other patterns)
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="mdx-link" target="_blank" rel="noopener noreferrer">$1</a>');

  return text;
}

// ============================================
// Main Markdown to HTML Parser
// ============================================

function parseMarkdownToHtml(
  content: string,
  codeBlocks: Map<string, CodeBlockMatch>,
  components: Map<string, ComponentMatch>,
  highlightedBlocks: Map<string, string>
): string {
  const lines = content.split('\n');
  let html = '';
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  let inTable = false;
  let tableRows: string[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  const closeList = () => {
    if (inList && listType) {
      html += `</${listType}>`;
      inList = false;
      listType = null;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      html += `<blockquote class="mdx-blockquote">${blockquoteContent.join(' ')}</blockquote>`;
      inBlockquote = false;
      blockquoteContent = [];
    }
  };

  const processTable = () => {
    if (tableRows.length >= 2) {
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(2);

      const headers = headerRow.split('|').filter(cell => cell.trim()).map(cell =>
        `<th>${parseInlineElements(cell.trim())}</th>`
      ).join('');

      const rows = dataRows.map(row => {
        const cells = row.split('|').filter(cell => cell.trim()).map(cell =>
          `<td>${parseInlineElements(cell.trim())}</td>`
        ).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

      html += `<div class="mdx-table-wrapper"><table class="mdx-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines
    if (trimmedLine === '') {
      closeList();
      closeBlockquote();
      if (inTable && tableRows.length > 0) {
        processTable();
      }
      continue;
    }

    // Check for code block placeholder
    const codeBlockMatch = trimmedLine.match(/^__CODE_BLOCK_(\d+)__$/);
    if (codeBlockMatch) {
      closeList();
      closeBlockquote();

      const blockId = trimmedLine;
      const blockData = codeBlocks.get(blockId);
      const highlighted = highlightedBlocks.get(blockId);

      if (blockData) {
        const { language, code, showLineNumbers, filename } = blockData;
        const escapedCode = escapeHtml(code);
        const displayName = filename || language;

        html += `<div class="project-codeblock" data-language="${language}" data-code="${encodeURIComponent(code)}" data-show-line-numbers="${showLineNumbers}" data-filename="${filename || ''}" data-highlighted="${encodeURIComponent(highlighted || '')}">`;
        html += `<div class="code-block-header">`;
        html += `<div class="code-block-dots"><span></span><span></span><span></span></div>`;
        html += `<span class="code-block-lang">${displayName}</span>`;
        html += `<button class="code-block-copy" aria-label="Copy code">Copy</button>`;
        html += `</div>`;
        html += `<div class="code-block-content">`;

        if (showLineNumbers) {
          const lineCount = code.split('\n').length;
          html += `<div class="code-line-numbers">`;
          for (let n = 1; n <= lineCount; n++) {
            html += `<span>${n}</span>`;
          }
          html += `</div>`;
          html += `<div class="code-with-lines">`;
        }

        if (highlighted) {
          html += highlighted;
        } else {
          html += `<pre><code>${escapedCode}</code></pre>`;
        }

        if (showLineNumbers) {
          html += `</div>`;
        }

        html += `</div></div>`;
      }
      continue;
    }

    // Check for component placeholder
    const componentMatch = trimmedLine.match(/^__COMPONENT_(\d+)__$/);
    if (componentMatch) {
      closeList();
      closeBlockquote();

      const componentId = trimmedLine;
      const componentData = components.get(componentId);

      if (componentData) {
        const { type, props, content } = componentData;

        // Generate component HTML with data attributes for React hydration
        const propsJson = encodeURIComponent(JSON.stringify({ ...props, children: content }));

        html += `<div class="project-component" data-component="${type.toLowerCase()}" data-props="${propsJson}"></div>`;
      }
      continue;
    }

    // Handle tables
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      closeList();
      closeBlockquote();
      inTable = true;
      tableRows.push(trimmedLine);
      continue;
    } else if (inTable) {
      processTable();
    }

    // Handle blockquotes
    if (trimmedLine.startsWith('>')) {
      closeList();
      inBlockquote = true;
      blockquoteContent.push(parseInlineElements(trimmedLine.slice(1).trim()));
      continue;
    } else if (inBlockquote) {
      closeBlockquote();
    }

    // Handle headings
    if (trimmedLine.startsWith('####')) {
      closeList();
      const text = trimmedLine.slice(4).trim();
      html += `<h4 class="mdx-h4">${parseInlineElements(text)}</h4>`;
      continue;
    }
    if (trimmedLine.startsWith('###')) {
      closeList();
      const text = trimmedLine.slice(3).trim();
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      html += `<h3 id="${id}" class="mdx-h3">${parseInlineElements(text)}</h3>`;
      continue;
    }
    if (trimmedLine.startsWith('##')) {
      closeList();
      const text = trimmedLine.slice(2).trim();
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      html += `<h2 id="${id}" class="mdx-h2">${parseInlineElements(text)}</h2>`;
      continue;
    }
    if (trimmedLine.startsWith('#')) {
      closeList();
      const text = trimmedLine.slice(1).trim();
      html += `<h1 class="mdx-h1">${parseInlineElements(text)}</h1>`;
      continue;
    }

    // Handle horizontal rules
    if (trimmedLine === '---' || trimmedLine === '***' || trimmedLine === '___') {
      closeList();
      html += '<hr class="mdx-hr" />';
      continue;
    }

    // Handle unordered lists
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        closeList();
        html += '<ul class="mdx-ul">';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${parseInlineElements(trimmedLine.slice(2))}</li>`;
      continue;
    }

    // Handle ordered lists
    const orderedListMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (orderedListMatch) {
      if (!inList || listType !== 'ol') {
        closeList();
        html += '<ol class="mdx-ol">';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${parseInlineElements(orderedListMatch[2])}</li>`;
      continue;
    }

    closeList();

    // Handle paragraphs
    html += `<p class="mdx-p">${parseInlineElements(trimmedLine)}</p>`;
  }

  closeList();
  closeBlockquote();
  if (inTable && tableRows.length > 0) {
    processTable();
  }

  return html;
}

// ============================================
// Main Parse Function
// ============================================

export async function parseProjectContent(content: string): Promise<ParsedProjectContent> {
  // Step 1: Extract and replace code blocks with placeholders
  const { content: contentWithoutCode, codeBlocks } = await processCodeBlocks(content);

  // Step 2: Extract custom components
  const { content: contentWithoutComponents, components } = extractCustomComponents(contentWithoutCode);

  // Step 3: Highlight all code blocks
  const highlightedBlocks = new Map<string, string>();
  for (const [id, block] of codeBlocks) {
    const highlighted = await highlightCodeBlock(block.code, block.language);
    highlightedBlocks.set(id, highlighted);
  }

  // Step 4: Parse markdown to HTML
  const html = parseMarkdownToHtml(contentWithoutComponents, codeBlocks, components, highlightedBlocks);

  // Step 5: Collect parsed components for React rendering
  const parsedComponents: ParsedComponent[] = [];
  for (const [id, comp] of components) {
    parsedComponents.push({
      id,
      type: comp.type.toLowerCase() as ParsedComponent['type'],
      props: { ...comp.props, children: comp.content },
    });
  }

  return { html, components: parsedComponents };
}
