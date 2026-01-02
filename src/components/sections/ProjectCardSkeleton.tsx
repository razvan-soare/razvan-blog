import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full bg-card/50 border-border/50 overflow-hidden">
        {/* Thumbnail placeholder */}
        <Skeleton className="h-48 rounded-none" />

        <CardHeader className="pb-2">
          {/* Title skeleton */}
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>

        <CardContent className="pb-4 flex-1">
          {/* Description skeleton - 3 lines */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Technology badges skeleton */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </CardContent>

        <CardFooter className="mt-auto pt-0">
          {/* Link skeleton */}
          <Skeleton className="h-4 w-28" />
        </CardFooter>
      </Card>
    </div>
  );
}
