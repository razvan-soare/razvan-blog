'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PuzzleHeartProps {
  filledPieces: number;
  totalPieces?: number;
  isComplete: boolean;
  className?: string;
}

// Helper to create a puzzle connector (tab that sticks out or hole that goes in)
// Creates a smooth bump or indent in the middle of a line segment
const puzzleConnector = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  type: 'tab' | 'hole' | 'flat'
): string => {
  if (type === 'flat') {
    return `L ${endX} ${endY}`;
  }

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Unit perpendicular vector
  const perpX = -dy / length;
  const perpY = dx / length;

  // Tab/hole dimensions - proportional to edge length
  const size = length * 0.2;
  const depth = type === 'tab' ? size : -size;

  // Points along the edge where tab/hole connects (at 35% and 65%)
  const p1X = startX + dx * 0.35;
  const p1Y = startY + dy * 0.35;
  const p2X = startX + dx * 0.65;
  const p2Y = startY + dy * 0.65;

  // Peak of the connector
  const peakX = midX + perpX * depth;
  const peakY = midY + perpY * depth;

  // Control points for smooth bezier curves
  const cp1X = p1X + perpX * depth * 0.6;
  const cp1Y = p1Y + perpY * depth * 0.6;
  const cp2X = p2X + perpX * depth * 0.6;
  const cp2Y = p2Y + perpY * depth * 0.6;

  return `L ${p1X} ${p1Y} C ${cp1X} ${cp1Y}, ${peakX - dx * 0.12} ${peakY - dy * 0.12}, ${peakX} ${peakY} C ${peakX + dx * 0.12} ${peakY + dy * 0.12}, ${cp2X} ${cp2Y}, ${p2X} ${p2Y} L ${endX} ${endY}`;
};

// 8 interlocking puzzle pieces forming a heart shape
// The heart is divided into 2 columns (left/right at x=50) and 4 rows
// Adjacent pieces interlock via tabs (outward bumps) and holes (inward indents)
//
// Heart shape key points:
// - Top: y=20 (center dip)
// - Lobes peak: y=6-10 (left around x=22, right around x=78)
// - Widest: around y=38-50
// - Row dividers: y=48, y=68, y=88
// - Bottom tip: y=122 at x=50

const heartPuzzlePieces = [
  // PIECE 1: Top-left lobe
  {
    id: 1,
    path: `M 50 20
           C 46 10 35 4 22 6
           C 8 8 2 22 4 38
           L 4 48
           ${puzzleConnector(4, 48, 50, 48, 'tab')}
           ${puzzleConnector(50, 48, 50, 20, 'tab')}
           Z`,
    delay: 0,
  },
  // PIECE 2: Top-right lobe (mirror)
  {
    id: 2,
    path: `M 50 20
           C 54 10 65 4 78 6
           C 92 8 98 22 96 38
           L 96 48
           ${puzzleConnector(96, 48, 50, 48, 'tab')}
           ${puzzleConnector(50, 48, 50, 20, 'hole')}
           Z`,
    delay: 0.05,
  },
  // PIECE 3: Upper-middle left
  {
    id: 3,
    path: `M 4 48
           C 5 55 10 62 18 68
           L 18 68
           ${puzzleConnector(18, 68, 50, 68, 'tab')}
           ${puzzleConnector(50, 68, 50, 48, 'hole')}
           ${puzzleConnector(50, 48, 4, 48, 'hole')}
           Z`,
    delay: 0.1,
  },
  // PIECE 4: Upper-middle right (mirror)
  {
    id: 4,
    path: `M 96 48
           C 95 55 90 62 82 68
           L 82 68
           ${puzzleConnector(82, 68, 50, 68, 'tab')}
           ${puzzleConnector(50, 68, 50, 48, 'tab')}
           ${puzzleConnector(50, 48, 96, 48, 'hole')}
           Z`,
    delay: 0.15,
  },
  // PIECE 5: Lower-middle left
  {
    id: 5,
    path: `M 18 68
           L 32 88
           ${puzzleConnector(32, 88, 50, 88, 'tab')}
           ${puzzleConnector(50, 88, 50, 68, 'hole')}
           ${puzzleConnector(50, 68, 18, 68, 'hole')}
           Z`,
    delay: 0.2,
  },
  // PIECE 6: Lower-middle right (mirror)
  {
    id: 6,
    path: `M 82 68
           L 68 88
           ${puzzleConnector(68, 88, 50, 88, 'tab')}
           ${puzzleConnector(50, 88, 50, 68, 'tab')}
           ${puzzleConnector(50, 68, 82, 68, 'hole')}
           Z`,
    delay: 0.25,
  },
  // PIECE 7: Bottom-left tip
  {
    id: 7,
    path: `M 32 88
           L 50 122
           ${puzzleConnector(50, 122, 50, 88, 'hole')}
           ${puzzleConnector(50, 88, 32, 88, 'hole')}
           Z`,
    delay: 0.3,
  },
  // PIECE 8: Bottom-right tip (mirror)
  {
    id: 8,
    path: `M 68 88
           L 50 122
           ${puzzleConnector(50, 122, 50, 88, 'tab')}
           ${puzzleConnector(50, 88, 68, 88, 'hole')}
           Z`,
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
      viewBox="0 0 100 128"
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
