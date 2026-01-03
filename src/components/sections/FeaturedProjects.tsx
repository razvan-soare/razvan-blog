import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { featuredProjects } from '@/lib/data/projects';

export function FeaturedProjects() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <div
              key={project.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${150 + index * 100}ms`, animationFillMode: 'both' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
