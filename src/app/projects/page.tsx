import { Layers } from 'lucide-react';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/lib/data/projects';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24 animate-in fade-in duration-300">
        {/* Page Header */}
        <section className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-6">
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've worked on, from healthcare applications to e-commerce platforms and social commerce solutions.
          </p>
        </section>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              style={{ animationDelay: `${100 + index * 50}ms`, animationFillMode: 'both' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
