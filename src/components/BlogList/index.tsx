'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import type { Post } from '@/lib/mdx';

const BlogListWrapperCss = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitleCss = styled.h2`
  color: ${props => props.theme.secondary};
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 2px;
  margin-bottom: 40px;
`;

const PostTitleCss = styled.h3`
  font-size: 22px;
  color: ${props => props.theme.gray1000};
  margin-bottom: 16px;
`;

const PostDescriptionCss = styled.p`
  color: ${props => props.theme.text};
  font-size: 16px;
  margin-bottom: 16px;
  line-height: 1.6;
  font-weight: 300;
`;

const ReadMoreCss = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.text};
  span {
    opacity: 0;
    margin-left: 5px;
    display: inline-block;
  }
`;

const PostCss = styled.div`
  border-radius: 7px;
  padding: 10px 0;
  margin-bottom: 40px;
  cursor: pointer;
  &:hover {
    ${PostTitleCss} {
      color: ${props => props.theme.primary};
    }
    ${ReadMoreCss} span {
      opacity: 1;
      animation: slide 300ms cubic-bezier(0.64, 0.57, 0.67, 1.53);
    }
  }

  @keyframes slide {
    0% { margin-left: 5px; }
    50% { margin-left: 15px; }
    100% { margin-left: 5px; }
  }
`;

function truncate(str: string, len: number) {
  if (str.length <= len) return str;
  return str.substring(0, len) + '...';
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <BlogListWrapperCss>
      <SectionTitleCss>RECENTLY PUBLISHED</SectionTitleCss>
      {posts.map(post => (
        <Link href={`/articles/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
          <PostCss>
            <PostTitleCss>{post.frontmatter.title}</PostTitleCss>
            <PostDescriptionCss>
              {truncate(post.frontmatter.excerpt, 180)}
            </PostDescriptionCss>
            <ReadMoreCss>
              Read more <span>→</span>
            </ReadMoreCss>
          </PostCss>
        </Link>
      ))}
    </BlogListWrapperCss>
  );
}
