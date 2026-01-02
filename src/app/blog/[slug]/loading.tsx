import { Skeleton } from '@/components/ui/skeleton';
import { PostCardSkeleton } from '@/components/sections/PostCardSkeleton';

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Back Link Skeleton */}
        <Skeleton className="h-5 w-28 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          {/* Main Content */}
          <article>
            {/* Header */}
            <header className="mb-10">
              {/* Category Badge Skeleton */}
              <div className="mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* Title Skeleton */}
              <Skeleton className="h-12 w-full max-w-2xl mb-2" />
              <Skeleton className="h-12 w-2/3 max-w-lg mb-6" />

              {/* Meta Info Skeleton */}
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>

              {/* Excerpt Skeleton */}
              <div className="mt-6 border-l-4 border-primary/50 pl-4 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
              </div>
            </header>

            {/* Content Skeleton */}
            <div className="space-y-6">
              {/* Paragraph blocks */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Code block skeleton */}
              <Skeleton className="h-48 w-full rounded-lg" />

              {/* More paragraphs */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
              </div>

              {/* Heading skeleton */}
              <Skeleton className="h-8 w-48 mt-8" />

              {/* More content */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>

              {/* Another code block */}
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </article>

          {/* Sidebar - Table of Contents Skeleton */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts Skeleton */}
        <section className="mt-20 pt-12 border-t border-border/50">
          <Skeleton className="h-8 w-40 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
