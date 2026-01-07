'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ListFilter, PenSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FeedbackForm, FeedbackList } from '@/components/feedback';
import { cn } from '@/lib/utils';

type TabValue = 'submit' | 'view';

export function FeedbackPageClient() {
  const [activeTab, setActiveTab] = React.useState<TabValue>('submit');
  const prefersReducedMotion = useReducedMotion();

  const handleFormSuccess = () => {
    setTimeout(() => {
      setActiveTab('view');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-muted/50 rounded-lg border border-border/50">
          <button
            onClick={() => setActiveTab('submit')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'submit'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <PenSquare className="size-4" />
            Submit Feedback
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'view'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <ListFilter className="size-4" />
            View Submissions
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'submit' ? (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <FeedbackForm onSuccess={handleFormSuccess} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <FeedbackList />
        )}
      </motion.div>

      {/* Help Section */}
      <div className="mt-16 pt-8 border-t border-border/50">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What kind of feedback is helpful?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-card/50 rounded-lg border border-border/50">
              <h3 className="font-medium text-foreground mb-2">Design & Visuals</h3>
              <p className="text-sm text-muted-foreground">
                Colors, layout, typography, overall aesthetic - does the dark theme work well?
              </p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-border/50">
              <h3 className="font-medium text-foreground mb-2">Animations</h3>
              <p className="text-sm text-muted-foreground">
                The stick figure, thought bubbles, page transitions - engaging or distracting?
              </p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-border/50">
              <h3 className="font-medium text-foreground mb-2">Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Is it easy to find content? Any confusing UI elements?
              </p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-border/50">
              <h3 className="font-medium text-foreground mb-2">Bugs & Issues</h3>
              <p className="text-sm text-muted-foreground">
                Broken links, display issues, performance problems - anything that didn&apos;t work right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
