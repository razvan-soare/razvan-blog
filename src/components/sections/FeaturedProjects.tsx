'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import { featuredProjects } from '@/lib/data/projects';

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

export function FeaturedProjects() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              A selection of my recent work and side projects
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors font-medium group"
          >
            View All Projects
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.slice(0, 3).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
