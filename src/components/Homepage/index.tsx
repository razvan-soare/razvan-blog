'use client';

import React from 'react';
import styled from 'styled-components';
import StickMan from './StickMan';
import BlogList from '@/components/BlogList';
import type { Post } from '@/lib/mdx';

const HomepageWrapperCss = styled.div`
  display: flex;
  margin-top: 200px;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    margin-top: 100px;
  }
`;

const LeftSideCss = styled.div`
  width: 60%;
  padding: 0 15px 0 0;
  display: flex;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    width: 100%;
  }
`;

const RightSideCss = styled.div`
  width: 40%;
  padding: 0 0 0 15px;
  display: flex;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.TABLET + 'px'}) {
    display: none;
  }
`;

export default function Homepage({ posts }: { posts: Post[] }) {
  return (
    <HomepageWrapperCss>
      <LeftSideCss>
        <BlogList posts={posts} />
      </LeftSideCss>
      <RightSideCss>
        <StickMan />
      </RightSideCss>
    </HomepageWrapperCss>
  );
}
