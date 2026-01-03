/**
 * ViewTransitionsProvider - A lightweight wrapper for View Transitions API support.
 *
 * The View Transitions CSS styles are now in globals.css for better performance.
 * This component is kept for future enhancements and consistent API.
 */
export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
