'use client';

/**
 * HeartLikeButton Cross-Browser & Device Testing Page
 *
 * This page provides a comprehensive testing environment for the HeartLikeButton
 * component across different browsers and viewport sizes.
 *
 * Testing Instructions:
 * 1. Open this page in different browsers (Chrome, Firefox, Safari, Edge)
 * 2. Use browser DevTools to test different viewport sizes
 * 3. Test with keyboard navigation (Tab, Enter, Space)
 * 4. Enable "Reduce motion" in system preferences to test a11y
 * 5. Open DevTools console to check for errors/warnings
 *
 * Viewport Sizes to Test:
 * - Desktop: 1920px, 1440px, 1024px
 * - Tablet: 768px
 * - Mobile: 375px, 320px
 */

import { useState, useEffect } from 'react';
import { HeartLikeButton } from '@/components/like-button/HeartLikeButton';
import { HeartSVG, HeartSVGMaterial, HeartSVGCompact } from '@/components/like-button/HeartSVG';
import { SiteLikeButton } from '@/components/like-button/SiteLikeButton';
import { LikeButton } from '@/components/like-button/LikeButton';
import { cn } from '@/lib/utils';

interface TestCase {
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'pending';
  notes?: string;
}

export default function HeartButtonTestPage() {
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [testResults, setTestResults] = useState<TestCase[]>([
    { name: 'Heart icon renders', description: 'SVG heart displays correctly', status: 'pending' },
    { name: 'Click toggles state', description: 'Clicking changes liked/unliked', status: 'pending' },
    { name: 'Animation plays', description: 'Fill animation runs smoothly', status: 'pending' },
    { name: 'Keyboard navigation', description: 'Tab focus and Enter/Space work', status: 'pending' },
    { name: 'Hover states', description: 'Hover effects on desktop', status: 'pending' },
    { name: 'Touch interaction', description: 'Tap works on mobile/tablet', status: 'pending' },
    { name: 'Count updates', description: 'Like count increments/decrements', status: 'pending' },
    { name: 'No console errors', description: 'No JS errors in console', status: 'pending' },
    { name: 'Reduced motion', description: 'Respects prefers-reduced-motion', status: 'pending' },
    { name: 'ARIA labels', description: 'Screen reader announces correctly', status: 'pending' },
  ]);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('resize', updateWidth);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const updateTestResult = (index: number, status: 'pass' | 'fail', notes?: string) => {
    setTestResults(prev => prev.map((test, i) =>
      i === index ? { ...test, status, notes } : test
    ));
  };

  const getViewportCategory = (width: number) => {
    if (width >= 1920) return 'Desktop XL (1920px+)';
    if (width >= 1440) return 'Desktop L (1440px+)';
    if (width >= 1024) return 'Desktop M (1024px+)';
    if (width >= 768) return 'Tablet (768px+)';
    if (width >= 375) return 'Mobile L (375px+)';
    return 'Mobile S (320px+)';
  };

  const getBrowserInfo = () => {
    if (typeof window === 'undefined') return 'Unknown';
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    return 'Unknown';
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 border-b border-border pb-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            HeartLikeButton Testing Suite
          </h1>
          <p className="text-muted-foreground">
            Cross-browser and device testing page for the HeartLikeButton component
          </p>
        </header>

        {/* Environment Info */}
        <section className="mb-8 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-3">Environment</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Browser:</span>
              <span className="ml-2 font-medium">{getBrowserInfo()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Viewport:</span>
              <span className="ml-2 font-medium">{viewportWidth}px</span>
            </div>
            <div>
              <span className="text-muted-foreground">Category:</span>
              <span className="ml-2 font-medium">{getViewportCategory(viewportWidth)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Reduced Motion:</span>
              <span className={cn(
                'ml-2 font-medium',
                prefersReducedMotion ? 'text-yellow-500' : 'text-green-500'
              )}>
                {prefersReducedMotion ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </section>

        {/* Test Cases Checklist */}
        <section className="mb-8 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-3">Test Checklist</h2>
          <div className="space-y-2">
            {testResults.map((test, index) => (
              <div
                key={test.name}
                className="flex items-center justify-between p-2 rounded bg-background"
              >
                <div className="flex-1">
                  <span className="font-medium">{test.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    - {test.description}
                  </span>
                  {test.notes && (
                    <span className="text-xs text-muted-foreground block ml-4">
                      Note: {test.notes}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTestResult(index, 'pass')}
                    className={cn(
                      'px-3 py-1 rounded text-xs font-medium transition-colors',
                      test.status === 'pass'
                        ? 'bg-green-500 text-white'
                        : 'bg-muted hover:bg-green-500/20'
                    )}
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => updateTestResult(index, 'fail')}
                    className={cn(
                      'px-3 py-1 rounded text-xs font-medium transition-colors',
                      test.status === 'fail'
                        ? 'bg-red-500 text-white'
                        : 'bg-muted hover:bg-red-500/20'
                    )}
                  >
                    Fail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Component Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HeartLikeButton Tests */}
          <section className="p-4 bg-card rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">HeartLikeButton</h2>

            {/* Default Size */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Default (60px)
              </h3>
              <div className="flex justify-center p-4 bg-background rounded">
                <HeartLikeButton />
              </div>
            </div>

            {/* Various Sizes */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Size Variations
              </h3>
              <div className="flex items-end justify-center gap-4 p-4 bg-background rounded flex-wrap">
                <div className="text-center">
                  <HeartLikeButton size={24} showCount={false} />
                  <span className="text-xs text-muted-foreground block mt-1">24px</span>
                </div>
                <div className="text-center">
                  <HeartLikeButton size={40} showCount={false} />
                  <span className="text-xs text-muted-foreground block mt-1">40px</span>
                </div>
                <div className="text-center">
                  <HeartLikeButton size={60} showCount={false} />
                  <span className="text-xs text-muted-foreground block mt-1">60px</span>
                </div>
                <div className="text-center">
                  <HeartLikeButton size={80} showCount={false} />
                  <span className="text-xs text-muted-foreground block mt-1">80px</span>
                </div>
              </div>
            </div>

            {/* Color Variations */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Color Variations
              </h3>
              <div className="flex items-center justify-center gap-4 p-4 bg-background rounded flex-wrap">
                <div className="text-center">
                  <HeartLikeButton
                    size={40}
                    showCount={false}
                    inactiveColor="#fff200"
                    activeColor="#fff200"
                  />
                  <span className="text-xs text-muted-foreground block mt-1">Yellow</span>
                </div>
                <div className="text-center">
                  <HeartLikeButton
                    size={40}
                    showCount={false}
                    inactiveColor="#e60067"
                    activeColor="#e60067"
                  />
                  <span className="text-xs text-muted-foreground block mt-1">Pink #e60067</span>
                </div>
                <div className="text-center">
                  <HeartLikeButton
                    size={40}
                    showCount={false}
                    inactiveColor="#f43f5e"
                    activeColor="#f43f5e"
                  />
                  <span className="text-xs text-muted-foreground block mt-1">Rose</span>
                </div>
              </div>
            </div>

            {/* Pre-liked State */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Initial States
              </h3>
              <div className="flex items-center justify-center gap-8 p-4 bg-background rounded">
                <div className="text-center">
                  <HeartLikeButton initialLiked={false} initialCount={0} />
                  <span className="text-xs text-muted-foreground block mt-1">Not liked</span>
                </div>
                <div className="text-center">
                  <HeartLikeButton initialLiked={true} initialCount={42} />
                  <span className="text-xs text-muted-foreground block mt-1">Pre-liked</span>
                </div>
              </div>
            </div>
          </section>

          {/* HeartSVG Variants */}
          <section className="p-4 bg-card rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">HeartSVG Variants</h2>

            {/* HeartSVG Default */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                HeartSVG (Default)
              </h3>
              <div className="flex items-center justify-center gap-4 p-4 bg-background rounded">
                <div className="text-center">
                  <HeartSVG size={50} isActive={false} />
                  <span className="text-xs text-muted-foreground block mt-1">Inactive</span>
                </div>
                <div className="text-center">
                  <HeartSVG size={50} isActive={true} />
                  <span className="text-xs text-muted-foreground block mt-1">Active</span>
                </div>
              </div>
            </div>

            {/* HeartSVGMaterial */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                HeartSVGMaterial
              </h3>
              <div className="flex items-center justify-center gap-4 p-4 bg-background rounded">
                <div className="text-center">
                  <HeartSVGMaterial size={50} isActive={false} />
                  <span className="text-xs text-muted-foreground block mt-1">Inactive</span>
                </div>
                <div className="text-center">
                  <HeartSVGMaterial size={50} isActive={true} />
                  <span className="text-xs text-muted-foreground block mt-1">Active</span>
                </div>
              </div>
            </div>

            {/* HeartSVGCompact */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                HeartSVGCompact
              </h3>
              <div className="flex items-center justify-center gap-4 p-4 bg-background rounded">
                <div className="text-center">
                  <HeartSVGCompact size={50} isActive={false} />
                  <span className="text-xs text-muted-foreground block mt-1">Inactive</span>
                </div>
                <div className="text-center">
                  <HeartSVGCompact size={50} isActive={true} />
                  <span className="text-xs text-muted-foreground block mt-1">Active</span>
                </div>
              </div>
            </div>
          </section>

          {/* SiteLikeButton Test */}
          <section className="p-4 bg-card rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">SiteLikeButton</h2>
            <div className="p-4 bg-background rounded">
              <p className="text-sm text-muted-foreground mb-4">
                Used in the footer. Persists to localStorage.
              </p>
              <SiteLikeButton />
            </div>
          </section>

          {/* LikeButton (PuzzleHeart) Test */}
          <section className="p-4 bg-card rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">LikeButton (PuzzleHeart)</h2>
            <div className="p-4 bg-background rounded">
              <p className="text-sm text-muted-foreground mb-4">
                Used on article pages. 8 pieces, persists to localStorage.
              </p>
              <div className="flex justify-center">
                <LikeButton articleSlug="test-article" />
              </div>
            </div>
          </section>
        </div>

        {/* Accessibility Testing Section */}
        <section className="mt-8 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Accessibility Testing</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Keyboard Navigation Test</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Tab to each button below and press Enter or Space to toggle:
              </p>
              <div className="flex items-center gap-4 p-4 bg-background rounded flex-wrap">
                <HeartLikeButton size={40} showCount={false} />
                <HeartLikeButton size={40} showCount={false} />
                <HeartLikeButton size={40} showCount={false} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Focus Visibility</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Focus ring should be clearly visible when tabbing:
              </p>
              <div className="p-4 bg-background rounded">
                <HeartLikeButton size={60} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Screen Reader Test</h3>
              <p className="text-sm text-muted-foreground">
                ARIA attributes present:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2">
                <li>aria-label: &quot;Like this&quot; / &quot;Unlike this&quot;</li>
                <li>aria-pressed: true/false based on state</li>
                <li>Button role: implicit from &lt;button&gt; element</li>
                <li>SVG has aria-hidden=&quot;true&quot;</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Container Overflow Test */}
        <section className="mt-8 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Container Overflow Test</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Button should not overflow these constrained containers:
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="w-20 h-20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
              <HeartLikeButton size={50} showCount={false} />
            </div>
            <div className="w-16 h-16 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
              <HeartLikeButton size={40} showCount={false} />
            </div>
            <div className="w-12 h-12 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
              <HeartLikeButton size={32} showCount={false} />
            </div>
          </div>
        </section>

        {/* Testing Notes */}
        <section className="mt-8 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Testing Notes</h2>
          <div className="prose prose-sm text-muted-foreground">
            <h3 className="text-foreground font-medium">Browser Testing Checklist:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Chrome (latest) - Primary target</li>
              <li>Firefox (latest) - Check SVG rendering</li>
              <li>Safari (if available) - Check animations</li>
              <li>Edge (latest) - Should match Chrome</li>
            </ul>

            <h3 className="text-foreground font-medium mt-4">Viewport Testing:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Desktop: 1920px, 1440px, 1024px</li>
              <li>Tablet: 768px</li>
              <li>Mobile: 375px (iPhone), 320px (small)</li>
            </ul>

            <h3 className="text-foreground font-medium mt-4">Things to Verify:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>SVG heart renders with correct proportions</li>
              <li>Yellow color matches #fff200</li>
              <li>Fill animation is smooth (not jerky)</li>
              <li>Heartbeat animation loops correctly</li>
              <li>Hover scale works on desktop (not mobile)</li>
              <li>Click/tap changes state immediately</li>
              <li>Like count animates when changing</li>
              <li>localStorage persists across refreshes</li>
              <li>No hydration mismatches (check console)</li>
              <li>Enable &quot;Reduce motion&quot; and verify animations stop</li>
            </ul>
          </div>
        </section>

        {/* Export Results */}
        <section className="mt-8 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Export Test Results</h2>
          <button
            onClick={() => {
              const results = {
                browser: getBrowserInfo(),
                viewport: viewportWidth,
                category: getViewportCategory(viewportWidth),
                reducedMotion: prefersReducedMotion,
                timestamp: new Date().toISOString(),
                tests: testResults,
              };
              console.log('Test Results:', JSON.stringify(results, null, 2));
              navigator.clipboard?.writeText(JSON.stringify(results, null, 2));
              alert('Test results copied to clipboard and logged to console!');
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Copy Results to Clipboard
          </button>
        </section>
      </div>
    </div>
  );
}
