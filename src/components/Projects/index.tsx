'use client';

import React from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/mdx';

export default function Projects({ posts }: { posts: Post[] }) {
  return (
    <div className="py-[100px] [&>h1]:text-[42px] [&>h1]:mb-[50px] [&>h1]:text-center">
      <h1>Projects</h1>
      <div>
        {posts.map(post => (
          <div
            key={post.slug}
            className="px-[60px] py-[50px] flex justify-between items-center even:flex-row-reverse max-tablet:flex-col-reverse max-tablet:px-[15px] max-tablet:py-5 max-tablet:even:flex-col-reverse"
          >
            <div className="w-[35%] p-[15px] text-center [&_h2]:text-[32px] [&_h2]:mb-[15px] [&_h4]:text-lg [&_h4]:leading-[1.4] [&_h4]:font-light [&_h4]:text-gray-900 max-tablet:w-full max-tablet:[&_h4]:mb-[50px]">
              <h2>{post.frontmatter.title}</h2>
              <h4>{post.frontmatter.excerpt}</h4>
            </div>
            <div className="w-[60%] bg-syntax-highlight p-5 rounded-[10px] [&_img]:w-full [&_img]:rounded-[10px] max-tablet:w-full max-tablet:p-3">
              <Link href={`/articles/${post.slug}`}>
                {post.frontmatter.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/images/${post.frontmatter.thumbnail}`} alt={post.frontmatter.title} />
                ) : (
                  <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#999' }}>
                    {post.frontmatter.title}
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
