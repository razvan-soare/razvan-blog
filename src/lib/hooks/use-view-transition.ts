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
        document.startViewTransition!(() => {
          router.push(href);
          // Return a promise that resolves after a small delay to let React update
          return new Promise<void>((resolve) => {
            // Wait for the next frame to ensure the DOM has updated
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                resolve();
              });
            });
          });
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
