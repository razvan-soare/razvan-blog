'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface ReadingProgressBarProps {
  /**
   * Selector for the article content element to track progress against.
   * Defaults to 'article' if not provided.
   */
  contentSelector?: string;
}

/**
 * A reading progress indicator that shows how far the user has scrolled
 * through the article content. Appears as a subtle horizontal bar at the
 * top of the page that fills as the user scrolls down.
 *
 * Features:
 * - Tracks progress against specific article content area
 * - Smooth animation on scroll
 * - Respects reduced-motion preferences
 * - Uses accent color from theme
 */
export function ReadingProgressBar({
  contentSelector = 'article',
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);

  const calculateProgress = useCallback(() => {
    const contentElement = document.querySelector(contentSelector);

    if (!contentElement) {
      return;
    }

    const rect = contentElement.getBoundingClientRect();
    const contentTop = rect.top + window.scrollY;
    const contentHeight = contentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Calculate how far through the article we've scrolled
    // Progress starts when article top reaches viewport top
    // Progress ends when article bottom reaches viewport bottom
    const scrollableDistance = contentHeight - windowHeight;
    const scrolledDistance = window.scrollY - contentTop;

    // Clamp progress between 0 and 100
    const calculatedProgress = Math.min(
      100,
      Math.max(0, (scrolledDistance / scrollableDistance) * 100)
    );

    // Only show progress bar once user has started reading (scrolled past header area)
    const hasStartedReading = window.scrollY > contentTop - windowHeight / 2;
    setIsVisible(hasStartedReading && calculatedProgress < 100);

    setProgress(calculatedProgress);
  }, [contentSelector]);

  useEffect(() => {
    // Check reduced motion preference
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    // Calculate initial progress after a microtask to avoid setState during render
    const timeoutId = setTimeout(() => {
      calculateProgress();
    }, 0);

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also recalculate on resize
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateProgress]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
