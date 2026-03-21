'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Primary, Danger, Warning, Success, Info, U } from '@/components/MdxComponents';
import VideoGifImg from '@/components/VideoGifImg';
import Code from '@/components/Code';

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px', listStyle: 'none', padding: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{
          background: 'rgba(0,0,0,0.05)',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '14px',
        }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Pre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) {
  const child = React.Children.toArray(children)[0] as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (child?.props?.className?.startsWith('language-') || child?.type === 'code') {
    const className = child.props.className || '';
    const language = className.replace('language-', '') || 'text';
    const code = typeof child.props.children === 'string'
      ? child.props.children.trim()
      : '';

    return <Code codeString={code} language={language} />;
  }

  return <pre {...props}>{children}</pre>;
}

function MarkdownLink({ href, children, ...rest }: React.ComponentPropsWithoutRef<'a'>) {
  if (!href) return <a {...rest}>{children}</a>;

  if (href.startsWith('/')) {
    return <a href={href} {...rest}>{children}</a>;
  }
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow" {...rest}>
        {children}
      </a>
    );
  }
  return <a href={href} {...rest}>{children}</a>;
}

const components = {
  pre: Pre,
  a: MarkdownLink,
  VideoGifImg,
  List,
  Primary,
  Danger,
  Warning,
  Success,
  Info,
  U,
};

export default function MdxRenderer({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
