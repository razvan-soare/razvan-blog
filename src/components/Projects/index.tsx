'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import type { Post } from '@/lib/mdx';

const ProjectsWrapperCss = styled.div`
  padding: 100px 0;
  h1 {
    font-size: 42px;
    margin-bottom: 50px;
    text-align: center;
  }
`;

const PostWrapperCss = styled.div`
  padding: 50px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    flex-direction: column-reverse;
    padding: 20px 15px;
    &:nth-child(even) {
      flex-direction: column-reverse;
    }
  }
`;

const LeftSideCss = styled.div`
  width: 35%;
  padding: 15px;
  text-align: center;

  h2 {
    font-size: 32px;
    margin-bottom: 15px;
  }
  h4 {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 300;
    color: ${props => props.theme.gray900};
  }
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    width: 100%;
    h4 { margin-bottom: 50px; }
  }
`;

const RightSideCss = styled.div`
  width: 60%;
  background: ${props => props.theme.syntaxHighlight};
  padding: 20px;
  border-radius: 10px;

  img {
    width: 100%;
    border-radius: 10px;
  }
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    width: 100%;
    padding: 12px;
  }
`;

export default function Projects({ posts }: { posts: Post[] }) {
  return (
    <ProjectsWrapperCss>
      <h1>Projects</h1>
      <div>
        {posts.map(post => (
          <PostWrapperCss key={post.slug}>
            <LeftSideCss>
              <h2>{post.frontmatter.title}</h2>
              <h4>{post.frontmatter.excerpt}</h4>
            </LeftSideCss>
            <RightSideCss>
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
            </RightSideCss>
          </PostWrapperCss>
        ))}
      </div>
    </ProjectsWrapperCss>
  );
}
