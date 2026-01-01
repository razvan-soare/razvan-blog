'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { BlogPost, PostCategory } from '@/lib/data/posts';
import { cn } from '@/lib/utils';

interface RelatedPostsProps {
  posts: BlogPost[];
}

const categoryStyles: Record<PostCategory, string> = {
  hooks: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  helpers: 'bg-green-500/20 text-green-400 border-green-500/50',
  tips: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
};

const categoryLabels: Record<PostCategory, string> = {
  hooks: 'Hooks',
  helpers: 'Helpers',
  tips: 'Tips',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post) => (
        <motion.article
          key={post.id}
          variants={itemVariants}
          className="group relative"
        >
          <Link href={`/blog/${post.slug}`} className="block h-full">
            <div className="h-full rounded-xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
              {/* Category Badge */}
              <div className="mb-3">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                    categoryStyles[post.category]
                  )}
                >
                  <Tag className="h-2.5 w-2.5" />
                  {categoryLabels[post.category]}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min read</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
