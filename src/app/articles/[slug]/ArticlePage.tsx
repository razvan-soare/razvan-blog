'use client';

import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import Heart from '@/components/HeartLike';
import type { PostFrontmatter } from '@/lib/mdx';
import { format, parseISO } from 'date-fns';

const PostRootCss = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 60px 0 0 30px;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    margin: 40px 0 0;
  }
`;

const PostsWrapperCss = styled.div`
  word-wrap: break-word;

  h2 {
    font-size: 32px;
    color: ${props => props.theme.tertiary};
    margin: 64px 0 32px;
    position: relative;
  }
  h3 { font-size: 28px; margin: 36px 0 14px; }
  h4 { font-size: 24px; margin: 32px 0 14px; }
  h5 { font-size: 19px; margin-bottom: 32px; text-transform: uppercase; }
  h6 { font-size: 16px; margin-bottom: 32px; }

  p {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 32px;

    code {
      color: ${props => props.theme.primary};
      display: inline-block;
      font-size: 0.9em;
      letter-spacing: -0.5px;
      margin: 1px 0px;
      padding: 2px 6px;
      position: relative;
      z-index: 2;
      &::before {
        content: '';
        position: absolute;
        top: 0px; left: -1px; right: -1px; bottom: 0px;
        opacity: 0.15;
        background: ${props => props.theme.gray700};
        border-radius: 3px;
        z-index: -1;
      }
    }
  }

  em {
    font-family: Sriracha;
    letter-spacing: -0.25px;
    color: ${props => props.theme.secondary};
    font-style: normal;
  }

  a {
    color: ${props => props.theme.primary};
    font-weight: 400;
    text-decoration: none;
    box-shadow: 0px 0px 0px ${props => props.theme.primary};
    &:hover {
      box-shadow: 0px 2px 0px ${props => props.theme.primary};
    }
  }

  ul {
    font-size: 18px;
    margin-bottom: 32px;
    list-style: none;
    li {
      margin-bottom: 16px;
      font-weight: 300;
      line-height: 1.6;
      display: flex;
      align-items: baseline;
      &::before {
        content: '›';
        margin-right: 10px;
        color: ${props => props.theme.text};
        font-weight: 600;
      }
    }
  }

  ol {
    font-size: 18px;
    margin: 15px 0 32px;
    list-style: none;
    counter-reset: list-counter;
    li {
      font-weight: 300;
      line-height: 1.6;
      margin-bottom: 16px;
      display: flex;
      align-items: baseline;
      counter-increment: list-counter;
      &::before {
        content: counter(list-counter) '.';
        margin-right: 10px;
        font-weight: 600;
      }
    }
  }

  img { vertical-align: baseline; width: 100%; }

  .code-title-custom {
    position: relative;
    z-index: 10;
    padding: 6px 14px;
    margin-top: 30px;
    display: inline;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: ${props => props.theme.syntaxBg};
    color: ${props => props.theme.gray700};
    border-bottom: none;
    font-size: 16px;
  }

  @media (max-width: 500px) {
    padding: 10px;
    ul, ol { margin-right: 10px; }
  }
`;

const PostTitleCss = styled.h1`
  color: ${props => props.theme.gray1000};
  font-size: 38px;
  line-height: 42px;
  margin: 0 0 80px;
  text-align: center;
`;

const TagsWrapperCss = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  p {
    font-size: 18px;
    color: ${props => props.theme.primary};
    margin-bottom: 10px;
    font-weight: 400;
  }
  p + p { margin-left: 10px; }
`;

const LeftSideCss = styled.div`
  width: 70%;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    width: 100%;
  }
`;

const RightSideCss = styled.div`
  width: 30%;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    display: none;
  }
`;

const RightContentCss = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  padding: 0 15px 0 60px;
  position: sticky;
  top: 100px;
`;

const ContentsWrapperCss = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
`;

const ContentsTitleCss = styled.h3`
  color: ${props => props.theme.gray1000};
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 16px;
  text-transform: uppercase;
`;

const AnchorCss = styled.a`
  color: ${props => props.theme.gray1000};
  cursor: pointer;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 10px;
  opacity: 0.7;
  text-decoration: none;
  transition: opacity 500ms ease 0s;
  &:hover { opacity: 1; }
`;

const LikeCounterCss = styled.div<{ $mobile?: boolean }>`
  display: flex;
  align-self: flex-start;
  margin-left: 15px;
  margin-top: 20px;
  display: ${props => (props.$mobile ? 'none' : 'block')};
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    display: ${props => (props.$mobile ? 'block' : 'none')};
    margin: 0;
  }
`;

const DateWrapperCss = styled.div``;
const DateTileCss = styled.p`
  font-size: 14px;
  color: ${props => props.theme.gray500};
  text-transform: uppercase;
  margin-bottom: 7px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;

const DateCss = styled.p`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 300;
`;

const PostFooterCss = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const TableOfContents = memo(function TableMemo({ headings }: { headings: string[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <>
      <ContentsTitleCss>TABLE OF CONTENTS</ContentsTitleCss>
      {headings.map(tag => {
        if (!tag) return null;
        return (
          <AnchorCss
            key={tag}
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById(tag.toLowerCase().replaceAll(' ', '-'));
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            href={`#${tag.toLowerCase().replaceAll(' ', '-')}`}
          >
            {tag}
          </AnchorCss>
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
    formattedDate = format(parseISO(frontmatter.date), 'MMM do, yyyy');
  } catch {
    formattedDate = frontmatter.date;
  }

  return (
    <PostRootCss>
      <LeftSideCss>
        <PostsWrapperCss>
          <TagsWrapperCss>
            {frontmatter.tags?.map((tag, i) => <p key={i}>{tag}</p>)}
          </TagsWrapperCss>
          <PostTitleCss>{frontmatter.title}</PostTitleCss>
          {mdxContent}
        </PostsWrapperCss>

        <PostFooterCss>
          <DateWrapperCss>
            <DateTileCss>Last updated:</DateTileCss>
            <DateCss>{formattedDate}</DateCss>
          </DateWrapperCss>
          {showLikeButton && (
            <LikeCounterCss $mobile>
              <Heart slug={slug} />
            </LikeCounterCss>
          )}
        </PostFooterCss>
      </LeftSideCss>

      {showLikeButton && (
        <RightSideCss>
          <RightContentCss>
            <ContentsWrapperCss>
              <TableOfContents headings={headings} />
              <LikeCounterCss>
                <Heart slug={slug} />
              </LikeCounterCss>
            </ContentsWrapperCss>
          </RightContentCss>
        </RightSideCss>
      )}
    </PostRootCss>
  );
}
