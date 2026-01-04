'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PuzzleHeartProps {
  filledPieces: number;
  totalPieces?: number;
  isComplete: boolean;
  className?: string;
}

// 8 interlocking puzzle pieces that form a heart shape
const heartPuzzlePieces = [
  // Piece 1: Top left lobe
  {
    id: 1,
    path: 'M 50 30 C 45 15 30 10 20 20 C 10 30 10 45 20 55 L 35 45 Q 42 38 50 30',
    delay: 0,
  },
  // Piece 2: Top right lobe
  {
    id: 2,
    path: 'M 50 30 C 55 15 70 10 80 20 C 90 30 90 45 80 55 L 65 45 Q 58 38 50 30',
    delay: 0.05,
  },
  // Piece 3: Upper left side
  {
    id: 3,
    path: 'M 20 55 L 35 45 Q 42 52 50 58 L 35 72 L 20 55',
    delay: 0.1,
  },
  // Piece 4: Upper right side
  {
    id: 4,
    path: 'M 80 55 L 65 45 Q 58 52 50 58 L 65 72 L 80 55',
    delay: 0.15,
  },
  // Piece 5: Center piece
  {
    id: 5,
    path: 'M 35 45 L 50 30 L 65 45 Q 58 52 50 58 Q 42 52 35 45',
    delay: 0.2,
  },
  // Piece 6: Middle left
  {
    id: 6,
    path: 'M 20 55 L 35 72 L 50 58 L 42 78 L 25 65 L 20 55',
    delay: 0.25,
  },
  // Piece 7: Middle right
  {
    id: 7,
    path: 'M 80 55 L 65 72 L 50 58 L 58 78 L 75 65 L 80 55',
    delay: 0.3,
  },
  // Piece 8: Bottom tip
  {
    id: 8,
    path: 'M 35 72 L 50 58 L 65 72 L 58 78 L 50 95 L 42 78 L 35 72',
    delay: 0.35,
  },
];

export function PuzzleHeart({
  filledPieces,
  totalPieces = 8,
  isComplete,
  className,
}: PuzzleHeartProps) {
  const pieces = heartPuzzlePieces.slice(0, totalPieces);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={cn('w-full h-full', className)}
      animate={
        isComplete
          ? {
              scale: [1, 1.15, 1],
            }
          : {}
      }
      transition={
        isComplete
          ? {
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }
          : {}
      }
      aria-hidden="true"
    >
      <defs>
        {/* Gradient for filled pieces */}
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        {/* Glow filter for complete state */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={isComplete ? 'url(#glow)' : undefined}>
        {pieces.map((piece, index) => {
          const isFilled = index < filledPieces;

          return (
            <motion.path
              key={piece.id}
              d={piece.path}
              stroke={isFilled ? '#f43f5e' : 'currentColor'}
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ fill: 'transparent' }}
              animate={{
                fill: isFilled ? 'url(#heartGradient)' : 'transparent',
                opacity: isFilled ? 1 : 0.4,
              }}
              transition={{
                fill: {
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: isFilled ? piece.delay : 0,
                },
                opacity: {
                  duration: 0.3,
                },
              }}
              className={cn(
                'transition-colors',
                !isFilled && 'text-muted-foreground'
              )}
            />
          );
        })}
      </g>
    </motion.svg>
  );
}
