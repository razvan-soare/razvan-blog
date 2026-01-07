/**
 * Shared Animation Constants
 *
 * This file contains shared animation timing, easing, and configuration
 * constants used across all animated SVG components in the portfolio.
 * These ensure a cohesive, polished feel throughout the site.
 */

/**
 * Standard cubic-bezier easing curves for consistent animation feel
 */
export const EASING = {
  /** Smooth ease-in-out for most animations */
  smooth: [0.4, 0, 0.6, 1] as const,
  /** Material Design standard easing */
  standard: [0.25, 0.1, 0.25, 1] as const,
  /** Organic floating animation easing */
  organic: [0.45, 0.05, 0.55, 0.95] as const,
  /** Snappy easing for quick interactions */
  snappy: [0.22, 0.61, 0.36, 1] as const,
} as const;

/**
 * Spring physics presets for framer-motion
 */
export const SPRING = {
  /** Gentle spring for subtle movements */
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 15,
    mass: 0.8,
  },
  /** Responsive spring for eye tracking and interactions */
  responsive: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  },
  /** Bouncy spring for playful interactions */
  bouncy: {
    type: 'spring' as const,
    stiffness: 350,
    damping: 15,
    mass: 0.8,
  },
  /** Quick spring for immediate feedback */
  quick: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
  },
} as const;

/**
 * Standard animation durations in seconds
 */
export const DURATION = {
  /** Fast transitions (hover states, quick feedback) */
  fast: 0.3,
  /** Normal transitions (text changes, state updates) */
  normal: 0.45,
  /** Slow transitions (complex animations, reveals) */
  slow: 0.75,
  /** Float/bob cycle duration */
  float: 4.5,
  /** Message rotation duration */
  message: 4800,
  /** Thought bubble pulse duration */
  pulse: 3,
} as const;

/**
 * Floating animation keyframes for consistent bobbing motion
 */
export const FLOAT_KEYFRAMES = {
  y: [0, -8, -2, -10, 0],
  times: [0, 0.35, 0.5, 0.75, 1],
} as const;

/**
 * Heartbeat animation keyframes
 */
export const HEARTBEAT = {
  scale: [1, 1.15, 0.98, 1.08, 1],
  times: [0, 0.15, 0.35, 0.55, 1],
  duration: 0.75,
  repeatDelay: 1.0,
} as const;
