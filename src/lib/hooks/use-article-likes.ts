'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY_PREFIX = 'article-likes-';
const MAX_LIKES = 8;

interface UseArticleLikesReturn {
  likes: number;
  maxLikes: number;
  isComplete: boolean;
  isLoading: boolean;
  addLike: () => void;
}

function getStorageKey(articleSlug: string): string {
  return `${STORAGE_KEY_PREFIX}${articleSlug}`;
}

function getLikesFromStorage(articleSlug: string): number {
  if (typeof window === 'undefined') return 0;

  try {
    const stored = localStorage.getItem(getStorageKey(articleSlug));
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= MAX_LIKES) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading likes from localStorage:', error);
  }

  return 0;
}

function saveLikesToStorage(articleSlug: string, likes: number): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(getStorageKey(articleSlug), likes.toString());
    // Dispatch a storage event for same-tab updates
    window.dispatchEvent(new StorageEvent('storage', { key: getStorageKey(articleSlug) }));
  } catch (error) {
    console.error('Error saving likes to localStorage:', error);
  }
}

// Create subscribers map for each articleSlug
const subscribers = new Map<string, Set<() => void>>();

function subscribe(articleSlug: string, callback: () => void): () => void {
  if (!subscribers.has(articleSlug)) {
    subscribers.set(articleSlug, new Set());
  }
  const subs = subscribers.get(articleSlug)!;
  subs.add(callback);

  // Also listen to storage events
  const storageHandler = (e: StorageEvent) => {
    if (e.key === getStorageKey(articleSlug)) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);

  return () => {
    subs.delete(callback);
    window.removeEventListener('storage', storageHandler);
  };
}

function notifySubscribers(articleSlug: string): void {
  const subs = subscribers.get(articleSlug);
  if (subs) {
    subs.forEach((callback) => callback());
  }
}

export function useArticleLikes(articleSlug: string): UseArticleLikesReturn {
  const subscribeToSlug = useCallback(
    (callback: () => void) => subscribe(articleSlug, callback),
    [articleSlug]
  );

  const getSnapshot = useCallback(
    () => getLikesFromStorage(articleSlug),
    [articleSlug]
  );

  // Server returns 0 (loading state shows if hydration mismatch detected)
  const getServerSnapshot = useCallback(() => 0, []);

  const likes = useSyncExternalStore(subscribeToSlug, getSnapshot, getServerSnapshot);

  const addLike = useCallback(() => {
    if (likes >= MAX_LIKES) {
      return;
    }

    const newLikes = likes + 1;
    saveLikesToStorage(articleSlug, newLikes);
    notifySubscribers(articleSlug);
  }, [articleSlug, likes]);

  const isComplete = likes >= MAX_LIKES;

  return {
    likes,
    maxLikes: MAX_LIKES,
    isComplete,
    isLoading: false, // useSyncExternalStore handles this
    addLike,
  };
}
