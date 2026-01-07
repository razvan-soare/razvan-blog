/**
 * HeartSVG Component
 *
 * Heart-like SVG button extracted and adapted from soarerazvan.com
 *
 * Original Source Analysis (soarerazvan.com):
 * - CSS class: .heart-path
 * - Styling: fill: none, stroke: #fff200, stroke-miterlimit: 10
 * - Dimensions: 60px × 60px
 * - Animation: heartbeat keyframe animation (scale 1 → 1.1)
 * - Used as an interactive like button on article pages
 *
 * The SVG path is based on a standard heart shape using cubic Bézier curves,
 * styled to match the yellow outline aesthetic of the original.
 *
 * Features:
 * - Outline-only heart design (no fill)
 * - Yellow stroke color (#fff200) matching original
 * - Heartbeat pulse animation on interaction
 * - Customizable active/inactive states
 * - Supports fill animation for "liked" state
 *
 * License: MIT (as part of this project)
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeartSVGProps {
  /** Whether the heart is in active/liked state */
  isActive?: boolean;
  /** Stroke color when inactive */
  inactiveColor?: string;
  /** Stroke color when active */
  activeColor?: string;
  /** Whether to fill the heart when active */
  fillWhenActive?: boolean;
  /** Whether to animate the heartbeat */
  animate?: boolean;
  /** Size of the heart in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Heart SVG path data
 * A symmetric heart shape using cubic Bézier curves
 * ViewBox: 0 0 24 24 (normalized for easy scaling)
 */
const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

/**
 * Alternative heart path (simpler, more stylized)
 * This matches the aesthetic seen on soarerazvan.com
 */
const HEART_PATH_SIMPLE =
  'M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z';

export function HeartSVG({
  isActive = false,
  inactiveColor = '#fff200',
  activeColor = '#fff200',
  fillWhenActive = true,
  animate = true,
  size = 60,
  className,
}: HeartSVGProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn('transition-colors', className)}
      animate={
        animate && isActive
          ? {
              scale: [1, 1.1, 1, 1.1, 1],
            }
          : {}
      }
      transition={
        animate && isActive
          ? {
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            }
          : {}
      }
      aria-hidden="true"
    >
      <motion.path
        d={HEART_PATH_SIMPLE}
        stroke={isActive ? activeColor : inactiveColor}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ fill: 'transparent' }}
        animate={{
          fill: isActive && fillWhenActive ? activeColor : 'transparent',
        }}
        transition={{
          fill: {
            duration: 0.3,
            ease: 'easeOut',
          },
        }}
      />
    </motion.svg>
  );
}

/**
 * Alternative HeartSVG variant with Material Design style path
 */
export function HeartSVGMaterial({
  isActive = false,
  inactiveColor = '#fff200',
  activeColor = '#fff200',
  fillWhenActive = true,
  animate = true,
  size = 60,
  className,
}: HeartSVGProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn('transition-colors', className)}
      animate={
        animate && isActive
          ? {
              scale: [1, 1.1, 1, 1.1, 1],
            }
          : {}
      }
      transition={
        animate && isActive
          ? {
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            }
          : {}
      }
      aria-hidden="true"
    >
      <motion.path
        d={HEART_PATH}
        stroke={isActive ? activeColor : inactiveColor}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ fill: 'transparent' }}
        animate={{
          fill: isActive && fillWhenActive ? activeColor : 'transparent',
        }}
        transition={{
          fill: {
            duration: 0.3,
            ease: 'easeOut',
          },
        }}
      />
    </motion.svg>
  );
}

/**
 * Compact heart path for use in other contexts
 * ViewBox: 0 0 17 17 (from react-heart library)
 */
export const COMPACT_HEART_PATH = 'M8.5,2.3C12.9-2.2,24,5.7,8.5,16C-7,5.7,4.1-2.2,8.5,2.3z';

export function HeartSVGCompact({
  isActive = false,
  inactiveColor = '#fff200',
  activeColor = '#fff200',
  fillWhenActive = true,
  animate = true,
  size = 60,
  className,
}: HeartSVGProps) {
  return (
    <motion.svg
      viewBox="0 0 17 17"
      width={size}
      height={size}
      className={cn('transition-colors', className)}
      animate={
        animate && isActive
          ? {
              scale: [1, 1.1, 1, 1.1, 1],
            }
          : {}
      }
      transition={
        animate && isActive
          ? {
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            }
          : {}
      }
      aria-hidden="true"
    >
      <motion.path
        d={COMPACT_HEART_PATH}
        fillRule="evenodd"
        stroke={isActive ? activeColor : inactiveColor}
        strokeWidth={0.8}
        strokeMiterlimit={10}
        initial={{ fill: 'transparent' }}
        animate={{
          fill: isActive && fillWhenActive ? activeColor : 'transparent',
        }}
        transition={{
          fill: {
            duration: 0.3,
            ease: 'easeOut',
          },
        }}
      />
    </motion.svg>
  );
}
