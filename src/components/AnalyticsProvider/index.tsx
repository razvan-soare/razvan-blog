'use client';

import { Suspense, useEffect, type ReactNode } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import * as Sentry from '@sentry/nextjs';
import { usePathname, useSearchParams } from 'next/navigation';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const appEnv = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV;

let posthogReady = false;
let sentryReady = false;

function RouteTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!posthogKey || !posthogReady) return;

    const search = searchParams?.toString();
    const pathWithQuery = search ? `${pathname}?${search}` : pathname;

    posthog.capture('$pageview', {
      pathname,
      path: pathWithQuery,
      $current_url: window.location.href,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (posthogKey && !posthogReady) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        autocapture: true,
        capture_pageview: false,
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
        person_profiles: 'always',
      });
      posthogReady = true;
    }

    if (sentryDsn && !sentryReady) {
      Sentry.init({
        dsn: sentryDsn,
        environment: appEnv,
        tracesSampleRate: 0.2,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
      sentryReady = true;
    }
  }, []);

  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <RouteTracking />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
