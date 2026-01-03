'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Check if the View Transitions API is supported in the current browser
 */
export function supportsViewTransitions(): boolean {
  return (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    typeof document.startViewTransition === 'function'
  );
}

/**
 * Custom hook that provides navigation with View Transitions API support.
 * Falls back to regular navigation for browsers that don't support View Transitions.
 *
 * Optimized: Removed double requestAnimationFrame delays for faster navigation.
 * The View Transitions API handles timing internally.
 */
export function useViewTransition() {
  const router = useRouter();

  /**
   * Navigate to a URL with a view transition animation
   * @param href The URL to navigate to
   * @param options Optional configuration for the transition
   */
  const navigateWithTransition = useCallback(
    (href: string, options?: { beforeTransition?: () => void }) => {
      // Execute any pre-transition callback (e.g., to set transition names)
      options?.beforeTransition?.();

      if (supportsViewTransitions()) {
        // Use View Transitions API for smooth page transitions
        // The API handles the timing internally - no need for RAF delays
        document.startViewTransition!(() => {
          router.push(href);
          // Resolve immediately - the View Transitions API will capture
          // the new state when React commits the DOM update
          return Promise.resolve();
        });
      } else {
        // Fallback for browsers without View Transitions support (Safari, Firefox)
        router.push(href);
      }
    },
    [router]
  );

  return {
    navigateWithTransition,
    supportsViewTransitions: supportsViewTransitions(),
  };
}
