'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface StickFigureProps {
  className?: string;
}

export function StickFigure({ className }: StickFigureProps) {
  const [isWaving, setIsWaving] = useState(false);

  const handleInteraction = () => {
    if (!isWaving) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }
  };

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onHoverStart={handleInteraction}
      onClick={handleInteraction}
      style={{ cursor: 'pointer' }}
    >
      <svg
        viewBox="0 0 200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated stick figure character"
      >
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

        {/* Eyes */}
        <circle cx="88" cy="40" r="4" fill="currentColor" className="text-foreground" />
        <circle cx="112" cy="40" r="4" fill="currentColor" className="text-foreground" />

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
            isWaving
              ? {
                  rotate: [0, -20, -60, -20, -60, -20, 0],
                }
              : { rotate: 0 }
          }
          transition={
            isWaving
              ? {
                  duration: 1.2,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
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
              isWaving
                ? {
                    rotate: [0, 15, -15, 15, -15, 15, 0],
                  }
                : { rotate: 0 }
            }
            transition={
              isWaving
                ? {
                    duration: 1.2,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
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
      </svg>
    </motion.div>
  );
}
