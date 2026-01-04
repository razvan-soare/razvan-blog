import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TransitionLink } from '@/components/ui/transition-link';
import type { Project } from '@/lib/data/projects';

interface ProjectCardProps {
  project: Project;
}

function getCategoryEmoji(category?: string): string {
  switch (category) {
    case 'Healthcare': return '🏥';
    case 'Lifestyle': return '🌿';
    case 'E-commerce': return '🛒';
    case 'Sports & Gaming': return '🎮';
    case 'Social Commerce': return '🤝';
    default: return '💻';
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="h-full transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.02]">
      <Card className="h-full bg-card/50 border-border/50 hover:border-secondary/50 transition-colors duration-200 group overflow-hidden">
        {/* Thumbnail placeholder */}
        <TransitionLink href={`/projects/${project.slug}`} className="block">
          <div
            className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 overflow-hidden"
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-30 group-hover:opacity-50 group-hover:rotate-[5deg] group-hover:scale-110 transition-all duration-200">
                {getCategoryEmoji(project.category)}
              </div>
            </div>
            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/30 to-transparent" />
          </div>
        </TransitionLink>

        <CardHeader className="pb-2">
          <CardTitle
            className="text-xl leading-snug"
            style={{ viewTransitionName: `project-title-${project.slug}` }}
          >
            <TransitionLink
              href={`/projects/${project.slug}`}
              className="hover:text-secondary transition-colors duration-200 cursor-pointer"
            >
              {project.title}
            </TransitionLink>
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
          <TransitionLink
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors group/link"
          >
            View Project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </TransitionLink>
        </CardFooter>
      </Card>
    </div>
  );
}
