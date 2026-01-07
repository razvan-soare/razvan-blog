'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Trash2, Download, FileJson, FileSpreadsheet, Star, Calendar, Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFeedback, downloadFeedbackAsJson, downloadFeedbackAsCsv } from '@/lib/hooks/use-feedback';
import { FEEDBACK_CATEGORIES, RATING_ASPECTS, type FeedbackEntry } from '@/types/feedback';
import { cn } from '@/lib/utils';

interface FeedbackListProps {
  className?: string;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getCategoryLabel(category: string): string {
  return FEEDBACK_CATEGORIES.find((c) => c.value === category)?.label || category;
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    design: 'bg-purple-500/20 text-purple-400',
    functionality: 'bg-blue-500/20 text-blue-400',
    content: 'bg-green-500/20 text-green-400',
    accessibility: 'bg-yellow-500/20 text-yellow-400',
    'character-animations': 'bg-pink-500/20 text-pink-400',
    other: 'bg-gray-500/20 text-gray-400',
  };
  return colors[category] || colors.other;
}

function StarDisplay({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'size-3',
            i < value
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-transparent text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
}

function FeedbackCard({
  entry,
  onDelete,
}: {
  entry: FeedbackEntry;
  onDelete: (id: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const averageRating =
    Object.values(entry.ratings).filter((r) => r > 0).reduce((sum, r) => sum + r, 0) /
    Object.values(entry.ratings).filter((r) => r > 0).length || 0;

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(entry.category)}>
                  <Tag className="size-3 mr-1" />
                  {getCategoryLabel(entry.category)}
                </Badge>
                {averageRating > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    {averageRating.toFixed(1)}
                  </span>
                )}
              </div>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="size-3" />
                {formatDate(entry.timestamp)}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(entry.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ratings Grid */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-left"
          >
            <div className="text-xs text-muted-foreground mb-2">
              Click to {isExpanded ? 'collapse' : 'expand'} ratings
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {RATING_ASPECTS.map((aspect) => (
                      <div key={aspect.key} className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground truncate">
                          {aspect.label}
                        </span>
                        <StarDisplay value={entry.ratings[aspect.key]} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Comments */}
          {entry.comments && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Comments</span>
              <p className="text-sm text-foreground">{entry.comments}</p>
            </div>
          )}

          {/* Bugs/Issues */}
          {entry.bugsOrIssues && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-destructive">Bugs/Issues</span>
              <p className="text-sm text-foreground">{entry.bugsOrIssues}</p>
            </div>
          )}

          {/* Contact Info */}
          {(entry.contactName || entry.contactEmail) && (
            <div className="pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {entry.contactName && <span>{entry.contactName}</span>}
                {entry.contactName && entry.contactEmail && <span>&bull;</span>}
                {entry.contactEmail && (
                  <a
                    href={`mailto:${entry.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {entry.contactEmail}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Page Info */}
          {entry.page && (
            <div className="text-xs text-muted-foreground">
              Submitted from: <code className="text-primary">{entry.page}</code>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FeedbackList({ className }: FeedbackListProps) {
  const { feedback, removeFeedback, clearAllFeedback } = useFeedback();
  const prefersReducedMotion = useReducedMotion();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all feedback? This cannot be undone.')) {
      clearAllFeedback();
    }
  };

  if (feedback.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="text-muted-foreground">
          <p className="text-lg font-medium">No feedback yet</p>
          <p className="text-sm mt-1">Feedback submissions will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Collected Feedback
          </h3>
          <p className="text-sm text-muted-foreground">
            {feedback.length} {feedback.length === 1 ? 'submission' : 'submissions'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadFeedbackAsJson}
            title="Export as JSON"
          >
            <FileJson className="size-4" />
            <span className="hidden sm:inline">JSON</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadFeedbackAsCsv}
            title="Export as CSV"
          >
            <FileSpreadsheet className="size-4" />
            <span className="hidden sm:inline">CSV</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearAll}
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Clear All</span>
          </Button>
        </div>
      </div>

      {/* Feedback Cards */}
      <motion.div
        className="grid gap-4"
        layout={!prefersReducedMotion}
      >
        <AnimatePresence mode="popLayout">
          {feedback
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((entry) => (
              <FeedbackCard
                key={entry.id}
                entry={entry}
                onDelete={removeFeedback}
              />
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
