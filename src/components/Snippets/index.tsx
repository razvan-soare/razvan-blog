'use client';

import React from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/mdx';

function generateColor() {
  return (
    'hsl(' +
    360 * Math.random() +
    ',' +
    (25 + 70 * Math.random()) +
    '%,' +
    (85 + 10 * Math.random()) +
    '%)'
  );
}

function PaperclipSvg() {
  return (
    <svg
      className="absolute -top-[18px] left-1/2 -translate-x-1/2 w-[16px] h-[40px] z-[2] pointer-events-none"
      viewBox="0 0 12 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 30V6C3 3 5 1 7 1C9 1 11 3 11 6V24C11 26 9.5 27.5 7.5 27.5C5.5 27.5 4 26 4 24V8"
        stroke="#999"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Snippets({ posts }: { posts: Post[] }) {
  return (
    <div className="py-[100px] [&>h1]:text-[42px] [&>h1]:mb-1 [&>h5]:text-xl [&>h5]:mb-[50px]">
      <h1>Snippets</h1>
      <h5>
        A collection of useful bits of code that can be easily integrated with
        any project
      </h5>
      <div className="snippets-grid flex flex-wrap justify-around items-center rounded-[5px] p-[25px]">
        {posts.map(post => (
          <Link href={`/articles/${post.slug}`} key={post.slug} className="no-underline">
            <div
              className="sticky-note text-black cursor-pointer h-[200px] w-[200px] p-[30px_15px_15px] m-[15px_15px_50px] shadow-[5px_5px_7px_rgba(33,33,33,0.7)] transition-transform duration-150 relative hover:shadow-[10px_10px_7px_rgba(0,0,0,0.7)] hover:scale-125 hover:z-[5]"
              style={{ background: generateColor() }}
            >
              <div className="flex flex-col items-start justify-center overflow-hidden h-full">
                <div className="absolute -top-[10px] right-[10px]">
                  <div className="relative inline-block">
                    <PaperclipSvg />
                    <div className="relative z-[1] bg-white px-2.5 py-1 shadow-[1px_1px_3px_rgba(0,0,0,0.3)] text-sm font-sriracha leading-tight">
                      {post.frontmatter.tags[0]}
                    </div>
                  </div>
                </div>
                <h2 className="text-xl mb-[15px] leading-[1.2]">
                  {post.frontmatter.title}
                </h2>
                <h2 className="text-[26px] font-reenie leading-[1.1] overflow-hidden line-clamp-4">
                  {post.frontmatter.excerpt}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
