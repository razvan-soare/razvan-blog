'use client';

import React, { useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import styled from 'styled-components';

const CodeWrapperCss = styled.div`
  margin: 0 0 80px;

  .highlight-line {
    background-color: ${props => props.theme.syntaxHighlight};
    display: block;
    margin-left: -2px;
    padding: 0 10px;
    border-left: 2px solid #df6b6b;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: ${props => props.theme.code0};
    font-size: 0.8rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    background: transparent !important;
    line-height: 1.5;
    tab-size: 2;
    hyphens: none;
  }

  .token.comment, .token.prolog, .token.doctype, .token.cdata { color: #656565; }
  .token.punctuation { color: ${props => props.theme.code3}; }
  .token.number { color: ${props => props.theme.code0}; }
  .token.tag, .token.boolean, .token.constant, .token.symbol, .token.deleted { color: ${props => props.theme.code7}; }
  .token.selector, .token.string, .token.char, .token.builtin, .token.url, .token.inserted, .token.attr-value { color: ${props => props.theme.code4}; }
  .token.attr-name { color: ${props => props.theme.code5}; }
  .token.class-name { color: ${props => props.theme.code6}; }
  .token.atrule, .token.keyword { color: ${props => props.theme.code1}; }
  .token.function { color: ${props => props.theme.code2}; }
  .token.regex, .token.important, .token.variable { color: #2e94d3; }

  .token-line:not(:last-child) { min-height: 1.185rem; }

  @media (max-width: 500px) {
    code[class*='language-'], pre[class*='language-'] {
      font-size: 0.7rem;
    }
  }
`;

const CodeContentCss = styled.div`
  position: relative;
  display: flex;
  font-size: 18px;
  overflow: auto;
  margin-left: -32px;
  margin-right: -32px;
  padding: 32px;
  background: ${props => props.theme.syntaxBg};
  max-height: 75vh;
  border-radius: 4px;

  pre { font-size: 17px !important; }

  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const HighlightCss = styled.div`
  position: relative;
  padding-right: 10px;
  width: 100%;

  & pre[class*='language-'] {
    position: relative;
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
  }
`;

const LanguageBadgeCss = styled.div`
  z-index: 10;
  position: absolute;
  top: 0px;
  right: 0;
  transform: translate(0, -100%);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: ${props => props.theme.syntaxBg};
  color: ${props => props.theme.gray700};
  padding: 7px 20px 4px;

  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    right: 50px;
  }
`;

const CopyWrapperCss = styled.div`
  position: absolute;
  z-index: 10;
  top: 15px;
  right: 0;

  .btn-copy {
    cursor: pointer;
    padding: 5px 6px;
    border-radius: 5px;
    background: transparent;
    font-weight: 600;
    color: ${props => props.theme.gray700};
    user-select: none;
    border: none;
    opacity: 0.7;
    &:hover { opacity: 1; }
  }
`;

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
    <CodeWrapperCss>
      <Highlight code={codeString} language={lang} theme={{ plain: {}, styles: [] }}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <HighlightCss>
            <LanguageBadgeCss>{lang.toUpperCase()}</LanguageBadgeCss>
            <CopyWrapperCss>
              <button className="btn-copy" onClick={handleCopy}>
                {copyBtnText}
              </button>
            </CopyWrapperCss>
            <CodeContentCss>
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
            </CodeContentCss>
          </HighlightCss>
        )}
      </Highlight>
    </CodeWrapperCss>
  );
}
