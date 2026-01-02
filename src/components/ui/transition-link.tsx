'use client';

import { useCallback, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { useViewTransition } from '@/lib/hooks';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /**
   * Callback executed before the transition starts.
   * Useful for setting up transition names or other preparations.
   */
  beforeTransition?: () => void;
  /**
   * If true, the link behaves like a regular Next.js Link without transitions.
   */
  disableTransition?: boolean;
}

/**
 * A Link component that uses the View Transitions API for smooth page transitions.
 * Falls back to regular navigation in browsers that don't support View Transitions.
 */
export function TransitionLink({
  href,
  children,
  className,
  beforeTransition,
  disableTransition = false,
}: TransitionLinkProps) {
  const { navigateWithTransition, supportsViewTransitions } = useViewTransition();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Allow default behavior if transitions are disabled or not supported
      if (disableTransition || !supportsViewTransitions) {
        return;
      }

      // Prevent default navigation
      e.preventDefault();

      // Navigate with transition
      navigateWithTransition(href, { beforeTransition });
    },
    [href, navigateWithTransition, beforeTransition, disableTransition, supportsViewTransitions]
  );

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
