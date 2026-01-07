/**
 * ConfusedStickFigure Component
 *
 * ORIGINAL ARTWORK - Created specifically for this portfolio project.
 * This animated confused stick figure character is an original design
 * and is not derived from any third-party source.
 *
 * Features:
 * - Confused expression with asymmetric eyebrows
 * - Head tilting and searching animation
 * - Rotating thought bubble with confused messages
 * - Scratching head and shading eyes gestures
 * - Floating island with crack damage and "404" signpost
 * - Respects prefers-reduced-motion accessibility setting
 *
 * Used on the 404 Not Found error page.
 *
 * License: MIT (as part of this project)
 * Author: Razvan
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

interface ConfusedStickFigureProps {
  className?: string;
}

const CONFUSED_MESSAGES = [
  'Where am I?',
  '404: Page not found',
  'This path is broken!',
  'Lost in the void...',
  'Looking for clues...',
  'Did you mean /?',
  'Hmm... suspicious',
  'Map.get(page) -> null',
];

export function ConfusedStickFigure({ className }: ConfusedStickFigureProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [lookDirection, setLookDirection] = useState<'left' | 'right'>('left');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Cycle through confused messages - 4s interval for better readability
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % CONFUSED_MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Searching animation - look left and right (3s for natural feel, synced with head tilt)
  useEffect(() => {
    // Skip looking animation if reduced motion is preferred
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setLookDirection((prev) => (prev === 'left' ? 'right' : 'left'));
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const eyeOffsetX = lookDirection === 'left' ? -3 : 3;

  return (
    <motion.div
      ref={containerRef}
      className={className}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -6, -1, -8, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? {}
          : {
              duration: 4,
              repeat: Infinity,
              ease: [0.45, 0.05, 0.55, 0.95],
              times: [0, 0.35, 0.5, 0.75, 1],
            }
      }
    >
      <svg
        viewBox="0 -60 280 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Confused animated stick figure character looking for the page"
      >
        {/* Thought Bubble with confused messages */}
        <g>
          {/* Small trailing circles (thought bubble connectors) - staggered pulse */}
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
            {/* Bubble background */}
            <rect
              x="140"
              y="-45"
              width="130"
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
              y="-45"
              width="130"
              height="55"
              rx="20"
              ry="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
            />

            {/* Message text with fade transition */}
            <AnimatePresence mode="wait">
              <motion.text
                key={messageIndex}
                x="205"
                y="-15"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                className="text-foreground"
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono), monospace',
                }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
                transition={prefersReducedMotion ? {} : { duration: 0.5, ease: 'easeInOut' }}
              >
                {CONFUSED_MESSAGES[messageIndex]}
              </motion.text>
            </AnimatePresence>
          </motion.g>
        </g>

        {/* Head - slight tilt for confused look with spring physics */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: lookDirection === 'left' ? -6 : 6,
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  mass: 0.8,
                }
          }
          style={{ transformOrigin: '100px 45px' }}
        >
          <motion.circle
            cx="100"
            cy="45"
            r="35"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-foreground"
          />

          {/* Eyes - looking around (searching) with spring physics */}
          <motion.circle
            cx={88 + (prefersReducedMotion ? 0 : eyeOffsetX)}
            cy={40}
            r="4"
            fill="currentColor"
            className="text-foreground"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    cx: 88 + eyeOffsetX,
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    type: 'spring',
                    stiffness: 180,
                    damping: 18,
                    mass: 0.6,
                  }
            }
          />
          <motion.circle
            cx={112 + (prefersReducedMotion ? 0 : eyeOffsetX)}
            cy={40}
            r="4"
            fill="currentColor"
            className="text-foreground"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    cx: 112 + eyeOffsetX,
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    type: 'spring',
                    stiffness: 180,
                    damping: 18,
                    mass: 0.6,
                  }
            }
          />

          {/* Confused eyebrows - raised and asymmetric with spring physics */}
          <motion.line
            x1="78"
            y1="28"
            x2="95"
            y2="25"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-foreground"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y1: lookDirection === 'left' ? 25 : 29,
                    y2: lookDirection === 'left' ? 22 : 27,
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }
            }
          />
          <motion.line
            x1="105"
            y1="25"
            x2="122"
            y2="28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-foreground"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y1: lookDirection === 'right' ? 22 : 27,
                    y2: lookDirection === 'right' ? 25 : 29,
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }
            }
          />

          {/* Confused expression - wavy mouth */}
          <motion.path
            d="M85 58 Q92 53 100 58 Q108 63 115 58"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="text-foreground"
          />

          {/* Question mark above head */}
          <motion.g
            animate={
              prefersReducedMotion
                ? { opacity: 0.85 }
                : {
                    y: [0, -3, 0],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          >
            <text
              x="125"
              y="15"
              fill="currentColor"
              className="text-primary"
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'var(--font-sans), sans-serif',
              }}
            >
              ?
            </text>
          </motion.g>
        </motion.g>

        {/* Body */}
        <line
          x1="100"
          y1="80"
          x2="100"
          y2="170"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-foreground"
        />

        {/* Left Arm - scratching head */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: [-8, 2, -8],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }
          }
          style={{ transformOrigin: '100px 100px' }}
        >
          <line
            x1="100"
            y1="100"
            x2="55"
            y2="80"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />
          {/* Hand near head - scratching motion */}
          <motion.g
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [0, 2.5, 0, -2.5, 0],
                    y: [0, -1, 0, -1, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    duration: 0.6,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                  }
            }
          >
            <circle
              cx="50"
              cy="75"
              r="6"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-foreground"
            />
          </motion.g>
        </motion.g>

        {/* Right Arm - hand shading eyes (searching) */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: lookDirection === 'left' ? -6 : 6,
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  mass: 0.8,
                }
          }
          style={{ transformOrigin: '100px 100px' }}
        >
          <line
            x1="100"
            y1="100"
            x2="145"
            y2="70"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />
          {/* Hand shading eyes */}
          <line
            x1="145"
            y1="70"
            x2="165"
            y2="55"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />
          <line
            x1="165"
            y1="55"
            x2="175"
            y2="58"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-foreground"
          />
        </motion.g>

        {/* Legs - slight shuffle animation */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 1.5, 0, -1.5, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }
          }
        >
          {/* Left Leg */}
          <line
            x1="100"
            y1="170"
            x2="65"
            y2="250"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />

          {/* Right Leg */}
          <line
            x1="100"
            y1="170"
            x2="135"
            y2="250"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />

          {/* Left Foot */}
          <line
            x1="65"
            y1="250"
            x2="50"
            y2="255"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />

          {/* Right Foot */}
          <line
            x1="135"
            y1="250"
            x2="150"
            y2="255"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />
        </motion.g>

        {/* Floating Island - slightly broken/cracked for 404 theme */}
        <g id="island">
          {/* Main island body - earthy brown tones */}
          <ellipse
            cx="100"
            cy="290"
            rx="70"
            ry="20"
            fill="#8B7355"
          />
          {/* Island top surface - grass green */}
          <ellipse
            cx="100"
            cy="285"
            rx="68"
            ry="18"
            fill="#4A7C23"
          />
          {/* Grass highlights */}
          <ellipse
            cx="100"
            cy="283"
            rx="60"
            ry="14"
            fill="#5D9E2B"
          />

          {/* Island bottom rocky layers */}
          <path
            d="M35 290 Q50 310 70 320 Q100 330 130 320 Q150 310 165 290"
            fill="#6B5344"
          />
          <path
            d="M45 295 Q60 315 80 322 Q100 328 120 322 Q140 315 155 295"
            fill="#5A4636"
          />

          {/* Crack in the island - 404 damage! */}
          <motion.path
            d="M85 280 L90 300 L82 310 L88 325"
            stroke="#3D2B1F"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={
              prefersReducedMotion
                ? { opacity: 0.65 }
                : {
                    opacity: [0.5, 0.8, 0.5],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />

          {/* Small plants/grass tufts - some wilted */}
          <g stroke="#3D6B1E" strokeWidth="2" strokeLinecap="round">
            <line x1="60" y1="280" x2="55" y2="270" />
            <line x1="60" y1="280" x2="60" y2="268" />
            <line x1="60" y1="280" x2="65" y2="272" />

            <line x1="140" y1="280" x2="135" y2="272" />
            <line x1="140" y1="280" x2="140" y2="268" />
            <line x1="140" y1="280" x2="145" y2="270" />

            <line x1="80" y1="278" x2="78" y2="272" />
            <line x1="80" y1="278" x2="82" y2="270" />

            <line x1="120" y1="278" x2="118" y2="270" />
            <line x1="120" y1="278" x2="122" y2="272" />
          </g>

          {/* Broken signpost with 404 */}
          <motion.g
            animate={
              prefersReducedMotion
                ? {}
                : {
                    rotate: [-2.5, 2.5, -2.5],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                  }
            }
            style={{ transformOrigin: '45px 280px' }}
          >
            {/* Post */}
            <line
              x1="45"
              y1="280"
              x2="45"
              y2="245"
              stroke="#8B4513"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Sign board - tilted */}
            <rect
              x="35"
              y="230"
              width="40"
              height="18"
              rx="2"
              fill="#A0522D"
              transform="rotate(-10 55 239)"
            />
            <text
              x="55"
              y="243"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFE4C4"
              style={{ fontSize: '10px', fontWeight: 'bold' }}
              transform="rotate(-10 55 243)"
            >
              404
            </text>
          </motion.g>

          {/* Small flower accents - some faded */}
          <circle cx="130" cy="277" r="2.5" fill="#FF69B4" opacity="0.6" />
          <circle cx="95" cy="279" r="2" fill="#87CEEB" opacity="0.5" />
        </g>

        {/* Floating question marks around */}
        <motion.text
          x="25"
          y="100"
          fill="currentColor"
          className="text-muted-foreground"
          style={{ fontSize: '16px', opacity: 0.3 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.3 }
              : {
                  y: [100, 88, 100],
                  opacity: [0.2, 0.45, 0.2],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }
          }
        >
          ?
        </motion.text>
        <motion.text
          x="240"
          y="150"
          fill="currentColor"
          className="text-muted-foreground"
          style={{ fontSize: '14px', opacity: 0.3 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.25 }
              : {
                  y: [150, 138, 150],
                  opacity: [0.15, 0.4, 0.15],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  delay: 0.8,
                }
          }
        >
          ?
        </motion.text>
      </svg>
    </motion.div>
  );
}
