import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full bg-card/50 border-border/50 flex flex-col">
        <CardHeader className="pb-2">
          {/* Header row with category badge and meta info */}
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            {/* Category badge skeleton */}
            <Skeleton className="h-6 w-16 rounded-full" />

            {/* Meta info skeleton (reading time + date) */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Title skeleton */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3 mt-1" />
        </CardHeader>

        <CardContent className="pb-4 flex-1">
          {/* Excerpt skeleton - 3 lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </CardContent>

        <CardFooter className="mt-auto">
          {/* Link skeleton */}
          <Skeleton className="h-4 w-24" />
        </CardFooter>
      </Card>
    </div>
  );
}
