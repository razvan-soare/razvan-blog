'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfusedStickFigure } from '@/components/character';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Animated Character */}
          <motion.div variants={itemVariants} className="mb-8">
            <ConfusedStickFigure className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
          </motion.div>

          {/* 404 Title */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Looks like this page got lost in the digital void.
              Don&apos;t worry, even the best developers take wrong turns sometimes!
            </p>
          </motion.div>

          {/* Playful Message */}
          <motion.div
            variants={itemVariants}
            className="mb-8 p-4 rounded-lg bg-muted/30 border border-border/50 max-w-md"
          >
            <code className="text-sm text-muted-foreground font-mono">
              <span className="text-destructive">Error:</span>{' '}
              <span className="text-foreground">The page you requested does not exist.</span>
              <br />
              <span className="text-muted-foreground/70">
                Try checking the URL or head back home.
              </span>
            </code>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
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
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-border/50 w-full max-w-md"
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
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
