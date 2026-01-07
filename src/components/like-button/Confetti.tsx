'use client';

import { useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: 'circle' | 'square' | 'heart';
}

interface ConfettiProps {
  isActive: boolean;
  seed: number;
  onComplete?: () => void;
}

const COLORS = [
  '#f43f5e', // rose-500
  '#ec4899', // pink-500
  '#a855f7', // purple-500
  '#3b82f6', // blue-500
  '#22c55e', // green-500
  '#eab308', // yellow-500
  '#f97316', // orange-500
];

const SHAPES: ConfettiPiece['shape'][] = ['circle', 'square', 'heart'];

function generateConfettiPiece(id: number, seed: number): ConfettiPiece {
  // Use a seeded random to ensure consistent pieces per seed
  const random = (offset: number) => {
    const x = Math.sin(seed + id + offset) * 10000;
    return x - Math.floor(x);
  };

  return {
    id,
    x: random(0) * 100 - 50, // -50 to 50
    y: -(random(1) * 50 + 20), // Start above
    rotation: random(2) * 720 - 360,
    scale: random(3) * 0.5 + 0.5,
    color: COLORS[Math.floor(random(4) * COLORS.length)],
    shape: SHAPES[Math.floor(random(5) * SHAPES.length)],
  };
}

function ConfettiShape({
  shape,
  color,
}: {
  shape: ConfettiPiece['shape'];
  color: string;
}) {
  switch (shape) {
    case 'circle':
      return <circle cx="4" cy="4" r="4" fill={color} />;
    case 'square':
      return <rect x="1" y="1" width="6" height="6" fill={color} rx="1" />;
    case 'heart':
      return (
        <path
          d="M4 7 C2 5 0 3 0 2 C0 0.5 1 0 2 0 C3 0 4 1 4 2 C4 1 5 0 6 0 C7 0 8 0.5 8 2 C8 3 6 5 4 7"
          fill={color}
        />
      );
  }
}

export function Confetti({ isActive, seed, onComplete }: ConfettiProps) {
  const prefersReducedMotion = useReducedMotion();

  const pieces = useMemo(() => {
    if (!isActive || seed === 0) return [];
    return Array.from({ length: 24 }, (_, i) => generateConfettiPiece(i, seed));
  }, [isActive, seed]);

  const handleAnimationComplete = () => {
    onComplete?.();
  };

  // Skip confetti animation entirely for users who prefer reduced motion
  // Instead, just call onComplete immediately
  useEffect(() => {
    if (prefersReducedMotion && isActive) {
      const timer = setTimeout(() => onComplete?.(), 100);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion, isActive, onComplete]);

  // Don't render confetti for reduced motion users
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isActive && pieces.length > 0 && (
        <div
          className="absolute inset-0 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          {pieces.map((piece, index) => (
            <motion.div
              key={`${seed}-${piece.id}`}
              className="absolute left-1/2 top-1/2"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: piece.x,
                y: [0, piece.y - 70, piece.y + 90],
                scale: [0, piece.scale * 1.1, piece.scale * 0.4],
                rotate: piece.rotation,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.4,
                ease: [0.22, 0.61, 0.36, 1],
                times: [0, 0.35, 1],
              }}
              onAnimationComplete={
                index === pieces.length - 1 ? handleAnimationComplete : undefined
              }
            >
              <svg width="8" height="8" viewBox="0 0 8 8">
                <ConfettiShape shape={piece.shape} color={piece.color} />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
