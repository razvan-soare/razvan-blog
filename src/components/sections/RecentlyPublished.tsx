'use client';

import { motion } from 'framer-motion';
import { PostCard } from './PostCard';
import { recentPosts } from '@/lib/data/posts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function RecentlyPublished() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Recently Published
          </h2>
          <p className="text-muted-foreground text-lg">
            Latest articles, tips, and code snippets
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recentPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
