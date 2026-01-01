import { codeToHtml } from 'shiki';

export interface ParsedContent {
  html: string;
}

async function highlightCodeBlocks(content: string): Promise<string> {
  // Match code blocks with language specifier
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const matches = [...content.matchAll(codeBlockRegex)];

  let result = content;

  for (const match of matches) {
    const [fullMatch, language = 'text', code] = match;

    try {
      const highlighted = await codeToHtml(code.trim(), {
        lang: language === 'tsx' ? 'tsx' : language === 'typescript' ? 'typescript' : language,
        theme: 'tokyo-night',
      });

      // Wrap with language badge
      const wrappedHtml = `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-block-lang">${language}</span>
        </div>
        <div class="code-block-content">${highlighted}</div>
      </div>`;

      result = result.replace(fullMatch, wrappedHtml);
    } catch {
      // Fallback if language not supported
      const fallbackHtml = `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-block-lang">${language}</span>
        </div>
        <div class="code-block-content"><pre><code>${escapeHtml(code.trim())}</code></pre></div>
      </div>`;
      result = result.replace(fullMatch, fallbackHtml);
    }
  }

  return result;
}

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

function parseInlineElements(text: string): string {
  // Inline code (must be before other patterns to avoid conflicts)
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="mdx-link">$1</a>');

  return text;
}

function parseMarkdownToHtml(content: string): string {
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
      const dataRows = tableRows.slice(2); // Skip separator row

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

    // Handle code blocks (already processed, just pass through)
    if (trimmedLine.startsWith('<div class="code-block-wrapper">')) {
      closeList();
      closeBlockquote();
      html += line;
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

    // Close list if we're not in a list item
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

export async function parseContent(content: string): Promise<ParsedContent> {
  // First, highlight code blocks
  const contentWithHighlightedCode = await highlightCodeBlocks(content);

  // Then parse the rest of the markdown
  const html = parseMarkdownToHtml(contentWithHighlightedCode);

  return { html };
}
