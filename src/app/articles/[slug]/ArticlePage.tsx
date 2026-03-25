'use client';

import React, { ViewTransition, useState, useEffect, memo } from 'react';
import Heart from '@/components/HeartLike';
import type { PostFrontmatter } from '@/lib/mdx';

const TableOfContents = memo(function TableMemo({ headings }: { headings: string[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <>
      <h3 className="text-gray-1000 text-base tracking-[2px] mb-4 uppercase">
        TABLE OF CONTENTS
      </h3>
      {headings.map(tag => {
        if (!tag) return null;
        return (
          <a
            key={tag}
            className="text-gray-1000 cursor-pointer text-[15px] leading-5 mb-2.5 opacity-70 no-underline transition-opacity duration-500 hover:opacity-100 block"
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById(tag.toLowerCase().replaceAll(' ', '-'));
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            href={`#${tag.toLowerCase().replaceAll(' ', '-')}`}
          >
            {tag}
          </a>
        );
      })}
    </>
  );
});

interface ArticlePageProps {
  mdxContent: React.ReactNode;
  frontmatter: PostFrontmatter;
  slug: string;
}

export default function ArticlePage({ mdxContent, frontmatter, slug }: ArticlePageProps) {
  const [headings, setHeadings] = useState<string[]>([]);
  const showLikeButton = frontmatter.type === 'articles';

  useEffect(() => {
    const h2s = document.querySelectorAll('.layout h2');
    const tags: string[] = [];
    h2s.forEach(el => {
      const text = el.textContent;
      if (text) {
        tags.push(text);
        el.id = text.toLowerCase().replaceAll(' ', '-');
      }
    });
    setHeadings(tags);
  }, []);

  let formattedDate = '';
  try {
    const date = new Date(frontmatter.date);
    formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    formattedDate = frontmatter.date;
  }

  return (
    <div className="w-full flex justify-center mt-[60px] ml-[30px] max-tablet:mt-[40px] max-tablet:ml-0">
      <div className="w-[70%] max-tablet:w-full">
        <div className="article-content">
          {/* Tags */}
          <div className="article-content-fade flex items-center flex-wrap justify-center [&_p]:text-lg [&_p]:text-primary [&_p]:mb-2.5 [&_p]:font-normal [&_p+p]:ml-2.5">
            {frontmatter.tags?.map((tag, i) => <p key={i}>{tag}</p>)}
          </div>

          {/* Title */}
          <h1 className="text-gray-1000 text-[38px] leading-[42px] m-0 mb-20 text-center">
            <ViewTransition name={`article-title-${slug}`}>
              <span className="inline-block">{frontmatter.title}</span>
            </ViewTransition>
          </h1>

          <div className="article-content-fade">
            {mdxContent}
          </div>
        </div>

        {/* Footer */}
        <div className="article-content-fade flex justify-between items-center my-10">
          <div>
            <p className="text-sm text-gray-500 uppercase mb-[7px] font-medium tracking-wide">
              Last updated:
            </p>
            <p className="text-text text-xl font-light">{formattedDate}</p>
          </div>
          {showLikeButton && (
            <div className="hidden max-tablet:fixed max-tablet:bottom-6 max-tablet:right-6 max-tablet:z-50 max-tablet:block max-tablet:bg-background max-tablet:rounded-full max-tablet:shadow-lg max-tablet:p-2">
              <Heart slug={slug} />
            </div>
          )}
        </div>
      </div>

      {showLikeButton && (
        <div className="article-content-fade w-[30%] max-tablet:hidden">
          <div className="flex flex-col items-end px-0 pl-[60px] pr-[15px] sticky top-[100px]">
            <div className="flex flex-col justify-center mb-2.5">
              <TableOfContents headings={headings} />
              <div className="flex self-start ml-[15px] mt-5">
                <Heart slug={slug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
