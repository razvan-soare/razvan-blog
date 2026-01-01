'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface StickFigureProps {
  className?: string;
}

export function StickFigure({ className }: StickFigureProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = () => {
    if (!isWaving) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.12; // Eyes position adjusted for new viewBox

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Calculate distance for normalization
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxOffset = 3; // Maximum eye movement in SVG units

      if (distance > 0) {
        // Normalize and scale the offset
        const normalizedX = (deltaX / distance) * Math.min(distance / 100, 1) * maxOffset;
        const normalizedY = (deltaY / distance) * Math.min(distance / 100, 1) * maxOffset;
        setEyeOffset({ x: normalizedX, y: normalizedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onHoverStart={handleInteraction}
      onClick={handleInteraction}
      style={{ cursor: 'pointer' }}
    >
      <svg
        viewBox="0 0 200 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated stick figure character floating on an island"
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

        {/* Eyes - with tracking */}
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
          transition={{ duration: 0.1, ease: 'easeOut' }}
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
          transition={{ duration: 0.1, ease: 'easeOut' }}
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
      </svg>
    </motion.div>
  );
}
