'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/lib/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="h-full bg-card/50 border-border/50 hover:border-secondary/50 transition-all duration-300 group overflow-hidden">
        {/* Thumbnail placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              💻
            </motion.div>
          </div>
          {/* Hover overlay effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/30 to-transparent" />
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl leading-snug group-hover:text-secondary transition-colors duration-300">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-4 flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {project.description}
          </p>
          {/* Technology tags */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto pt-0">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors group/link"
          >
            View Project
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
