'use client';

import * as React from 'react';
import { MessageSquarePlus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FeedbackForm } from './FeedbackForm';
import { cn } from '@/lib/utils';

interface FeedbackModalProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function FeedbackModal({ trigger, defaultOpen = false, className }: FeedbackModalProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  const handleSuccess = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <MessageSquarePlus className="size-4" />
      Give Feedback
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent
        className={cn('max-w-lg max-h-[90vh] overflow-y-auto', className)}
      >
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help improve this portfolio by sharing your thoughts. Your feedback is valuable!
          </DialogDescription>
        </DialogHeader>
        <FeedbackForm onSuccess={handleSuccess} compact />
      </DialogContent>
    </Dialog>
  );
}
