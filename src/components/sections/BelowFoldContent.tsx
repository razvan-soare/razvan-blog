'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { PostCardSkeleton } from './PostCardSkeleton';

interface BelowFoldContentProps {
  children: ReactNode;
}

/**
 * BelowFoldContent component that lazy loads below-the-fold content.
 * Uses Intersection Observer to detect when content should be rendered.
 */
export function BelowFoldContent({ children }: BelowFoldContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before content comes into view
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return (
      <div ref={sectionRef}>
        {/* Placeholder for RecentlyPublished */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 w-full">
            <div className="mb-10">
              <div className="h-10 w-64 bg-muted/50 rounded animate-pulse mb-3" />
              <div className="h-6 w-80 bg-muted/50 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return <>{children}</>;
}
