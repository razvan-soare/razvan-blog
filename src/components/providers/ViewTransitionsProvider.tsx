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

      /* Project titles - true morphing animation
         The ::view-transition-group handles position/size morphing automatically.
         We only configure timing and let the browser do the FLIP animation. */
      ::view-transition-group(project-title-*) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Allow the old/new snapshots to crossfade smoothly during the morph.
         The key is to NOT set fixed width/height so the browser can interpolate size. */
      ::view-transition-old(project-title-*),
      ::view-transition-new(project-title-*) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        /* Let the browser handle size interpolation - no fixed dimensions */
        mix-blend-mode: normal;
      }

      /* Crossfade the content during the morph for smoother text transition */
      ::view-transition-old(project-title-*) {
        animation-name: vt-morph-fade-out;
      }

      ::view-transition-new(project-title-*) {
        animation-name: vt-morph-fade-in;
      }

      /* Subtle crossfade that complements the position/size morph */
      @keyframes vt-morph-fade-out {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }

      @keyframes vt-morph-fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      /* ============================================
         Project Image Transitions
         Morph from card thumbnail to hero image
         ============================================ */

      /* Image container morphing - browser handles position/size interpolation */
      ::view-transition-group(project-image-*) {
        animation-duration: 450ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        /* Ensure overflow is visible during the morph */
        overflow: clip;
      }

      /* Image snapshots - crossfade during the morph */
      ::view-transition-old(project-image-*),
      ::view-transition-new(project-image-*) {
        animation-duration: 450ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        /* No fixed dimensions - let the browser interpolate */
        object-fit: cover;
        mix-blend-mode: normal;
      }

      ::view-transition-old(project-image-*) {
        animation-name: vt-morph-fade-out;
      }

      ::view-transition-new(project-image-*) {
        animation-name: vt-morph-fade-in;
      }

      /* ============================================
         Blog Post Title Transitions
         True morphing from card title to page header
         ============================================ */

      /* Post titles - browser handles position/size morphing automatically */
      ::view-transition-group(post-title-*) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Allow old/new snapshots to crossfade during morph.
         No fixed dimensions so browser can interpolate size. */
      ::view-transition-old(post-title-*),
      ::view-transition-new(post-title-*) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        mix-blend-mode: normal;
      }

      /* Crossfade the text content during the morph */
      ::view-transition-old(post-title-*) {
        animation-name: vt-morph-fade-out;
      }

      ::view-transition-new(post-title-*) {
        animation-name: vt-morph-fade-in;
      }

      /* ============================================
         Blog Post Category Badge Transitions
         Morph from card badge to page header badge
         ============================================ */

      /* Category badges - true position/size morphing */
      ::view-transition-group(post-category-*) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Badge snapshots - crossfade during the morph */
      ::view-transition-old(post-category-*),
      ::view-transition-new(post-category-*) {
        animation-duration: 350ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        mix-blend-mode: normal;
      }

      ::view-transition-old(post-category-*) {
        animation-name: vt-morph-fade-out;
      }

      ::view-transition-new(post-category-*) {
        animation-name: vt-morph-fade-in;
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
