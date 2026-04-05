'use client';

import React, { ViewTransition } from 'react';

export default function ArticleTitleTransition({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  return (
    <ViewTransition name={`article-title-${slug}`}>
      <span className="inline-block" style={{ viewTransitionName: `article-title-${slug}` }}>
        {title}
      </span>
    </ViewTransition>
  );
}
