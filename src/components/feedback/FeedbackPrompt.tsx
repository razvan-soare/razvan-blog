'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FeedbackModal } from './FeedbackModal';
import { cn } from '@/lib/utils';

interface FeedbackPromptProps {
  message?: string;
  delay?: number;
  dismissible?: boolean;
  variant?: 'inline' | 'floating' | 'banner';
  className?: string;
}

const DISMISSED_KEY = 'feedback-prompt-dismissed';
const DISMISSED_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function FeedbackPrompt({
  message = "Enjoying the animations? We'd love to hear your thoughts!",
  delay = 5000,
  dismissible = true,
  variant = 'inline',
  className,
}: FeedbackPromptProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(true);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissedData = localStorage.getItem(DISMISSED_KEY);
    if (dismissedData) {
      try {
        const { timestamp } = JSON.parse(dismissedData);
        if (Date.now() - timestamp < DISMISSED_EXPIRY_MS) {
          setIsDismissed(true);
          return;
        }
      } catch {
        // Invalid data, continue showing
      }
    }

    setIsDismissed(false);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        DISMISSED_KEY,
        JSON.stringify({ timestamp: Date.now() })
      );
    }
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  if (variant === 'floating') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'fixed bottom-4 right-4 z-50 max-w-sm',
              className
            )}
          >
            <div className="relative bg-card border border-border rounded-xl p-4 shadow-lg">
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                  aria-label="Dismiss"
                >
                  <X className="size-4" />
                </button>
              )}
              <div className="flex items-start gap-3 pr-6">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <MessageCircle className="size-5 text-primary" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-foreground">{message}</p>
                  <FeedbackModal
                    trigger={
                      <Button size="sm" variant="default">
                        Share Feedback
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === 'banner') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-border',
              className
            )}
          >
            <div className="mx-auto max-w-5xl px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-5 text-primary shrink-0" />
                  <p className="text-sm text-foreground">{message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FeedbackModal
                    trigger={
                      <Button size="sm" variant="default">
                        Give Feedback
                      </Button>
                    }
                  />
                  {dismissible && (
                    <button
                      onClick={handleDismiss}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
                      aria-label="Dismiss"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Inline variant (default)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'relative bg-card/50 border border-border/50 rounded-xl p-4',
            className
          )}
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pr-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-4 text-primary" />
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
            <FeedbackModal
              trigger={
                <Button size="sm" variant="outline" className="shrink-0">
                  Share Thoughts
                </Button>
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
