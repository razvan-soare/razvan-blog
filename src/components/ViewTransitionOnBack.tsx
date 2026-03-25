'use client';

import { useEffect } from 'react';

export default function ViewTransitionOnBack() {
  useEffect(() => {
    if (!document.startViewTransition) return;

    const handler = (e: PopStateEvent) => {
      if (!e.state?.__NA) return;

      document.startViewTransition(async () => {
        await new Promise<void>((resolve) => {
          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                observer.disconnect();
                requestAnimationFrame(() => resolve());
                return;
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 1000);
        });
      });
    };

    window.addEventListener('popstate', handler, true);
    return () => window.removeEventListener('popstate', handler, true);
  }, []);

  return null;
}
