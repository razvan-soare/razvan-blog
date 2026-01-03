import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TransitionLink } from '@/components/ui/transition-link';
import type { BlogPost, PostCategory } from '@/lib/data/posts';

export const categoryColors: Record<PostCategory, string> = {
  hooks: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  helpers: 'bg-green-500/20 text-green-400 border-green-500/30',
  tips: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="h-full transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.02]">
      <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-colors duration-200 group flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <Badge
              className={`${categoryColors[post.category]} w-fit`}
              style={{ viewTransitionName: `post-category-${post.slug}` }}
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime} min
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
          <CardTitle
            className="text-lg leading-snug group-hover:text-primary transition-colors duration-200"
            style={{ viewTransitionName: `post-title-${post.slug}` }}
          >
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          <TransitionLink
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
          >
            Read more
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </TransitionLink>
        </CardFooter>
      </Card>
    </div>
  );
}
