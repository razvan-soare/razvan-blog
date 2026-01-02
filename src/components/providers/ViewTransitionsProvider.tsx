'use client';

import { useEffect } from 'react';
import { supportsViewTransitions } from '@/lib/hooks';

/**
 * Injects View Transitions CSS styles dynamically for browsers that support it.
 * This avoids CSS parsing issues with Turbopack for the ::view-transition pseudo-elements.
 */
export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!supportsViewTransitions()) {
      return;
    }

    // Inject View Transitions CSS dynamically
    const style = document.createElement('style');
    style.id = 'view-transitions-css';
    style.textContent = `
      /* ============================================
         View Transitions API Styles
         ============================================ */

      /* Root transition settings */
      ::view-transition {
        pointer-events: none;
      }

      /* Default page transition - subtle crossfade for root */
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        mix-blend-mode: normal;
      }

      ::view-transition-old(root) {
        animation-name: vt-fade-out;
      }

      ::view-transition-new(root) {
        animation-name: vt-fade-in;
      }

      @keyframes vt-fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes vt-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* ============================================
         Project Title Transitions
         Morph from card title to hero title
         ============================================ */

      /* Project titles - smooth morph animation */
      ::view-transition-group(project-title-*) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-old(project-title-*),
      ::view-transition-new(project-title-*) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        height: 100%;
        width: 100%;
        object-fit: none;
      }

      ::view-transition-old(project-title-*) {
        animation-name: vt-title-morph-out;
      }

      ::view-transition-new(project-title-*) {
        animation-name: vt-title-morph-in;
      }

      @keyframes vt-title-morph-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes vt-title-morph-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* ============================================
         Project Image Transitions
         Morph from card thumbnail to hero image
         ============================================ */

      ::view-transition-group(project-image-*) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-old(project-image-*),
      ::view-transition-new(project-image-*) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        object-fit: cover;
        overflow: hidden;
      }

      ::view-transition-old(project-image-*) {
        animation-name: vt-image-morph-out;
      }

      ::view-transition-new(project-image-*) {
        animation-name: vt-image-morph-in;
      }

      @keyframes vt-image-morph-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes vt-image-morph-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* ============================================
         Blog Post Title Transitions
         ============================================ */

      ::view-transition-group(post-title-*) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-old(post-title-*),
      ::view-transition-new(post-title-*) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        height: 100%;
        width: 100%;
      }

      ::view-transition-old(post-title-*) {
        animation-name: vt-title-morph-out;
      }

      ::view-transition-new(post-title-*) {
        animation-name: vt-title-morph-in;
      }

      /* ============================================
         Blog Post Category Badge Transitions
         ============================================ */

      ::view-transition-group(post-category-*) {
        animation-duration: 300ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-old(post-category-*),
      ::view-transition-new(post-category-*) {
        animation-duration: 300ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-old(post-category-*) {
        animation-name: vt-badge-morph-out;
      }

      ::view-transition-new(post-category-*) {
        animation-name: vt-badge-morph-in;
      }

      @keyframes vt-badge-morph-out {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.95); }
      }

      @keyframes vt-badge-morph-in {
        from { opacity: 0; transform: scale(1.05); }
        to { opacity: 1; transform: scale(1); }
      }

      /* ============================================
         Reduce motion for accessibility
         ============================================ */
      @media (prefers-reduced-motion: reduce) {
        ::view-transition-old(root),
        ::view-transition-new(root),
        ::view-transition-old(project-title-*),
        ::view-transition-new(project-title-*),
        ::view-transition-old(project-image-*),
        ::view-transition-new(project-image-*),
        ::view-transition-old(post-title-*),
        ::view-transition-new(post-title-*),
        ::view-transition-old(post-category-*),
        ::view-transition-new(post-category-*) {
          animation-duration: 0.01ms !important;
        }

        ::view-transition-group(project-title-*),
        ::view-transition-group(project-image-*),
        ::view-transition-group(post-title-*),
        ::view-transition-group(post-category-*) {
          animation-duration: 0.01ms !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('view-transitions-css');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return <>{children}</>;
}
