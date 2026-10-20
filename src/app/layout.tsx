import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from '@/lib/ThemeContext';
import Header from '@/components/Header';
import ReportIssue from '@/components/ReportIssue';
import ViewTransitionOnBack from '@/components/ViewTransitionOnBack';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://soarerazvan.com'),
  title: 'Razvan Soare',
  description: 'React developer and technology enthusiast',
  openGraph: {
    title: 'Razvan Soare',
    description: 'React developer and technology enthusiast',
    url: 'https://soarerazvan.com',
    siteName: 'Razvan Soare',
    type: 'website',
    images: [
      {
        url: '/og/default',
        width: 1200,
        height: 630,
        alt: 'Razvan Soare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Razvan Soare',
    description: 'React developer and technology enthusiast',
    images: ['/og/default'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Wotfard-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Wotfard-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Wotfard';
            src: url('/fonts/Wotfard-Regular.woff2') format('woff2');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Wotfard';
            src: url('/fonts/Wotfard-Medium.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Wotfard';
            src: url('/fonts/Wotfard-SemiBold.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Wotfard';
            src: url('/fonts/Wotfard-SemiBold.woff2') format('woff2');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Sriracha';
            src: url('/fonts/sriracha-latin-400.0b3278b3dc419ca5a6b5e56f0eac466f.woff2') format('woff2');
            font-display: swap;
          }
          @font-face {
            font-family: 'Reenie';
            src: url('/fonts/ReenieBeanie-Regular.ttf') format('truetype');
            font-display: swap;
          }
        `}} />
      </head>
      <body>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a8992466-8f66-4d7d-bbca-516a317ae82b"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <AnalyticsProvider>
            <ViewTransitionOnBack />
            <Header title="Razvan Soare" />
            <main className="layout">
              {children}
            </main>
            <ReportIssue />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
