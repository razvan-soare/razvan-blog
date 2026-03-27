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
      className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[18px] h-[28px] z-[1]"
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 38V10C8 6.68629 10.6863 4 14 4V4C17.3137 4 20 6.68629 20 10V30C20 32.2091 18.2091 34 16 34V34C13.7909 34 12 32.2091 12 30V12"
        stroke="#888"
        strokeWidth="2"
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
                <div className="absolute top-2 right-0 rotate-[20deg] origin-top-right">
                  <div className="relative">
                    <PaperclipSvg />
                    <div className="bg-white px-1.5 py-[3px] shadow-[2px_2px_3px_-2px_black] text-xs font-sriracha">
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
