export type PostCategory = 'hooks' | 'helpers' | 'tips';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  slug: string;
  publishedAt: string;
  readingTime: number;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Editable content for any react project',
    excerpt: 'Learn how to implement inline editable content in your React applications. A flexible helper component that makes any text element editable with save and cancel functionality.',
    category: 'helpers',
    slug: 'editable-content-react',
    publishedAt: '2024-12-28',
    readingTime: 5,
    content: `
## Introduction

Making content editable inline is a common requirement for modern web applications. Whether you're building a CMS, a note-taking app, or just want to allow users to edit their profile information without navigating to a separate page, inline editing provides a smooth user experience.

## The Problem

Traditional forms require users to:
1. Click an "Edit" button
2. Navigate to a form page
3. Make changes
4. Submit and wait for redirect

This creates friction and breaks the user's flow.

## The Solution

We'll create a reusable \`EditableContent\` component that wraps any text element and makes it editable on double-click.

### Implementation

\`\`\`tsx
import React, { useState, useRef, useEffect } from 'react';

interface EditableContentProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3';
}

export function EditableContent({
  value,
  onSave,
  className = '',
  as: Component = 'span',
}: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={className}
      />
    );
  }

  return (
    <Component
      onDoubleClick={() => setIsEditing(true)}
      className={\`cursor-pointer hover:bg-gray-100 \${className}\`}
    >
      {value}
    </Component>
  );
}
\`\`\`

## Usage Example

\`\`\`tsx
function UserProfile() {
  const [name, setName] = useState('John Doe');

  const handleSave = async (newName: string) => {
    await api.updateUser({ name: newName });
    setName(newName);
  };

  return (
    <div>
      <EditableContent
        value={name}
        onSave={handleSave}
        as="h1"
        className="text-2xl font-bold"
      />
    </div>
  );
}
\`\`\`

## Key Features

- **Double-click to edit**: Prevents accidental edits while keeping the interaction discoverable
- **Keyboard support**: Enter to save, Escape to cancel
- **Auto-focus and select**: The input is focused and text selected when editing starts
- **Blur to save**: Clicking outside saves the changes automatically
- **Polymorphic component**: Can render as any text element

## Conclusion

This pattern can be extended with validation, loading states, and error handling for a production-ready solution. The key is keeping the API simple while providing a smooth editing experience.
`,
  },
  {
    id: '2',
    title: 'Prevent your React Context from re-rendering everything',
    excerpt: 'Optimize your React Context usage to avoid unnecessary re-renders. Learn techniques to split context, memoize values, and keep your app performant.',
    category: 'tips',
    slug: 'prevent-context-rerendering',
    publishedAt: '2024-12-22',
    readingTime: 7,
    content: `
## The Problem with React Context

React Context is a powerful tool for passing data through the component tree without prop drilling. However, it has a significant performance pitfall: **every component that consumes a context will re-render whenever the context value changes**.

\`\`\`tsx
// This will cause ALL consumers to re-render
// whenever ANY value changes
const AppContext = createContext({
  user: null,
  theme: 'light',
  notifications: [],
  settings: {},
});
\`\`\`

## Why This Happens

When you update context, React doesn't do a shallow comparison of the values. It simply triggers a re-render for all consuming components. This is by design, but it can lead to performance issues in large applications.

## Solution 1: Split Your Contexts

The most effective solution is to split your context into multiple smaller contexts:

\`\`\`tsx
// Instead of one large context...
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const NotificationContext = createContext([]);

// Components only re-render when their specific
// context changes
function UserProfile() {
  const user = useContext(UserContext);
  // Only re-renders when user changes
  return <div>{user.name}</div>;
}

function ThemeToggle() {
  const theme = useContext(ThemeContext);
  // Only re-renders when theme changes
  return <button>{theme}</button>;
}
\`\`\`

## Solution 2: Memoize Context Values

If you must use a single context, memoize the value object:

\`\`\`tsx
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // Memoize the context value
  const value = useMemo(
    () => ({ user, setUser, theme, setTheme }),
    [user, theme]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
\`\`\`

## Solution 3: Separate State and Dispatch

Split read and write operations into separate contexts:

\`\`\`tsx
const StateContext = createContext(null);
const DispatchContext = createContext(null);

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Components that only dispatch actions don't
// re-render when state changes
function AddButton() {
  const dispatch = useContext(DispatchContext);
  return <button onClick={() => dispatch({ type: 'ADD' })}>Add</button>;
}
\`\`\`

## Solution 4: Use Selectors with useSyncExternalStore

For fine-grained subscriptions, consider using \`useSyncExternalStore\`:

\`\`\`tsx
function useSelector(selector) {
  const store = useContext(StoreContext);

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}

// Only re-renders when user.name changes
function UserName() {
  const name = useSelector(state => state.user.name);
  return <span>{name}</span>;
}
\`\`\`

## Best Practices Summary

1. **Split contexts** by domain or update frequency
2. **Memoize values** passed to Provider
3. **Separate state from dispatch** for write-only components
4. Consider **external state management** for complex cases
5. **Profile before optimizing** - don't prematurely optimize

## Conclusion

React Context is best used for static or rarely-changing values like themes, user preferences, or authenticated user data. For frequently-changing state, consider using dedicated state management solutions or the patterns described above.
`,
  },
  {
    id: '3',
    title: 'On scroll animation',
    excerpt: 'Create smooth, performant scroll-triggered animations in React. A reusable hook that leverages Intersection Observer for elegant reveal effects.',
    category: 'hooks',
    slug: 'on-scroll-animation',
    publishedAt: '2024-12-15',
    readingTime: 4,
    content: `
## Introduction

Scroll-triggered animations add polish and engagement to your website. Instead of everything appearing at once, elements gracefully reveal themselves as the user scrolls.

## The Intersection Observer API

The Intersection Observer API provides a performant way to detect when elements enter the viewport. Unlike scroll event listeners, it doesn't block the main thread.

## The Hook Implementation

\`\`\`tsx
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
\`\`\`

## Usage with CSS Classes

\`\`\`tsx
function AnimatedSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={\`
        transition-all duration-700 ease-out
        \${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'}
      \`}
    >
      <h2>This section animates in!</h2>
    </section>
  );
}
\`\`\`

## Usage with Framer Motion

\`\`\`tsx
import { motion } from 'framer-motion';

function AnimatedCard() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h3>Animated Card</h3>
    </motion.div>
  );
}
\`\`\`

## Staggered Animations

For multiple elements, add a delay based on index:

\`\`\`tsx
function StaggeredList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <AnimatedItem key={item.id} delay={index * 0.1}>
          {item.content}
        </AnimatedItem>
      ))}
    </ul>
  );
}

function AnimatedItem({ children, delay }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <li
      ref={ref}
      style={{
        transitionDelay: \`\${delay}s\`,
      }}
      className={\`
        transition-all duration-500
        \${isVisible ? 'opacity-100' : 'opacity-0'}
      \`}
    >
      {children}
    </li>
  );
}
\`\`\`

## Performance Considerations

1. Use \`triggerOnce: true\` when animations shouldn't repeat
2. Keep animations subtle and purposeful
3. Respect \`prefers-reduced-motion\` for accessibility
4. Don't animate too many elements at once

## Conclusion

The Intersection Observer API combined with CSS transitions or Framer Motion creates smooth, performant scroll animations. The custom hook encapsulates the complexity and makes it easy to add animations anywhere in your app.
`,
  },
  {
    id: '4',
    title: 'Disable Body Scroll Hook',
    excerpt: 'A custom React hook to disable body scrolling when modals or overlays are open. Handles edge cases like iOS Safari and preserves scroll position.',
    category: 'hooks',
    slug: 'disable-body-scroll-hook',
    publishedAt: '2024-12-10',
    readingTime: 3,
    content: `
## The Problem

When you open a modal, dropdown, or overlay, users can often still scroll the background content. This creates a confusing experience and can cause layout issues.

## Simple Solution

\`\`\`tsx
import { useEffect } from 'react';

export function useDisableBodyScroll(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
}
\`\`\`

## The iOS Safari Problem

iOS Safari has a bug where \`overflow: hidden\` on body doesn't prevent scrolling. We need a more robust solution:

\`\`\`tsx
import { useEffect, useRef } from 'react';

export function useDisableBodyScroll(isOpen: boolean) {
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // Save current scroll position
    scrollPosition.current = window.scrollY;

    // Apply styles to prevent scrolling
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.cssText = \`
      position: fixed;
      top: -\${scrollPosition.current}px;
      left: 0;
      right: 0;
      overflow: hidden;
      padding-right: \${scrollbarWidth}px;
    \`;

    return () => {
      // Restore styles and scroll position
      document.body.style.cssText = '';
      window.scrollTo(0, scrollPosition.current);
    };
  }, [isOpen]);
}
\`\`\`

## Key Features

- **Preserves scroll position**: When the modal closes, you're back where you were
- **Prevents layout shift**: Accounts for scrollbar width to prevent content from jumping
- **Works on iOS Safari**: Uses \`position: fixed\` which works on all browsers
- **Cleanup on unmount**: Properly restores body styles

## Usage Example

\`\`\`tsx
function Modal({ isOpen, onClose, children }) {
  useDisableBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
\`\`\`

## Alternative: CSS-Only Approach

For simpler cases, you can use CSS:

\`\`\`css
body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
\`\`\`

But you'll still need JavaScript to manage the class and scroll position.

## Conclusion

Disabling body scroll seems simple but has many edge cases. This hook handles them all while keeping the API clean and easy to use.
`,
  },
  {
    id: '5',
    title: 'Conditional Rendering - Clean up your code trick',
    excerpt: 'Master conditional rendering patterns in React. From simple ternaries to render props, learn the best practices for showing and hiding UI elements and cleaning up messy conditionals.',
    category: 'tips',
    slug: 'conditional-rendering-clean-code',
    publishedAt: '2024-12-05',
    readingTime: 6,
    content: `
## The Problem with Messy Conditionals

We've all seen (or written) code like this:

\`\`\`tsx
function UserDashboard({ user, isLoading, error, data }) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : !user ? (
        <LoginPrompt />
      ) : !data ? (
        <EmptyState />
      ) : (
        <Dashboard user={user} data={data} />
      )}
    </div>
  );
}
\`\`\`

This nested ternary is hard to read and maintain. Let's fix it.

## Pattern 1: Early Returns

The cleanest approach is often early returns:

\`\`\`tsx
function UserDashboard({ user, isLoading, error, data }) {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <LoginPrompt />;
  if (!data) return <EmptyState />;

  return <Dashboard user={user} data={data} />;
}
\`\`\`

Much cleaner! Each condition is clear and the happy path is at the bottom.

## Pattern 2: Object Mapping

For multiple discrete states, use an object:

\`\`\`tsx
const STATUS_COMPONENTS = {
  idle: IdleState,
  loading: LoadingState,
  success: SuccessState,
  error: ErrorState,
} as const;

function StatusDisplay({ status, data }) {
  const Component = STATUS_COMPONENTS[status];
  return <Component data={data} />;
}
\`\`\`

## Pattern 3: Compound Components

For complex conditional UI, use compound components:

\`\`\`tsx
function Show({ when, fallback, children }) {
  return when ? children : fallback ?? null;
}

function Match({ value, children }) {
  const match = Children.toArray(children).find(
    (child) => child.props.when === value
  );
  return match ?? null;
}

function Case({ when, children }) {
  return children;
}

// Usage
<Match value={status}>
  <Case when="loading"><Spinner /></Case>
  <Case when="error"><ErrorMessage /></Case>
  <Case when="success"><Content /></Case>
</Match>
\`\`\`

## Pattern 4: Render Props for Complex Logic

\`\`\`tsx
function AsyncData({ fetch, children, loading, error: ErrorComponent }) {
  const { data, isLoading, error } = useQuery(fetch);

  if (isLoading) return loading ?? <DefaultSpinner />;
  if (error) return <ErrorComponent error={error} />;

  return children(data);
}

// Usage
<AsyncData
  fetch={fetchUsers}
  loading={<UsersSkeleton />}
  error={UsersError}
>
  {(users) => <UsersList users={users} />}
</AsyncData>
\`\`\`

## Pattern 5: Custom Hook for State Machines

\`\`\`tsx
function useAsyncState(initialState) {
  const [state, setState] = useState({
    status: 'idle',
    data: null,
    error: null,
  });

  return {
    ...state,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    setLoading: () => setState(s => ({ ...s, status: 'loading' })),
    setSuccess: (data) => setState({ status: 'success', data, error: null }),
    setError: (error) => setState({ status: 'error', data: null, error }),
  };
}
\`\`\`

## Best Practices

1. **Avoid nested ternaries** - They're hard to read
2. **Use early returns** - They flatten your code
3. **Extract complex conditions** - Give them meaningful names
4. **Consider state machines** - For complex state logic
5. **Don't over-engineer** - Simple \`&&\` is fine for simple cases

## When to Use What

| Pattern | Use When |
|---------|----------|
| \`&&\` operator | Simple show/hide |
| Early returns | Multiple exclusive conditions |
| Object mapping | Discrete states |
| Compound components | Reusable conditional logic |
| Render props | Async data patterns |

## Conclusion

Clean conditional rendering makes your components easier to understand, test, and maintain. Start with early returns for most cases, and reach for more advanced patterns when complexity grows.
`,
  },
  {
    id: '6',
    title: 'useDebounce: Optimize User Input Performance',
    excerpt: 'Implement a custom debounce hook to prevent excessive API calls and improve performance in search inputs and forms.',
    category: 'hooks',
    slug: 'use-debounce-hook',
    publishedAt: '2024-11-28',
    readingTime: 5,
    content: `
## What is Debouncing?

Debouncing delays the execution of a function until after a specified time has passed since the last call. It's essential for:

- Search inputs (API calls)
- Window resize handlers
- Scroll event handlers
- Form auto-save

## The Hook

\`\`\`tsx
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

## Basic Usage

\`\`\`tsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // This only runs 300ms after the user stops typing
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
\`\`\`

## Advanced: Debounced Callback

Sometimes you need to debounce a callback function:

\`\`\`tsx
import { useCallback, useRef, useEffect } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );
}
\`\`\`

## Usage with API Calls

\`\`\`tsx
function AutoSaveForm() {
  const [formData, setFormData] = useState(initialData);

  const saveToServer = useDebouncedCallback(async (data) => {
    await api.save(data);
    toast.success('Saved!');
  }, 1000);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    saveToServer(newData);
  };

  return (
    <form>
      <input
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
    </form>
  );
}
\`\`\`

## Debounce vs Throttle

| Debounce | Throttle |
|----------|----------|
| Waits for pause | Runs at intervals |
| Good for: search, resize | Good for: scroll, mouse move |
| Last call wins | Regular intervals |

## Implementation Tips

1. **Choose the right delay**: 300ms is good for search, 1000ms for auto-save
2. **Show loading state**: Users should know something is happening
3. **Cancel on unmount**: Always clean up timers
4. **Consider leading edge**: Sometimes you want immediate first call

## Conclusion

Debouncing is a crucial optimization technique. The \`useDebounce\` hook makes it easy to implement throughout your React application.
`,
  },
  {
    id: '7',
    title: 'Type-Safe API Client with Generics',
    excerpt: 'Build a reusable, type-safe HTTP client wrapper that provides excellent developer experience and catches errors at compile time.',
    category: 'helpers',
    slug: 'type-safe-api-client',
    publishedAt: '2024-11-20',
    readingTime: 8,
    content: `
## The Problem

Most API calls in React apps look like this:

\`\`\`tsx
const response = await fetch('/api/users');
const data = await response.json(); // data is 'any'
\`\`\`

No type safety, no error handling, lots of boilerplate.

## Building a Type-Safe Client

### Step 1: Define Base Types

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
\`\`\`

### Step 2: Create the Client

\`\`\`typescript
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method,
      headers: this.defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new ApiClientError(error);
    }

    const data = await response.json();
    return { data, status: response.status };
  }

  async get<T>(endpoint: string) {
    return this.request<T>('GET', endpoint);
  }

  async post<T, B = unknown>(endpoint: string, body: B) {
    return this.request<T>('POST', endpoint, body);
  }

  async put<T, B = unknown>(endpoint: string, body: B) {
    return this.request<T>('PUT', endpoint, body);
  }

  async delete<T>(endpoint: string) {
    return this.request<T>('DELETE', endpoint);
  }
}
\`\`\`

### Step 3: Custom Error Class

\`\`\`typescript
class ApiClientError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiClientError';
    this.status = error.status;
    this.errors = error.errors;
  }

  isNotFound() {
    return this.status === 404;
  }

  isUnauthorized() {
    return this.status === 401;
  }

  isValidationError() {
    return this.status === 422;
  }
}
\`\`\`

### Step 4: Define Your API Types

\`\`\`typescript
// types/api.ts
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}
\`\`\`

### Step 5: Create Type-Safe Endpoints

\`\`\`typescript
const api = new ApiClient('/api');

export const userApi = {
  getAll: () => api.get<User[]>('/users'),

  getById: (id: string) => api.get<User>(\`/users/\${id}\`),

  create: (data: CreateUserDto) =>
    api.post<User, CreateUserDto>('/users', data),

  update: (id: string, data: UpdateUserDto) =>
    api.put<User, UpdateUserDto>(\`/users/\${id}\`, data),

  delete: (id: string) => api.delete<void>(\`/users/\${id}\`),
};
\`\`\`

## Usage in Components

\`\`\`tsx
function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const { data } = await userApi.getAll();
        setUsers(data); // data is typed as User[]
      } catch (error) {
        if (error instanceof ApiClientError) {
          console.error(error.message);
        }
      }
    }
    loadUsers();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Benefits

1. **Full type safety**: Errors caught at compile time
2. **Autocomplete**: IDE knows the shape of your data
3. **Centralized error handling**: One place to handle all API errors
4. **Reusable**: Use the same client across your app
5. **Testable**: Easy to mock for testing

## Conclusion

A type-safe API client transforms your developer experience. You catch errors before runtime, get autocomplete for your data, and maintain consistency across your codebase.
`,
  },
  {
    id: '8',
    title: 'useLocalStorage: Persistent State Made Easy',
    excerpt: 'Create a hook that syncs React state with localStorage, handling serialization and cross-tab synchronization automatically.',
    category: 'hooks',
    slug: 'use-local-storage-hook',
    publishedAt: '2024-11-15',
    readingTime: 6,
    content: `
## Why This Hook?

\`useState\` loses its value on page refresh. For user preferences, form drafts, or any data that should persist, we need localStorage.

## Basic Implementation

\`\`\`tsx
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get initial value from localStorage or use default
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
\`\`\`

## Basic Usage

\`\`\`tsx
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <input
        type="range"
        min={12}
        max={24}
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
    </div>
  );
}
\`\`\`

## Advanced: Cross-Tab Synchronization

\`\`\`tsx
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  // Update localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    },
    [key]
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
\`\`\`

## Handling Complex Types

\`\`\`tsx
interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: number;
  notifications: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
};

function Settings() {
  const [prefs, setPrefs] = useLocalStorage('prefs', defaultPreferences);

  const updatePref = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <button onClick={() => updatePref('theme', 'dark')}>
        Dark Mode
      </button>
    </div>
  );
}
\`\`\`

## Common Gotchas

1. **SSR Compatibility**: Always check for \`window\` before accessing localStorage
2. **Storage Limits**: localStorage has a ~5MB limit per origin
3. **Serialization**: Only store JSON-serializable data
4. **Security**: Never store sensitive data (tokens, passwords)

## Conclusion

\`useLocalStorage\` bridges the gap between React's ephemeral state and browser persistence. With cross-tab sync, it provides a seamless experience across sessions and tabs.
`,
  },
  {
    id: '9',
    title: 'Deep Clone Utility for Complex Objects',
    excerpt: 'Build a robust deep clone function that handles edge cases like circular references, dates, and special object types.',
    category: 'helpers',
    slug: 'deep-clone-utility',
    publishedAt: '2024-11-08',
    readingTime: 7,
    content: `
## Why Not Just Use Spread?

The spread operator only creates shallow copies:

\`\`\`tsx
const original = {
  user: { name: 'John' },
  tags: ['react', 'typescript']
};

const copy = { ...original };
copy.user.name = 'Jane'; // Oops! This modifies original too
\`\`\`

## The structuredClone API

Modern browsers support \`structuredClone\`:

\`\`\`tsx
const copy = structuredClone(original);
\`\`\`

But it doesn't work with functions, DOM nodes, or some edge cases. Let's build something more robust.

## Complete Implementation

\`\`\`typescript
export function deepClone<T>(obj: T, seen = new WeakMap()): T {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    seen.set(obj, clonedMap);
    obj.forEach((value, key) => {
      clonedMap.set(deepClone(key, seen), deepClone(value, seen));
    });
    return clonedMap as T;
  }

  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    seen.set(obj, clonedSet);
    obj.forEach((value) => {
      clonedSet.add(deepClone(value, seen));
    });
    return clonedSet as T;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArr: unknown[] = [];
    seen.set(obj, clonedArr);
    for (let i = 0; i < obj.length; i++) {
      clonedArr[i] = deepClone(obj[i], seen);
    }
    return clonedArr as T;
  }

  // Handle plain objects
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  seen.set(obj, clonedObj);

  for (const key of Reflect.ownKeys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor) {
      if ('value' in descriptor) {
        descriptor.value = deepClone(descriptor.value, seen);
      }
      Object.defineProperty(clonedObj, key, descriptor);
    }
  }

  return clonedObj;
}
\`\`\`

## Usage Examples

### Basic Objects

\`\`\`tsx
const original = {
  name: 'John',
  address: {
    city: 'New York',
    coords: { lat: 40.7, lng: -74 }
  }
};

const copy = deepClone(original);
copy.address.city = 'Boston';
// original.address.city is still 'New York'
\`\`\`

### With Special Types

\`\`\`tsx
const complex = {
  date: new Date(),
  regex: /test/gi,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
};

const copy = deepClone(complex);
// All special types are properly cloned
\`\`\`

### Circular References

\`\`\`tsx
const obj: any = { name: 'circular' };
obj.self = obj; // Circular reference

const copy = deepClone(obj);
// Works! copy.self === copy (not original)
\`\`\`

## Performance Considerations

For large objects, consider:

\`\`\`tsx
// Fast path for simple objects
export function clone<T>(obj: T): T {
  // Try structuredClone first (fastest for supported types)
  try {
    return structuredClone(obj);
  } catch {
    // Fall back to our implementation
    return deepClone(obj);
  }
}
\`\`\`

## Comparison Table

| Method | Deep? | Circular? | Dates? | Functions? |
|--------|-------|-----------|--------|------------|
| Spread | No | No | Yes | Yes |
| JSON.parse/stringify | Yes | No | No | No |
| structuredClone | Yes | Yes | Yes | No |
| Our deepClone | Yes | Yes | Yes | No |

## Conclusion

Deep cloning is essential for immutable state updates, undo/redo systems, and state management. Our implementation handles all common edge cases while remaining performant for typical use cases.
`,
  },
];

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  // Get posts with the same category first, then fill with other posts
  const sameCategoryPosts = blogPosts.filter(
    (post) => post.slug !== currentSlug && post.category === currentPost.category
  );

  const otherPosts = blogPosts.filter(
    (post) => post.slug !== currentSlug && post.category !== currentPost.category
  );

  return [...sameCategoryPosts, ...otherPosts].slice(0, limit);
}

// For backwards compatibility with RecentlyPublished section
export const recentPosts: BlogPost[] = blogPosts.slice(0, 3);
