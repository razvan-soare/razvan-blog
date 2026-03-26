'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewTransitionOnBack() {
  const router = useRouter();

  useEffect(() => {
    if (!document.startViewTransition) return;

    const handler = (e: PopStateEvent) => {
      if (!e.state?.__NA) return;

      // Prevent Next.js default popstate handler which uses ACTION_RESTORE
      // (doesn't trigger view transitions). Instead use router.replace()
      // which uses ACTION_NAVIGATE and properly activates React ViewTransition.
      e.stopImmediatePropagation();

      const path =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      router.replace(path);
    };

    window.addEventListener('popstate', handler, true);
    return () => window.removeEventListener('popstate', handler, true);
  }, [router]);

  return null;
}
