'use client';

import React, { ViewTransition } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/mdx';

function truncate(str: string, len: number) {
  if (str.length <= len) return str;
  return str.substring(0, len) + '...';
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-secondary text-base font-normal tracking-[2px] mb-10">
        RECENTLY PUBLISHED
      </h2>
      {posts.map(post => (
        <Link href={`/articles/${post.slug}`} key={post.slug} className="no-underline">
          <div className="group rounded-[7px] py-2.5 mb-10 cursor-pointer">
            <h3 className="text-[22px] text-gray-1000 mb-4 group-hover:text-primary">
              <ViewTransition name={`article-title-${post.slug}`}>
                <span className="inline-block">{post.frontmatter.title}</span>
              </ViewTransition>
            </h3>
            <p className="text-text text-base mb-4 leading-relaxed font-light">
              {truncate(post.frontmatter.excerpt, 180)}
            </p>
            <div className="text-base font-medium text-text">
              Read more{' '}
              <span className="opacity-0 ml-[5px] inline-block group-hover:opacity-100 group-hover:animate-slide">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
