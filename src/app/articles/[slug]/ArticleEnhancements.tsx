'use client';

import React, { useEffect, useState, memo } from 'react';
import Heart from '@/components/HeartLike';

const TableOfContents = memo(function TableMemo({ headings }: { headings: string[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <>
      <h3 className="text-gray-1000 text-base tracking-[2px] mb-4 uppercase">
        TABLE OF CONTENTS
      </h3>
      {headings.map(tag => {
        if (!tag) return null;
        const id = tag.toLowerCase().replaceAll(' ', '-');
        return (
          <a
            key={tag}
            className="text-gray-1000 cursor-pointer text-[14px] leading-6 mb-3 opacity-70 no-underline transition-opacity duration-500 hover:opacity-100 block"
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById(id);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            href={`#${id}`}
          >
            {tag}
          </a>
        );
      })}
    </>
  );
});

export default function ArticleEnhancements({
  slug,
  showLikeButton,
}: {
  slug: string;
  showLikeButton: boolean;
}) {
  const [headings, setHeadings] = useState<string[]>([]);

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

  if (!showLikeButton) return null;

  return (
    <>
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

      <div className="fixed bottom-6 right-6 z-50 tablet:hidden">
        <Heart slug={slug} compact />
      </div>
    </>
  );
}
