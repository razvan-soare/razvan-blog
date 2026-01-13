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

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASING, DURATION } from '@/lib/animation';

const THOUGHT_MESSAGES = [
  // Developer jokes & code humor
  'I ❤️ React!',
  'Coffee → Code → Repeat',
  'Clean code is happy code',
  'const life = "good";',
  'npm install happiness',
  'git commit -m "magic"',
  '// TODO: sleep more',
  'while(alive) { code(); }',
  'return <Awesome />;',
  'async/await for coffee...',

  // Playful thoughts
  'Thinking in components...',
  'Bug hunting season!',
  'Debugging dreams...',
  '404: Sleep not found',
  'CSS is fun... right?',
  'Building something cool!',
  'Learning never stops!',
  'Making pixels dance!',

  // Motivational
  'Ship it! 🚀',
  'One bug at a time...',
  'Progress > Perfection',
  'Keep calm and code on',

  // Tech humor
  'Works on my machine™',
  'Is it deployed yet?',
  'Merge conflicts ahead!',
  "console.log('here');",
  'Stack Overflow to rescue!',
  'Types are my friends',
];

const MESSAGE_DURATION = DURATION.message; // Duration each message is displayed (ms)

interface ThoughtBubbleProps {
  className?: string;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function ThoughtBubble({ className }: ThoughtBubbleProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Shuffle messages once on mount for variety across sessions
  const shuffledMessages = useMemo(() => shuffleArray(THOUGHT_MESSAGES), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % shuffledMessages.length);
    }, MESSAGE_DURATION);

    return () => clearInterval(interval);
  }, [shuffledMessages.length]);

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
        transition={prefersReducedMotion ? {} : { duration: DURATION.pulse, repeat: Infinity, ease: EASING.smooth }}
      />
      <motion.circle
        cx="155"
        cy="50"
        r="6"
        fill="currentColor"
        className="text-foreground"
        initial={{ opacity: 0.7 }}
        animate={prefersReducedMotion ? { opacity: 0.8 } : { opacity: [0.7, 0.95, 0.7], scale: [1, 1.05, 1] }}
        transition={prefersReducedMotion ? {} : { duration: DURATION.pulse, repeat: Infinity, ease: EASING.smooth, delay: 0.25 }}
      />
      <motion.circle
        cx="168"
        cy="35"
        r="8"
        fill="currentColor"
        className="text-foreground"
        initial={{ opacity: 0.8 }}
        animate={prefersReducedMotion ? { opacity: 0.9 } : { opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
        transition={prefersReducedMotion ? {} : { duration: DURATION.pulse, repeat: Infinity, ease: EASING.smooth, delay: 0.5 }}
      />

      {/* Main thought bubble */}
      <motion.g
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={prefersReducedMotion ? {} : { duration: DURATION.slow, ease: 'easeOut' }}
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

        {/* Message text with smooth fade and slide transition */}
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
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.95 }}
            transition={
              prefersReducedMotion
                ? {}
                : {
                    duration: DURATION.normal,
                    ease: EASING.smooth,
                    opacity: { duration: DURATION.fast },
                  }
            }
          >
            {shuffledMessages[messageIndex]}
          </motion.text>
        </AnimatePresence>
      </motion.g>
    </g>
  );
}
