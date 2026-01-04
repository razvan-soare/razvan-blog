'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useArticleLikes } from '@/lib/hooks/use-article-likes';
import { PuzzleHeart } from './PuzzleHeart';
import { Confetti } from './Confetti';

interface LikeButtonProps {
  articleSlug: string;
  className?: string;
}

export function LikeButton({ articleSlug, className }: LikeButtonProps) {
  const { likes, maxLikes, isComplete, addLike } = useArticleLikes(articleSlug);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

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
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'transition-transform',
          isComplete && 'cursor-default'
        )}
        animate={{
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          isComplete
            ? 'Heart complete! Thank you for all the likes'
            : `Like this article. ${likes} of ${maxLikes} pieces filled`
        }
        aria-pressed={likes > 0}
      >
        <PuzzleHeart
          filledPieces={likes}
          totalPieces={maxLikes}
          isComplete={isComplete}
        />
      </motion.button>

      {/* Like count indicator */}
      <div className="flex flex-col items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={likes}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-center text-rose-400 font-medium mt-1"
          >
            Thank you!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
