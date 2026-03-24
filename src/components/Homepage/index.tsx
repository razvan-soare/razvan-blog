'use client';

import React from 'react';
import StickMan from './StickMan';
import BlogList from '@/components/BlogList';
import type { Post } from '@/lib/mdx';

export default function Homepage({ posts }: { posts: Post[] }) {
  return (
    <div className="flex mt-[200px] max-tablet:mt-[100px]">
      <div className="w-[60%] pr-[15px] flex justify-center max-tablet:w-full">
        <BlogList posts={posts} />
      </div>
      <div className="w-[40%] pl-[15px] flex justify-center max-tablet:hidden">
        <StickMan />
      </div>
    </div>
  );
}
