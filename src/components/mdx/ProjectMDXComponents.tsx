'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Quote, Play, X, ChevronLeft, ChevronRight, Copy, Check, Maximize2, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';

// ============================================
// Animation Hook for Scroll/Appear Effects
// ============================================

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ============================================
// Styled Quote/Blockquote Component
// ============================================

interface StyledQuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

export function StyledQuote({ children, author, source, className }: StyledQuoteProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'my-8 relative overflow-hidden rounded-xl',
        'bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5',
        'border-l-4 border-primary',
        'p-6 md:p-8',
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
        className
      )}
    >
      {/* Decorative quote icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="h-12 w-12 text-primary" />
      </div>

      {/* Quote content */}
      <blockquote className="relative z-10">
        <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed font-light">
          {children}
        </p>

        {(author || source) && (
          <footer className="mt-4 flex items-center gap-2">
            <span className="w-8 h-px bg-primary/50" />
            <cite className="text-sm text-muted-foreground not-italic">
              {author && <span className="font-medium text-foreground">{author}</span>}
              {author && source && <span className="mx-2">—</span>}
              {source && <span>{source}</span>}
            </cite>
          </footer>
        )}
      </blockquote>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 pointer-events-none" />
    </div>
  );
}

// ============================================
// Video Embed Component
// ============================================

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

function parseVideoUrl(url: string): { type: 'youtube' | 'vimeo' | 'unknown'; id: string } {
  // YouTube patterns
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: 'youtube', id: youtubeMatch[1] };
  }

  // Vimeo patterns
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return { type: 'vimeo', id: vimeoMatch[1] };
  }

  return { type: 'unknown', id: '' };
}

export function VideoEmbed({ url, title, className }: VideoEmbedProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [isPlaying, setIsPlaying] = useState(false);
  const { type, id } = parseVideoUrl(url);

  if (type === 'unknown') {
    return (
      <div className="my-8 p-6 rounded-xl bg-destructive/10 border border-destructive/30 text-center">
        <p className="text-destructive">Unable to parse video URL. Please use a valid YouTube or Vimeo URL.</p>
      </div>
    );
  }

  const embedUrl = type === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${id}?autoplay=1`;

  const thumbnailUrl = type === 'youtube'
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : null;

  return (
    <div
      ref={ref}
      className={cn(
        'my-8 relative overflow-hidden rounded-xl',
        'border border-border/50',
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {/* 16:9 aspect ratio container */}
      <div className="relative aspect-video bg-muted/30">
        {!isPlaying ? (
          // Thumbnail with play button overlay
          <>
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={title || 'Video thumbnail'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            )}
            {!thumbnailUrl && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 flex items-center justify-center">
                <span className="text-4xl opacity-50">🎬</span>
              </div>
            )}

            {/* Play button overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'bg-black/30 hover:bg-black/40 transition-colors',
                'group cursor-pointer'
              )}
              aria-label={`Play ${title || 'video'}`}
            >
              <div className={cn(
                'w-20 h-20 rounded-full',
                'bg-primary/90 hover:bg-primary',
                'flex items-center justify-center',
                'transform group-hover:scale-110 transition-all duration-300',
                'shadow-lg shadow-primary/30'
              )}>
                <Play className="h-8 w-8 text-primary-foreground ml-1" />
              </div>
            </button>

            {/* Video title */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-sm">{title}</p>
              </div>
            )}
          </>
        ) : (
          // Embedded video player
          <iframe
            src={embedUrl}
            title={title || 'Embedded video'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

// ============================================
// Image Component with Lightbox
// ============================================

interface MDXImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function MDXImage({ src, alt, caption, className }: MDXImageProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <figure
        ref={ref}
        className={cn(
          'my-8 group',
          'transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          className
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-xl cursor-pointer',
            'border border-border/50',
            'transition-all duration-300',
            'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'
          )}
          onClick={() => setLightboxOpen(true)}
        >
          <div className="relative aspect-video">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </div>

          {/* Hover overlay with expand icon */}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-black/0 group-hover:bg-black/30 transition-colors duration-300'
          )}>
            <div className={cn(
              'p-3 rounded-full bg-background/90',
              'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100',
              'transition-all duration-300'
            )}>
              <Maximize2 className="h-5 w-5 text-foreground" />
            </div>
          </div>
        </div>

        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-5xl w-[95vw] p-0 bg-background/95 backdrop-blur-md border-border/50"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative">
            <div className="relative aspect-video">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain rounded-lg"
                sizes="95vw"
                priority
              />
            </div>

            {caption && (
              <p className="p-4 text-center text-sm text-muted-foreground">
                {caption}
              </p>
            )}

            <DialogClose className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================
// Image Gallery with Lightbox
// ============================================

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string; caption?: string }>;
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'my-8 grid gap-4',
          images.length === 1 ? 'grid-cols-1' :
          images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          'transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          className
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              'relative overflow-hidden rounded-xl cursor-pointer group',
              'border border-border/50',
              'transition-all duration-300',
              'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'
            )}
            onClick={() => openLightbox(index)}
            style={{
              transitionDelay: `${index * 100}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)'
            }}
          >
            <div className="relative aspect-video">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
              <div className="p-3 rounded-full bg-background/90 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <Maximize2 className="h-5 w-5 text-foreground" />
              </div>
            </div>

            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs text-muted-foreground">
              {index + 1} / {images.length}
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-6xl w-[95vw] p-0 bg-background/95 backdrop-blur-md border-border/50"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {images[currentIndex]?.alt || 'Gallery image'}
          </DialogTitle>
          <div className="relative">
            <div className="relative aspect-video">
              <Image
                src={images[currentIndex]?.src || ''}
                alt={images[currentIndex]?.alt || ''}
                fill
                className="object-contain rounded-lg"
                sizes="95vw"
                priority
              />
            </div>

            {images[currentIndex]?.caption && (
              <p className="p-4 text-center text-sm text-muted-foreground">
                {images[currentIndex].caption}
              </p>
            )}

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Close button */}
            <DialogClose className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors">
              <X className="h-5 w-5" />
            </DialogClose>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================
