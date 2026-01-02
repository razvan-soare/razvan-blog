import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectCardSkeleton } from '@/components/sections/ProjectCardSkeleton';

export default function ProjectDetailLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        {/* Back Navigation Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Hero Section Skeleton */}
        <section className="mb-12">
          {/* Category Badge Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-14 w-full max-w-xl mb-2" />
          <Skeleton className="h-14 w-2/3 max-w-md mb-6" />

          {/* Description Skeleton */}
          <div className="max-w-3xl mb-8 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>

          {/* Hero Image Skeleton */}
          <Skeleton className="aspect-video rounded-xl" />
        </section>

        {/* External Links Skeleton */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-36 rounded-lg" />
          </div>
        </section>

        {/* Technologies Skeleton */}
        <section className="mb-12">
          <Skeleton className="h-8 w-36 mb-4" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-10 rounded-full"
                style={{ width: `${70 + index * 10}px` }}
              />
            ))}
          </div>
        </section>

        {/* Full Description Skeleton */}
        <section className="mb-12">
          <Skeleton className="h-8 w-48 mb-4" />
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Projects Skeleton */}
        <section>
          <Skeleton className="h-8 w-44 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
