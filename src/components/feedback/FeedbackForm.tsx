'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { StarRating } from '@/components/ui/star-rating';
import { useFeedback } from '@/lib/hooks/use-feedback';
import {
  FEEDBACK_CATEGORIES,
  RATING_ASPECTS,
  DEFAULT_FORM_DATA,
  type FeedbackFormData,
  type FeedbackRatings,
} from '@/types/feedback';
import { cn } from '@/lib/utils';

interface FeedbackFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  className?: string;
}

export function FeedbackForm({ onSuccess, compact = false, className }: FeedbackFormProps) {
  const { addFeedback } = useFeedback();
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = React.useState<FeedbackFormData>(DEFAULT_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FeedbackFormData, string>>>({});

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, category: e.target.value as FeedbackFormData['category'] }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  };

  const handleRatingChange = (key: keyof FeedbackRatings, value: number) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: value },
    }));
    setErrors((prev) => ({ ...prev, ratings: undefined }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FeedbackFormData, string>> = {};

    const hasAtLeastOneRating = Object.values(formData.ratings).some((r) => r > 0);
    if (!hasAtLeastOneRating) {
      newErrors.ratings = 'Please rate at least one aspect';
    }

    if (!formData.comments.trim() && !formData.bugsOrIssues.trim()) {
      newErrors.comments = 'Please provide some feedback or report an issue';
    }

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addFeedback(formData);
      setIsSubmitted(true);
      setFormData(DEFAULT_FORM_DATA);

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'flex flex-col items-center justify-center gap-4 py-8 text-center',
          className
        )}
      >
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle className="size-16 text-green-500" />
        </motion.div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Thank you!</h3>
          <p className="text-muted-foreground">
            Your feedback has been recorded. It helps make this portfolio better!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Category Selection */}
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium text-foreground">
          Feedback Category
        </label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          options={FEEDBACK_CATEGORIES}
          placeholder="Select a category..."
        />
      </div>

      {/* Rating Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Rate Your Experience</h3>
          {errors.ratings && (
            <span className="text-xs text-destructive">{errors.ratings}</span>
          )}
        </div>
        <div className={cn('space-y-4', compact && 'grid grid-cols-1 gap-4')}>
          {RATING_ASPECTS.map((aspect) => (
            <div key={aspect.key} className="space-y-1">
              <StarRating
                value={formData.ratings[aspect.key]}
                onChange={(value) => handleRatingChange(aspect.key, value)}
                label={aspect.label}
                size={compact ? 'sm' : 'md'}
              />
              <p className="text-xs text-muted-foreground pl-0.5">{aspect.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <label htmlFor="comments" className="text-sm font-medium text-foreground">
          Comments & Suggestions
        </label>
        <Textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          placeholder="Share your thoughts about the portfolio..."
          rows={compact ? 3 : 4}
          aria-invalid={!!errors.comments}
        />
        {errors.comments && (
          <span className="text-xs text-destructive">{errors.comments}</span>
        )}
      </div>

      {/* Bugs/Issues */}
      <div className="space-y-2">
        <label htmlFor="bugsOrIssues" className="text-sm font-medium text-foreground">
          Bugs or Issues (optional)
        </label>
        <Textarea
          id="bugsOrIssues"
          name="bugsOrIssues"
          value={formData.bugsOrIssues}
          onChange={handleInputChange}
          placeholder="Report any bugs or issues you encountered..."
          rows={compact ? 2 : 3}
        />
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">
          Contact Information{' '}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </h3>
        <div className={cn('grid gap-4', compact ? 'grid-cols-1' : 'sm:grid-cols-2')}>
          <div className="space-y-2">
            <label htmlFor="contactName" className="text-xs text-muted-foreground">
              Name
            </label>
            <Input
              id="contactName"
              name="contactName"
              type="text"
              value={formData.contactName}
              onChange={handleInputChange}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-xs text-muted-foreground">
              Email
            </label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="your@email.com"
              aria-invalid={!!errors.contactEmail}
            />
            {errors.contactEmail && (
              <span className="text-xs text-destructive">{errors.contactEmail}</span>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Submit Feedback
          </>
        )}
      </Button>
    </form>
  );
}