// Enhanced Code Block Component
// ============================================

interface EnhancedCodeBlockProps {
  code: string;
  language?: string;
  highlightedCode?: string;
  showLineNumbers?: boolean;
  filename?: string;
  className?: string;
}

export function EnhancedCodeBlock({
  code,
  language = 'text',
  highlightedCode,
  showLineNumbers = false,
  filename,
  className,
}: EnhancedCodeBlockProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div
      ref={ref}
      className={cn(
        'my-8 relative overflow-hidden rounded-xl',
        'border border-border/30',
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1b26] border-b border-border/30">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>

          {/* Filename or language */}
          <span className="ml-3 text-xs font-mono text-muted-foreground">
            {filename || language}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded-md',
            'text-xs font-medium transition-all duration-200',
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto bg-[#1a1b26]">
        {showLineNumbers ? (
          <div className="flex">
            {/* Line numbers */}
            <div className="flex-none py-4 pl-4 pr-2 select-none text-right border-r border-border/20">
              {lines.map((_, index) => (
                <div
                  key={index}
                  className="text-xs font-mono text-muted-foreground/50 leading-6"
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Code */}
            <div className="flex-1 p-4 overflow-x-auto">
              {highlightedCode ? (
                <div
                  className="text-sm font-mono [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent [&_.line]:leading-6"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              ) : (
                <pre className="text-sm font-mono">
                  <code className="text-foreground">{code}</code>
                </pre>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 overflow-x-auto">
            {highlightedCode ? (
              <div
                className="text-sm font-mono [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="text-sm font-mono">
                <code className="text-foreground">{code}</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Callout/Note Component
// ============================================

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; icon: string }> = {
  info: {
    bg: 'from-blue-500/5 via-blue-500/10 to-blue-400/5',
    border: 'border-blue-500/50',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'from-yellow-500/5 via-yellow-500/10 to-yellow-400/5',
    border: 'border-yellow-500/50',
    icon: '⚠️',
  },
  error: {
    bg: 'from-red-500/5 via-red-500/10 to-red-400/5',
    border: 'border-red-500/50',
    icon: '❌',
  },
  success: {
    bg: 'from-green-500/5 via-green-500/10 to-green-400/5',
    border: 'border-green-500/50',
    icon: '✅',
  },
  tip: {
    bg: 'from-purple-500/5 via-purple-500/10 to-purple-400/5',
    border: 'border-purple-500/50',
    icon: '💡',
  },
};

export function Callout({ type = 'info', title, children, className }: CalloutProps) {
  const { ref, isVisible } = useScrollAnimation();
  const styles = calloutStyles[type];

  return (
    <div
      ref={ref}
      className={cn(
        'my-8 relative overflow-hidden rounded-xl',
        `bg-gradient-to-br ${styles.bg}`,
        `border-l-4 ${styles.border}`,
        'p-6',
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
        className
      )}
    >
      <div className="flex gap-4">
        <span className="text-2xl flex-shrink-0">{styles.icon}</span>
        <div>
          {title && (
            <h4 className="font-semibold text-foreground mb-2">{title}</h4>
          )}
          <div className="text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Link Card Component
// ============================================

interface LinkCardProps {
  href: string;
  title: string;
  description?: string;
  className?: string;
}

export function LinkCard({ href, title, description, className }: LinkCardProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'my-6',
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className={cn(
          'p-6 rounded-xl',
          'bg-gradient-to-br from-muted/30 via-muted/20 to-transparent',
          'border border-border/50',
          'transition-all duration-300',
          'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
          'hover:-translate-y-1'
        )}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h4>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
              <span className="inline-block mt-2 text-xs text-muted-foreground/60">
                {new URL(href).hostname}
              </span>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </div>
      </a>
    </div>
  );
}

// ============================================
// Export all components
// ============================================

export const projectMDXComponents = {
  Quote: StyledQuote,
  Video: VideoEmbed,
  Image: MDXImage,
  Gallery: ImageGallery,
  CodeBlock: EnhancedCodeBlock,
  Callout,
  LinkCard,
};
