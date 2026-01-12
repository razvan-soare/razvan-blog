/**
 * StickFigure Component
 *
 * ORIGINAL ARTWORK - Created specifically for this portfolio project.
 * This animated stick figure character is an original design and is not
 * derived from any third-party source.
 *
 * Features:
 * - Eye-tracking that follows the user's cursor
 * - Parallax movement - entire character subtly shifts toward cursor position
 * - Waving animation on hover/click interaction
 * - Floating animation with gentle bobbing (4s duration, ±10px vertical, ease-in-out)
 * - Floating island base with grass, flowers, and rock layers
 * - Respects prefers-reduced-motion accessibility setting
 *
 * Animation Specifications:
 * - Updown animation: translateY between 10px and -10px
 * - Duration: 4 seconds
 * - Timing: ease-in-out
 * - Keyframes: 0% (10px), 50% (-10px), 100% (10px)
 * - Parallax: max ±4px offset with spring physics (stiffness: 150, damping: 20)
 *
 * License: MIT (as part of this project)
 * Author: Razvan
 */
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ThoughtBubble } from './ThoughtBubble';

interface StickFigureProps {
  className?: string;
}

export function StickFigure({ className }: StickFigureProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const handleInteraction = () => {
    if (!isWaving) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }
  };

  // Throttled mouse move handler - updates at most every 24ms (~42fps) for smoother tracking
  // Using a slightly higher frame rate for more responsive eye movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Skip tracking if user prefers reduced motion
    if (prefersReducedMotion) return;

    const now = performance.now();
    if (now - lastUpdateRef.current < 24) return;
    lastUpdateRef.current = now;

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.12;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Eye tracking - max 3px offset
    const maxEyeOffset = 3;
    if (distance > 0) {
      // Use eased distance for more natural feel - eyes move faster when cursor is closer
      const easedDistance = Math.min(distance / 80, 1);
      const normalizedX = (deltaX / distance) * easedDistance * maxEyeOffset;
      const normalizedY = (deltaY / distance) * easedDistance * maxEyeOffset;
      setEyeOffset({ x: normalizedX, y: normalizedY });
    }

    // Parallax effect - subtle character shift toward cursor (max 4px)
    const maxParallaxOffset = 4;
    // Use viewport dimensions for parallax calculation for smoother movement
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const parallaxDeltaX = event.clientX - viewportCenterX;
    const parallaxDeltaY = event.clientY - viewportCenterY;
    // Normalize based on viewport size for consistent feel across screen sizes
    const parallaxX = (parallaxDeltaX / viewportCenterX) * maxParallaxOffset;
    const parallaxY = (parallaxDeltaY / viewportCenterY) * maxParallaxOffset;
    setParallaxOffset({ x: parallaxX, y: parallaxY });
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [10, -10, 10],
            }
      }
      transition={
        prefersReducedMotion
          ? {}
          : {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
            }
      }
      onHoverStart={handleInteraction}
      onClick={handleInteraction}
      style={{ cursor: 'pointer' }}
    >
      <motion.svg
        viewBox="0 -50 280 390"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated stick figure character floating on an island"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: parallaxOffset.x,
                y: parallaxOffset.y,
              }
        }
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      >
        {/* Thought Bubble */}
        <ThoughtBubble />
        {/* Head */}
        <motion.circle
          cx="100"
          cy="45"
          r="35"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-foreground"
        />

        {/* Eyes - with smooth tracking using spring physics for natural feel */}
        <motion.circle
          cx={88 + eyeOffset.x}
          cy={40 + eyeOffset.y}
          r="4"
          fill="currentColor"
          className="text-foreground"
          animate={{
            cx: 88 + eyeOffset.x,
            cy: 40 + eyeOffset.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.5,
          }}
        />
        <motion.circle
          cx={112 + eyeOffset.x}
          cy={40 + eyeOffset.y}
          r="4"
          fill="currentColor"
          className="text-foreground"
          animate={{
            cx: 112 + eyeOffset.x,
            cy: 40 + eyeOffset.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.5,
          }}
        />

        {/* Smile */}
        <path
          d="M85 55 Q100 70 115 55"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="text-foreground"
        />

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

        {/* Left Arm (static) */}
        <motion.line
          x1="100"
          y1="100"
          x2="55"
          y2="140"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-foreground"
        />

        {/* Right Arm (waving) */}
        <motion.g
          style={{ originX: '100px', originY: '100px' }}
          animate={
            isWaving && !prefersReducedMotion
              ? {
                  rotate: [0, -25, -55, -25, -55, -25, 0],
                }
              : { rotate: 0 }
          }
          transition={
            isWaving && !prefersReducedMotion
              ? {
                  duration: 1.3,
                  ease: [0.25, 0.1, 0.25, 1], // Smoother cubic-bezier
                  times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
                }
              : { type: 'spring', stiffness: 200, damping: 20 }
          }
        >
          {/* Upper arm */}
          <line
            x1="100"
            y1="100"
            x2="145"
            y2="80"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />
          {/* Forearm/hand */}
          <motion.g
            animate={
              isWaving && !prefersReducedMotion
                ? {
                    rotate: [0, 18, -18, 18, -18, 18, 0],
                  }
                : { rotate: 0 }
            }
            transition={
              isWaving && !prefersReducedMotion
                ? {
                    duration: 1.3,
                    ease: [0.25, 0.1, 0.25, 1],
                    times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
                  }
                : { type: 'spring', stiffness: 200, damping: 20 }
            }
            style={{ originX: '145px', originY: '80px' }}
          >
            <line
              x1="145"
              y1="80"
              x2="165"
              y2="50"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-foreground"
            />
            {/* Hand (palm) */}
            <circle
              cx="168"
              cy="45"
              r="8"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-foreground"
            />
          </motion.g>
        </motion.g>

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

        {/* Floating Island */}
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

          {/* Small plants/grass tufts */}
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

          {/* Small flower accents */}
          <circle cx="75" cy="276" r="3" fill="#FFD700" />
          <circle cx="130" cy="277" r="2.5" fill="#FF69B4" />
          <circle cx="95" cy="279" r="2" fill="#87CEEB" />
        </g>
      </motion.svg>
    </motion.div>
  );
}
