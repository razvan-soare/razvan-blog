'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProjectBySlug, getRelatedProjects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/sections/ProjectCard';

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

const heroImageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  },
};

interface ProjectDetailClientProps {
  slug: string;
}

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const project = getProjectBySlug(slug);
  const relatedProjects = getRelatedProjects(slug, 3);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  const gallery = project.gallery || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <motion.div
        className="mx-auto max-w-5xl px-4 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Navigation */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.div>
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mb-12">
          {/* Category Badge */}
          {project.category && (
            <motion.div variants={itemVariants} className="mb-4">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/30"
              >
                {project.category}
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {project.title}
          </motion.h1>

          {/* Short Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mb-8"
          >
            {project.description}
          </motion.p>

          {/* Hero Image */}
          <motion.div
            variants={heroImageVariants}
            className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 border border-border/50"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-8xl md:text-9xl opacity-30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {project.category === 'Healthcare' && '🏥'}
                {project.category === 'Lifestyle' && '🌿'}
                {project.category === 'E-commerce' && '🛒'}
                {project.category === 'Sports & Gaming' && '🎮'}
                {project.category === 'Social Commerce' && '🤝'}
                {!project.category && '💻'}
              </motion.div>
            </div>
            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/30 to-transparent" />
          </motion.div>
        </motion.section>

        {/* External Links */}
        {(project.liveUrl || project.githubUrl) && (
          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 text-secondary border border-secondary/30 rounded-lg font-medium hover:bg-secondary/30 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View Source
                </motion.a>
              )}
            </div>
          </motion.section>
        )}

        {/* Technologies */}
        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Badge
                  className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 transition-colors text-sm px-4 py-2"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Full Description */}
        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none">
                {(project.fullDescription || project.description)
                  .split('\n\n')
                  .map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Gallery Section */}
        {gallery.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 border border-border/50 cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => openLightbox(index)}
                >
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      🖼️
                    </motion.div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-sm font-medium text-white">View</span>
                  </div>
                  {/* Image number badge */}
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
                    {index + 1} / {gallery.length}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Image container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 border border-border/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-50">🖼️</span>
                  </div>
                </div>

                {/* Navigation */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateLightbox('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => navigateLightbox('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="text-center mt-4 text-muted-foreground">
                  {lightboxIndex + 1} / {gallery.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <motion.div
                  key={relatedProject.id}
                  variants={itemVariants}
                >
                  <ProjectCard project={relatedProject} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </main>
  );
}
