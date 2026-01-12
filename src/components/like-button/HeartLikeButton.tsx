/**
 * HeartLikeButton Component
 *
 * Interactive heart-shaped like button with progressive "lighting" system.
 *
 * This component uses the exact heart SVG from soarerazvan.com and adds
 * a lighting system that fills one section of the heart per click.
 *
 * Features:
 * - Uses the exact heart path from soarerazvan.com: heart-like.svg
 * - Progressive fill: each click "lights up" one section
 * - 8 total sections that fill from bottom to top
 * - Yellow color scheme (#fff200) matching original
 * - Confetti celebration when complete
 * - Heartbeat animation on complete state
 *
 * Original Source: soarerazvan.com (heart-like.svg)
 * License: MIT (as part of this project)
 */
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useArticleLikes } from '@/lib/hooks/use-article-likes';
import { HeartLikeSVG } from './HeartLikeSVG';
import { Confetti } from './Confetti';

interface HeartLikeButtonProps {
  articleSlug: string;
  className?: string;
}

export function HeartLikeButton({ articleSlug, className }: HeartLikeButtonProps) {
  const { likes, maxLikes, isComplete, addLike } = useArticleLikes(articleSlug);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    if (isComplete) {
      // Already complete, trigger confetti again for fun
      setConfettiSeed((prev) => prev + 1);
      setShowConfetti(true);
      return;
    }

    addLike();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    // Check if this click will complete the heart
    if (likes + 1 >= maxLikes) {
      // Trigger confetti after a brief delay for the animation
      setTimeout(() => {
        setConfettiSeed((prev) => prev + 1);
        setShowConfetti(true);
      }, 300);
    }
  }, [addLike, isComplete, likes, maxLikes]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
  }, []);

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-colors hover:bg-card/80',
        className
      )}
    >
      {/* Confetti overlay */}
      <Confetti
        isActive={showConfetti}
        seed={confettiSeed}
        onComplete={handleConfettiComplete}
      />

      {/* Like button */}
      <motion.button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-16 h-16 flex items-center justify-center',
          'rounded-full cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'transition-transform',
          isComplete && 'cursor-default'
        )}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: isPressed ? 0.9 : 1,
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                type: 'spring',
                stiffness: 400,
                damping: 17,
              }
        }
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label={
          isComplete
            ? 'Heart complete! Thank you for all the likes'
            : `Like this article. ${likes} of ${maxLikes} sections filled`
        }
        aria-pressed={likes > 0}
      >
        <HeartLikeSVG
          filledSections={likes}
          totalSections={maxLikes}
          isComplete={isComplete}
        />
      </motion.button>

      {/* Like count indicator */}
      <div className="flex flex-col items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={likes}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: 5 }}
            className="text-sm font-medium text-foreground"
          >
            {likes}/{maxLikes}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-muted-foreground">
          {isComplete ? 'Complete!' : 'Tap to like'}
        </span>
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {isComplete && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            className="text-xs text-center text-yellow-400 font-medium mt-1"
          >
            Thank you!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
