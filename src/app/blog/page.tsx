'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { PostCard } from '@/components/sections/PostCard';
import { blogPosts, PostCategory } from '@/lib/data/posts';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | PostCategory;

interface CategoryConfig {
  value: FilterCategory;
  label: string;
  activeClass: string;
  hoverClass: string;
}

const categories: CategoryConfig[] = [
  {
    value: 'all',
    label: 'All',
    activeClass: 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25',
    hoverClass: 'hover:border-primary/50',
  },
  {
    value: 'hooks',
    label: 'Hooks',
    activeClass: 'bg-blue-500/20 text-blue-400 border-blue-500 shadow-lg shadow-blue-500/25',
    hoverClass: 'hover:border-blue-500/50 hover:text-blue-400',
  },
  {
    value: 'helpers',
    label: 'Helpers',
    activeClass: 'bg-green-500/20 text-green-400 border-green-500 shadow-lg shadow-green-500/25',
    hoverClass: 'hover:border-green-500/50 hover:text-green-400',
  },
  {
    value: 'tips',
    label: 'Tips',
    activeClass: 'bg-purple-500/20 text-purple-400 border-purple-500 shadow-lg shadow-purple-500/25',
    hoverClass: 'hover:border-purple-500/50 hover:text-purple-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return blogPosts;
    }
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const getCategoryCount = (category: FilterCategory): number => {
    if (category === 'all') {
      return blogPosts.length;
    }
    return blogPosts.filter((post) => post.category === category).length;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <motion.div
        className="mx-auto max-w-5xl px-4 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.section variants={itemVariants} className="mb-12 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog & Snippets
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Useful React hooks, helper functions, and development tips to level up your coding workflow.
          </p>
        </motion.section>

        {/* Category Filter */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  'border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                  activeCategory === category.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                    : 'bg-card/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No posts found in this category.
            </p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
