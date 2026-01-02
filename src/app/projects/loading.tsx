import { Skeleton } from '@/components/ui/skeleton';
import { ProjectCardSkeleton } from '@/components/sections/ProjectCardSkeleton';

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        {/* Page Header Skeleton */}
        <section className="mb-12 text-center">
          {/* Icon placeholder */}
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-6">
            <Skeleton className="h-8 w-8 rounded-full bg-primary/20" />
          </div>

          {/* Title skeleton */}
          <Skeleton className="h-12 w-48 mx-auto mb-4" />

          {/* Description skeleton */}
          <div className="max-w-2xl mx-auto space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
        </section>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
