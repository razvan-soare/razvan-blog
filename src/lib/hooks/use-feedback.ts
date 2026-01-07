'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { FeedbackEntry, FeedbackFormData } from '@/types/feedback';

const STORAGE_KEY = 'portfolio-feedback';

interface UseFeedbackReturn {
  feedback: FeedbackEntry[];
  addFeedback: (data: FeedbackFormData, page?: string) => FeedbackEntry;
  removeFeedback: (id: string) => void;
  clearAllFeedback: () => void;
  exportFeedback: () => string;
  getFeedbackCount: () => number;
}

function generateId(): string {
  return `feedback-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getFeedbackFromStorage(): FeedbackEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading feedback from localStorage:', error);
  }

  return [];
}

function saveFeedbackToStorage(feedback: FeedbackEntry[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch (error) {
    console.error('Error saving feedback to localStorage:', error);
  }
}

const subscribers = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  subscribers.add(callback);

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);

  return () => {
    subscribers.delete(callback);
    window.removeEventListener('storage', storageHandler);
  };
}

function notifySubscribers(): void {
  subscribers.forEach((callback) => callback());
}

export function useFeedback(): UseFeedbackReturn {
  const getSnapshot = useCallback(() => {
    const data = getFeedbackFromStorage();
    return JSON.stringify(data);
  }, []);

  const getServerSnapshot = useCallback(() => JSON.stringify([]), []);

  const feedbackString = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const feedback: FeedbackEntry[] = JSON.parse(feedbackString);

  const addFeedback = useCallback((data: FeedbackFormData, page?: string): FeedbackEntry => {
    const currentFeedback = getFeedbackFromStorage();

    const newEntry: FeedbackEntry = {
      id: generateId(),
      category: data.category,
      ratings: data.ratings,
      comments: data.comments,
      bugsOrIssues: data.bugsOrIssues,
      contactEmail: data.contactEmail || undefined,
      contactName: data.contactName || undefined,
      page: page || (typeof window !== 'undefined' ? window.location.pathname : undefined),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: Date.now(),
    };

    const updatedFeedback = [...currentFeedback, newEntry];
    saveFeedbackToStorage(updatedFeedback);
    notifySubscribers();

    return newEntry;
  }, []);

  const removeFeedback = useCallback((id: string) => {
    const currentFeedback = getFeedbackFromStorage();
    const updatedFeedback = currentFeedback.filter((entry) => entry.id !== id);
    saveFeedbackToStorage(updatedFeedback);
    notifySubscribers();
  }, []);

  const clearAllFeedback = useCallback(() => {
    saveFeedbackToStorage([]);
    notifySubscribers();
  }, []);

  const exportFeedback = useCallback((): string => {
    const currentFeedback = getFeedbackFromStorage();
    return JSON.stringify(currentFeedback, null, 2);
  }, []);

  const getFeedbackCount = useCallback((): number => {
    return getFeedbackFromStorage().length;
  }, []);

  return {
    feedback,
    addFeedback,
    removeFeedback,
    clearAllFeedback,
    exportFeedback,
    getFeedbackCount,
  };
}

export function downloadFeedbackAsJson(): void {
  const feedback = getFeedbackFromStorage();
  const jsonString = JSON.stringify(feedback, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio-feedback-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadFeedbackAsCsv(): void {
  const feedback = getFeedbackFromStorage();

  if (feedback.length === 0) {
    return;
  }

  const headers = [
    'ID',
    'Category',
    'Overall Design',
    'Character Interactions',
    'Navigation',
    'Content Presentation',
    'Mobile Responsiveness',
    'Comments',
    'Bugs/Issues',
    'Contact Name',
    'Contact Email',
    'Page',
    'User Agent',
    'Timestamp',
  ];

  const rows = feedback.map((entry) => [
    entry.id,
    entry.category,
    entry.ratings.overallDesign.toString(),
    entry.ratings.characterInteractions.toString(),
    entry.ratings.navigation.toString(),
    entry.ratings.contentPresentation.toString(),
    entry.ratings.mobileResponsiveness.toString(),
    `"${(entry.comments || '').replace(/"/g, '""')}"`,
    `"${(entry.bugsOrIssues || '').replace(/"/g, '""')}"`,
    entry.contactName || '',
    entry.contactEmail || '',
    entry.page || '',
    `"${(entry.userAgent || '').replace(/"/g, '""')}"`,
    new Date(entry.timestamp).toISOString(),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio-feedback-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
