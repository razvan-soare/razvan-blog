import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/mdx';
import type { Metadata } from 'next';
import ArticlePage from './ArticlePage';
import { Primary, Danger, Warning, Success, Info, U } from '@/components/MdxComponents';
import VideoGifImg from '@/components/VideoGifImg';
import CodeBlock from '@/components/Code';
import React from 'react';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.frontmatter.title} - Razvan Soare`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
    },
  };
}

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

    return <CodeBlock codeString={code} language={language} />;
  }

  return <pre {...props}>{children}</pre>;
}

function MarkdownLink({ href, children, ...rest }: React.ComponentPropsWithoutRef<'a'>) {
  if (!href) return <a {...rest}>{children}</a>;
  if (href.startsWith('http')) {
    return <a href={href} target="_blank" rel="noopener noreferrer nofollow" {...rest}>{children}</a>;
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const mdxContent = (
    <MDXRemote source={post.content} components={components} />
  );

  return (
    <ArticlePage
      mdxContent={mdxContent}
      frontmatter={post.frontmatter}
      slug={post.slug}
    />
  );
}
