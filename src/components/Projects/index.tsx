'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/mdx';

// thumbnailSize is the image's real size: next/image uses it to reserve the right space before it loads.
export default function Projects({
  items,
}: {
  items: { post: Post; thumbnailSize?: { width: number; height: number } }[];
}) {
  const firstImageIndex = items.findIndex(item => item.thumbnailSize);

  return (
    <div className="py-[100px] [&>h1]:text-[42px] [&>h1]:mb-[50px] [&>h1]:text-center">
      <h1>Projects</h1>
      <div>
        {items.map(({ post, thumbnailSize }, index) => (
          <div
            key={post.slug}
            className="px-[60px] py-[50px] flex justify-between items-center even:flex-row-reverse max-tablet:flex-col-reverse max-tablet:px-[15px] max-tablet:py-5 max-tablet:even:flex-col-reverse"
          >
            <div className="w-[35%] p-[15px] text-center [&_h2]:text-[32px] [&_h2]:mb-[15px] [&_h4]:text-lg [&_h4]:leading-[1.4] [&_h4]:font-light [&_h4]:text-gray-900 max-tablet:w-full max-tablet:[&_h4]:mb-[50px]">
              <h2>{post.frontmatter.title}</h2>
              <h4>{post.frontmatter.excerpt}</h4>
            </div>
            <div className="w-[60%] bg-syntax-highlight p-5 rounded-[10px] [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[10px] max-tablet:w-full max-tablet:p-3">
              <Link href={`/articles/${post.slug}`}>
                {post.frontmatter.thumbnail && thumbnailSize ? (
                  // Thumbnails are up to 2.4 MB PNGs: next/image serves them resized as AVIF/WebP and
                  // lazy loads all but the first.
                  <Image
                    src={`/images/${post.frontmatter.thumbnail}`}
                    alt={post.frontmatter.title}
                    width={thumbnailSize.width}
                    height={thumbnailSize.height}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    preload={index === firstImageIndex}
                    loading={index === firstImageIndex ? 'eager' : 'lazy'}
                  />
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
