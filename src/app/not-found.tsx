'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamic import for code splitting - ConfusedStickFigure is a large animated component
const ConfusedStickFigure = dynamic(
  () => import('@/components/character/ConfusedStickFigure').then(mod => ({ default: mod.ConfusedStickFigure })),
  {
    loading: () => (
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
      </div>
    ),
    ssr: false, // Disable SSR for animation-heavy component
  }
);

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center animate-in fade-in duration-300">
          {/* Animated Character */}
          <div
            className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            <ConfusedStickFigure className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
          </div>

          {/* 404 Title */}
          <div
            className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div
            className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Looks like this page got lost in the digital void.
              Don&apos;t worry, even the best developers take wrong turns sometimes!
            </p>
          </div>

          {/* Playful Message */}
          <div
            className="mb-8 p-4 rounded-lg bg-muted/30 border border-border/50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '400ms', animationFillMode: 'both' }}
          >
            <code className="text-sm text-muted-foreground font-mono">
              <span className="text-destructive">Error:</span>{' '}
              <span className="text-foreground">The page you requested does not exist.</span>
              <br />
              <span className="text-muted-foreground/70">
                Try checking the URL or head back home.
              </span>
            </code>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '500ms', animationFillMode: 'both' }}
          >
            <Link href="/">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Home className="h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div
            className="mt-12 pt-8 border-t border-border/50 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific? Try these:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <Search className="h-3 w-3" />
                Projects
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/blog"
                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <Search className="h-3 w-3" />
                Blog
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/about"
                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <Search className="h-3 w-3" />
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
