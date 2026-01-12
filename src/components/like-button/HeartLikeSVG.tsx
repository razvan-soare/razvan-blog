'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeartLikeSVGProps {
  filledSections: number;
  totalSections?: number;
  isComplete: boolean;
  className?: string;
}

/**
 * Heart SVG with progressive fill "lighting" system.
 *
 * Based on the heart-like.svg from soarerazvan.com:
 * - Original path: M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z
 * - Original dimensions: viewBox="0 0 24 24" with 60x60 display size
 * - Stroke: #fff200 (yellow), stroke-width: 1.5
 *
 * The heart is divided into 8 horizontal sections that fill from bottom to top,
 * creating a "lighting" effect as each section is clicked.
 */

// The exact heart path from soarerazvan.com heart-like.svg
const HEART_PATH = 'M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z';

// ViewBox dimensions: 0 0 24 24
// Heart path spans roughly from y=0 (top of lobes) to y=20 (bottom tip)
// The bottom tip is at around y=20.056, top of lobes around y=0.9

// 8 horizontal sections from bottom to top
// Each section is a horizontal band that will reveal part of the heart fill
const SECTION_COUNT = 8;
const TOP_Y = 0.9;      // Top of the heart lobes
const BOTTOM_Y = 20.1;  // Bottom tip of the heart
const SECTION_HEIGHT = (BOTTOM_Y - TOP_Y) / SECTION_COUNT;

// Define delays for staggered animation
const SECTION_DELAYS = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];

export function HeartLikeSVG({
  filledSections,
  totalSections = 8,
  isComplete,
  className,
}: HeartLikeSVGProps) {
  const prefersReducedMotion = useReducedMotion();

  // Create sections array
  const sections = Array.from({ length: totalSections }, (_, i) => ({
    id: i + 1,
    // Y position for each section (from bottom to top)
    // Section 1 (index 0) = bottom of heart
    // Section 8 (index 7) = top of heart
    yStart: BOTTOM_Y - SECTION_HEIGHT * (i + 1),
    yEnd: BOTTOM_Y - SECTION_HEIGHT * i,
    delay: SECTION_DELAYS[i] || 0,
  }));

  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn('w-full h-full', className)}
      animate={
        isComplete && !prefersReducedMotion
          ? {
              scale: [1, 1.15, 1],
            }
          : {}
      }
      transition={
        isComplete && !prefersReducedMotion
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
        {/* Gradient for filled sections - yellow matching original */}
        <linearGradient id="heartLikeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fff200" />
          <stop offset="50%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#fff200" />
        </linearGradient>

        {/* Glow filter for complete state */}
        <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip paths for each section - horizontal bands */}
        {sections.map((section) => (
          <clipPath key={`clip-${section.id}`} id={`heartSection${section.id}`}>
            <rect
              x="-2"
              y={section.yStart}
              width="28"
              height={SECTION_HEIGHT + 0.5}
            />
          </clipPath>
        ))}
      </defs>

      {/* Background outline of the heart - always visible */}
      <path
        d={HEART_PATH}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground/40"
      />

      {/* Filled sections container */}
      <g filter={isComplete ? 'url(#heartGlow)' : undefined}>
        {sections.map((section, index) => {
          const isFilled = index < filledSections;

          return (
            <motion.path
              key={section.id}
              d={HEART_PATH}
              fill={isFilled ? 'url(#heartLikeGradient)' : 'transparent'}
              stroke="transparent"
              clipPath={`url(#heartSection${section.id})`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isFilled ? 1 : 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : (isFilled ? section.delay : 0),
              }}
            />
          );
        })}
      </g>

      {/* Top stroke outline - matches original yellow color */}
      <motion.path
        d={HEART_PATH}
        fill="transparent"
        stroke="#fff200"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: isComplete ? 1 : 0.6,
        }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.svg>
  );
}
