'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/lib/data/projects';
import { Layers } from 'lucide-react';

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

export default function ProjectsPage() {
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
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've worked on, from healthcare applications to e-commerce platforms and social commerce solutions.
          </p>
        </motion.section>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
