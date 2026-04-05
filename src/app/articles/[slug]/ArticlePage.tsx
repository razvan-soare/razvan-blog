import React from 'react';
import type { PostFrontmatter } from '@/lib/mdx';
import ArticleEnhancements from './ArticleEnhancements';
import ArticleTitleTransition from './ArticleTitleTransition';

interface ArticlePageProps {
  mdxContent: React.ReactNode;
  frontmatter: PostFrontmatter;
  slug: string;
}

export default function ArticlePage({ mdxContent, frontmatter, slug }: ArticlePageProps) {
  const showLikeButton = frontmatter.type === 'articles';

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
          <div className="article-content-fade flex items-center flex-wrap justify-center [&_p]:text-lg [&_p]:text-primary [&_p]:mb-2.5 [&_p]:font-normal [&_p+p]:ml-2.5">
            {frontmatter.tags?.map((tag, i) => <p key={i}>{tag}</p>)}
          </div>

          <h1 className="text-gray-1000 text-[38px] leading-[42px] m-0 mb-12 text-center">
            <ArticleTitleTransition slug={slug} title={frontmatter.title} />
          </h1>

          <div className="article-content-fade">
            {mdxContent}
          </div>
        </div>

        <div className="article-content-fade flex justify-between items-center my-10">
          <div>
            <p className="text-sm text-gray-500 uppercase mb-[7px] font-medium tracking-wide">
              Last updated:
            </p>
            <p className="text-text text-xl font-light">{formattedDate}</p>
          </div>
        </div>
      </div>

      <ArticleEnhancements slug={slug} showLikeButton={showLikeButton} />
    </div>
  );
}
