/**
 * ThoughtBubble Component
 *
 * ORIGINAL ARTWORK - Created specifically for this portfolio project.
 * This animated thought bubble is an original design and is not derived
 * from any third-party source.
 *
 * Features:
 * - Animated connector circles leading to the bubble
 * - Rotating messages with fade transitions
 * - Monospace font styling for code-like appearance
 * - Respects prefers-reduced-motion accessibility setting
 *
 * Used as a companion element to the StickFigure character.
 *
 * License: MIT (as part of this project)
 * Author: Razvan
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const THOUGHT_MESSAGES = [
  'Thinking about React...',
  'Coffee break?',
  'Bug hunting!',
  'Learning new things!',
  'const life = "good";',
  'npm install happiness',
  'Debugging dreams...',
  'Code. Sleep. Repeat.',
  'Building something cool!',
  '404: Sleep not found',
  'git commit -m "magic"',
  'CSS is fun... right?',
];

const MESSAGE_DURATION = 4800; // Duration each message is displayed (ms) - refined for optimal readability

interface ThoughtBubbleProps {
  className?: string;
}

export function ThoughtBubble({ className }: ThoughtBubbleProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % THOUGHT_MESSAGES.length);
    }, MESSAGE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <g className={className}>
      {/* Small trailing circles (thought bubble connectors) - staggered pulse for natural feel */}
      <motion.circle
        cx="145"
        cy="65"
        r="4"
        fill="currentColor"
        className="text-foreground"
        initial={{ opacity: 0.6 }}
        animate={prefersReducedMotion ? { opacity: 0.7 } : { opacity: [0.6, 0.85, 0.6], scale: [1, 1.05, 1] }}
        transition={prefersReducedMotion ? {} : { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
      />
      <motion.circle
        cx="155"
        cy="50"
        r="6"
        fill="currentColor"
        className="text-foreground"
        initial={{ opacity: 0.7 }}
        animate={prefersReducedMotion ? { opacity: 0.8 } : { opacity: [0.7, 0.95, 0.7], scale: [1, 1.05, 1] }}
        transition={prefersReducedMotion ? {} : { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1], delay: 0.25 }}
      />
      <motion.circle
        cx="168"
        cy="35"
        r="8"
        fill="currentColor"
        className="text-foreground"
        initial={{ opacity: 0.8 }}
        animate={prefersReducedMotion ? { opacity: 0.9 } : { opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
        transition={prefersReducedMotion ? {} : { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1], delay: 0.5 }}
      />

      {/* Main thought bubble */}
      <motion.g
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={prefersReducedMotion ? {} : { duration: 0.5, ease: 'easeOut' }}
      >
        {/* Bubble background - rounded rectangle with organic shape */}
        <rect
          x="140"
          y="-35"
          width="120"
          height="55"
          rx="20"
          ry="20"
          fill="currentColor"
          className="text-background"
          stroke="currentColor"
          strokeWidth="2"
          style={{ fill: 'var(--background)' }}
        />
        <rect
          x="140"
          y="-35"
          width="120"
          height="55"
          rx="20"
          ry="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-foreground"
        />

        {/* Message text with smooth fade transition */}
        <AnimatePresence mode="wait">
          <motion.text
            key={messageIndex}
            x="200"
            y="-5"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            className="text-foreground"
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono), monospace',
            }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={prefersReducedMotion ? {} : { duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            {THOUGHT_MESSAGES[messageIndex]}
          </motion.text>
        </AnimatePresence>
      </motion.g>
    </g>
  );
}
