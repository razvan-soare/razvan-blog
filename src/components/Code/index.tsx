'use client';

import React, { useState } from 'react';
import { Highlight } from 'prism-react-renderer';

interface CodeProps {
  codeString: string;
  language: string;
  metastring?: string;
}

export default function Code({ codeString, language, metastring }: CodeProps) {
  const [copyBtnText, setCopyBtnText] = useState('Copy');

  const lang = language || 'text';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopyBtnText('Copied!');
    setTimeout(() => setCopyBtnText('Copy'), 4000);
  };

  // Parse line highlights from metastring like {1-3, 5}
  const highlightLines = new Set<number>();
  if (metastring) {
    const match = metastring.match(/\{([\d,-]+)\}/);
    if (match) {
      const ranges = match[1].split(',');
      ranges.forEach(r => {
        const parts = r.trim().split('-');
        if (parts.length === 2) {
          const start = parseInt(parts[0]);
          const end = parseInt(parts[1]);
          for (let i = start; i <= end; i++) highlightLines.add(i);
        } else {
          highlightLines.add(parseInt(parts[0]));
        }
      });
    }
  }

  return (
    <div className="code-wrapper">
      <Highlight code={codeString} language={lang} theme={{ plain: {}, styles: [] }}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className="relative pr-2.5 w-full [&_pre[class*='language-']]:relative [&_pre[class*='language-']]:bg-transparent [&_pre[class*='language-']]:m-0 [&_pre[class*='language-']]:p-0 [&_pre[class*='language-']]:overflow-auto">
            {/* Language badge */}
            <div className="z-10 absolute top-0 right-0 -translate-y-full rounded-t bg-syntax-bg text-gray-700 px-5 py-[7px] pb-1 max-tablet:right-[50px]">
              {lang.toUpperCase()}
            </div>

            {/* Copy button */}
            <div className="absolute z-10 top-[15px] right-0">
              <button
                className="cursor-pointer px-1.5 py-[5px] rounded-[5px] bg-transparent font-semibold text-gray-700 select-none border-none opacity-70 hover:opacity-100"
                onClick={handleCopy}
              >
                {copyBtnText}
              </button>
            </div>

            {/* Code content */}
            <div className="relative flex text-lg overflow-x-auto -mx-8 p-8 bg-syntax-bg rounded [&_pre]:!text-[17px] max-tablet:mx-0">
              <pre className={className} style={style}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line });
                  if (highlightLines.has(i + 1)) {
                    lineProps.className = `${lineProps.className} highlight-line`;
                  }
                  return (
                    <div key={i} {...lineProps}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        )}
      </Highlight>
    </div>
  );
}
