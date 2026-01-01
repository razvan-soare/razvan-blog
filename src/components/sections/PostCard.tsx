'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost, PostCategory } from '@/lib/data/posts';

const categoryColors: Record<PostCategory, string> = {
  hooks: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  helper: 'bg-green-500/20 text-green-400 border-green-500/30',
  tips: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-colors duration-300 group">
        <CardHeader className="pb-2">
          <Badge className={`${categoryColors[post.category]} w-fit mb-2`}>
            {post.category}
          </Badge>
          <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors duration-300">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
          >
            Read more
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
