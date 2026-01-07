'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSiteLikes } from '@/lib/hooks/use-site-likes';
import { HeartSVG } from './HeartSVG';

interface SiteLikeButtonProps {
  className?: string;
}

export function SiteLikeButton({ className }: SiteLikeButtonProps) {
  const { isLiked, toggleLike } = useSiteLikes();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleLike();
      }
    },
    [toggleLike]
  );

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        className
      )}
    >
      <motion.button
        type="button"
        onClick={toggleLike}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex items-center justify-center',
          'cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'transition-transform'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isLiked ? 'Unlike this site' : 'Like this site'}
        aria-pressed={isLiked}
      >
        <HeartSVG
          isActive={isLiked}
          inactiveColor="#fff200"
          activeColor="#fff200"
          fillWhenActive={true}
          animate={true}
          size={24}
        />
      </motion.button>
      <AnimatePresence mode="wait">
        <motion.span
          key={isLiked ? 'liked' : 'not-liked'}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
          className="text-sm text-muted-foreground"
        >
          {isLiked ? 'Thanks!' : 'Like this site'}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
