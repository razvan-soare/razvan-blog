'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import type { Post } from '@/lib/mdx';

const SnippetsWrapperCss = styled.div`
  padding: 100px 0;
  h1 {
    font-size: 42px;
    margin-bottom: 20px;
  }
  h5 {
    font-size: 20px;
    margin-bottom: 50px;
  }
`;

const SnippetPostWrapperCss = styled.div`
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px;
`;

const PostWrapperCss = styled.div<{ $color: string }>`
  text-decoration: none;
  color: #000;
  background: ${props => props.$color};
  cursor: pointer;
  height: 200px;
  width: 200px;
  padding: 30px 15px 15px;
  margin: 15px 15px 50px;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  transition: transform 0.15s linear;
  transform: rotate(-1deg);
  position: relative;
  top: 5px;

  &:nth-child(even) { transform: rotate(4deg); top: 5px; }
  &:nth-child(3n) { transform: rotate(-4deg); top: -5px; }
  &:nth-child(5n) { transform: rotate(5deg); top: -10px; }
  &:nth-child(7n) { transform: rotate(1deg); top: 0px; }

  &:hover, &:focus {
    box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
    transform: scale(1.25);
    position: relative;
    z-index: 5;
  }
`;

const PostContentCss = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: 100%;
`;

const TagWrapperCss = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  background: white;
  padding: 3px 6px;
  transform: rotate(20deg);
  transform-origin: 100% 0;
  box-shadow: 2px 2px 3px -2px black;
  font-size: 12px;
`;

const PostTitleCss = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  line-height: 1.2;
`;

const PostDescriptionCss = styled.h2`
  font-size: 26px;
  font-family: 'Reenie', arial, sans-serif;
  line-height: 1.1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

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

export default function Snippets({ posts }: { posts: Post[] }) {
  return (
    <SnippetsWrapperCss>
      <h1>Snippets</h1>
      <h5>
        A collection of useful bits of code that can be easily integrated with
        any project
      </h5>
      <SnippetPostWrapperCss>
        {posts.map(post => (
          <Link href={`/articles/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
            <PostWrapperCss $color={generateColor()}>
              <PostContentCss>
                <TagWrapperCss>
                  📎 {post.frontmatter.tags[0]}
                </TagWrapperCss>
                <PostTitleCss>{post.frontmatter.title}</PostTitleCss>
                <PostDescriptionCss>
                  {post.frontmatter.excerpt}
                </PostDescriptionCss>
              </PostContentCss>
            </PostWrapperCss>
          </Link>
        ))}
      </SnippetPostWrapperCss>
    </SnippetsWrapperCss>
  );
}
