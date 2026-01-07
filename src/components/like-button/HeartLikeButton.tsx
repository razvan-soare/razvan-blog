/**
 * HeartLikeButton Component
 *
 * Interactive heart-shaped like button inspired by soarerazvan.com
 *
 * This component recreates the like button functionality observed on the
 * original website, featuring:
 * - Yellow outline heart (#fff200)
 * - Heartbeat animation on active state
 * - Like counter display
 * - Click interaction to toggle like state
 *
 * Original Source: soarerazvan.com (article pages)
 * License: MIT (as part of this project)
 */
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeartSVG } from './HeartSVG';

interface HeartLikeButtonProps {
  /** Initial like count */
  initialCount?: number;
  /** Called when like state changes */
  onLike?: (isLiked: boolean, count: number) => void;
  /** Whether the button starts in liked state */
  initialLiked?: boolean;
  /** Stroke color when inactive */
  inactiveColor?: string;
  /** Stroke/fill color when active */
  activeColor?: string;
  /** Size of the heart in pixels */
  size?: number;
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether to show the like counter */
  showCount?: boolean;
}

export function HeartLikeButton({
  initialCount = 0,
  onLike,
  initialLiked = false,
  inactiveColor = '#fff200',
  activeColor = '#fff200',
  size = 60,
  className,
  showCount = true,
}: HeartLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(() => {
    const newLikedState = !isLiked;
    const newCount = newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newLikedState);
    setLikeCount(newCount);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    onLike?.(newLikedState, newCount);
  }, [isLiked, likeCount, onLike]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2',
        className
      )}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex items-center justify-center',
          'cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'transition-transform'
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
        aria-label={isLiked ? 'Unlike this' : 'Like this'}
        aria-pressed={isLiked}
      >
        <HeartSVG
          isActive={isLiked}
          inactiveColor={inactiveColor}
          activeColor={activeColor}
          fillWhenActive={true}
          animate={true}
          size={size}
        />
      </motion.button>

      {showCount && (
        <AnimatePresence mode="wait">
          <motion.span
            key={likeCount}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="text-sm font-medium"
            style={{ color: inactiveColor }}
          >
            {likeCount}
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
}
