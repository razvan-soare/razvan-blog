'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProjectBySlug, getRelatedProjects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { parseProjectContent, ParsedProjectContent } from '@/lib/project-mdx';
import { ProjectMDXWithComponents } from '@/components/mdx/ProjectMDXRenderer';

interface ProjectDetailClientProps {
  slug: string;
}

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const project = getProjectBySlug(slug);
  const relatedProjects = getRelatedProjects(slug, 3);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [parsedContent, setParsedContent] = useState<ParsedProjectContent | null>(null);
  const [isParsingContent, setIsParsingContent] = useState(!!project?.content);
  const hasStartedParsingRef = useRef(false);

  // Parse MDX content if available
  useEffect(() => {
    // Only run once per content
    if (!project?.content || hasStartedParsingRef.current) {
      return;
    }

    hasStartedParsingRef.current = true;
    let cancelled = false;

    parseProjectContent(project.content)
      .then((result) => {
        if (!cancelled) {
          setParsedContent(result);
          setIsParsingContent(false);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error('Failed to parse project content:', error);
          setIsParsingContent(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [project?.content]);

  if (!project) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="text-center animate-in fade-in duration-300">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/projects">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const gallery = project.gallery || [];
  const hasRichContent = !!project.content && !!parsedContent;

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
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24 animate-in fade-in duration-300">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Category Badge */}
          {project.category && (
            <div className="mb-4">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/30"
              >
                {project.category}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ viewTransitionName: `project-title-${project.slug}` }}
          >
            {project.title}
          </h1>

          {/* Short Description */}
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Hero Image */}
          <div
            className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 border border-border/50"
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl md:text-9xl opacity-30">
                {project.category === 'Healthcare' && '🏥'}
                {project.category === 'Lifestyle' && '🌿'}
                {project.category === 'E-commerce' && '🛒'}
                {project.category === 'Sports & Gaming' && '🎮'}
                {project.category === 'Social Commerce' && '🤝'}
                {!project.category && '💻'}
              </div>
            </div>
            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/30 to-transparent" />
          </div>
        </section>

        {/* External Links */}
        {(project.liveUrl || project.githubUrl) && (
          <section
            className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
            style={{ animationDelay: '50ms', animationFillMode: 'both' }}
          >
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 text-secondary border border-secondary/30 rounded-lg font-medium hover:bg-secondary/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Github className="h-4 w-4" />
                  View Source
                </a>
              )}
            </div>
          </section>
        )}

        {/* Technologies */}
        <section
          className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '100ms', animationFillMode: 'both' }}
        >
          <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 transition-colors text-sm px-4 py-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Rich MDX Content or Fallback Description */}
        <section
          className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '150ms', animationFillMode: 'both' }}
        >
          {hasRichContent ? (
            // Render rich MDX content
            <ProjectMDXWithComponents html={parsedContent.html} />
          ) : isParsingContent ? (
            // Loading state
            <Card className="bg-card/50 border-border/50">
              <CardContent className="pt-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Fallback to simple description
            <>
              <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                  <div className="prose prose-invert max-w-none">
                    {(project.fullDescription || project.description)
                      .split('\n\n')
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </section>

        {/* Gallery Section - Only show if no rich content or if gallery is explicitly provided */}
        {!hasRichContent && gallery.length > 0 && (
          <section
            className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 border border-border/50 cursor-pointer group hover:scale-[1.02] transition-transform"
                  onClick={() => openLightbox(index)}
                >
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all">
                      🖼️
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-sm font-medium text-white">View</span>
                  </div>
                  {/* Image number badge */}
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
                    {index + 1} / {gallery.length}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox - Simple CSS-based animation */}
        {lightboxOpen && gallery.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-4xl w-full mx-4 animate-in zoom-in-95 duration-200"
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
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
            style={{ animationDelay: '250ms', animationFillMode: 'both' }}
          >
            <h2 className="text-2xl font-semibold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <div key={relatedProject.id}>
                  <ProjectCard project={relatedProject} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
