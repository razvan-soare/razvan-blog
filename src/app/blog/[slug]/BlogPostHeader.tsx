'use client';

import { Calendar, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PostCategory } from '@/lib/data/posts';

interface BlogPostHeaderProps {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  categoryStyle: { badge: string; text: string };
  publishedAt: string;
  readingTime: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPostHeader({
  slug,
  title,
  excerpt,
  category,
  categoryStyle,
  publishedAt,
  readingTime,
}: BlogPostHeaderProps) {
  return (
    <header className="mb-10">
      {/* Category Badge */}
      <div className="mb-4">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
            categoryStyle.badge
          )}
          style={{ viewTransitionName: `post-category-${slug}` }}
        >
          <Tag className="h-3 w-3" />
          {categoryStyle.text}
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
        style={{ viewTransitionName: `post-title-${slug}` }}
      >
        {title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>
      </div>

      {/* Excerpt */}
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-4">
        {excerpt}
      </p>
    </header>
  );
}
