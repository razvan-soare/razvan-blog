# Credits & Attribution

This document acknowledges the third-party libraries, frameworks, and assets used in this portfolio project.

## Open Source Dependencies

### Core Framework

| Package | License | Description |
|---------|---------|-------------|
| [Next.js](https://nextjs.org/) | MIT | React framework for production |
| [React](https://react.dev/) | MIT | JavaScript library for building user interfaces |
| [React DOM](https://react.dev/) | MIT | React package for working with the DOM |

### Styling & UI

| Package | License | Description |
|---------|---------|-------------|
| [Tailwind CSS](https://tailwindcss.com/) | MIT | Utility-first CSS framework |
| [Radix UI](https://www.radix-ui.com/) | MIT | Unstyled, accessible UI components |
| [shadcn/ui](https://ui.shadcn.com/) | MIT | Re-usable components built with Radix and Tailwind |
| [class-variance-authority](https://cva.style/) | Apache-2.0 | CSS-in-TS library for component variants |
| [clsx](https://github.com/lukeed/clsx) | MIT | Utility for constructing className strings |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | MIT | Utility for merging Tailwind CSS classes |
| [tw-animate-css](https://github.com/magicuidesign/tw-animate-css) | MIT | Tailwind CSS animation utilities |

### Animation

| Package | License | Description |
|---------|---------|-------------|
| [Framer Motion](https://www.framer.com/motion/) | MIT | Production-ready motion library for React |

### Icons

| Package | License | Description |
|---------|---------|-------------|
| [Lucide React](https://lucide.dev/) | ISC | Beautiful & consistent icon toolkit |

### Typography

| Package | License | Description |
|---------|---------|-------------|
| [Geist](https://vercel.com/font) | SIL Open Font License 1.1 | Font family by Vercel |

### Content & MDX

| Package | License | Description |
|---------|---------|-------------|
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | MPL-2.0 | Load MDX content from anywhere |
| [Shiki](https://shiki.matsu.io/) | MIT | Beautiful syntax highlighting |

### Data Fetching

| Package | License | Description |
|---------|---------|-------------|
| [TanStack Query](https://tanstack.com/query) | MIT | Powerful asynchronous state management |

### Development Tools

| Package | License | Description |
|---------|---------|-------------|
| [TypeScript](https://www.typescriptlang.org/) | Apache-2.0 | Typed superset of JavaScript |
| [ESLint](https://eslint.org/) | MIT | JavaScript/TypeScript linter |
| [PostCSS](https://postcss.org/) | MIT | CSS transformation tool |

## Original Artwork

The following SVG artwork and animated components were created specifically for this portfolio project and are original works:

### Animated Characters

- **StickFigure** (`src/components/character/StickFigure.tsx`)
  - Animated stick figure character on a floating island
  - Features eye-tracking cursor interaction
  - Includes waving animation on hover/click
  - Floating island with grass, flowers, and rock layers

- **ConfusedStickFigure** (`src/components/character/ConfusedStickFigure.tsx`)
  - Confused variant used for 404 error pages
  - Features searching animation and tilted head
  - Includes thought bubble with rotating messages
  - Cracked floating island with "404" signpost

- **ThoughtBubble** (`src/components/character/ThoughtBubble.tsx`)
  - Animated thought bubble with rotating messages
  - Used as companion to the StickFigure character

### Interactive Elements

- **PuzzleHeart** (`src/components/like-button/PuzzleHeart.tsx`)
  - Heart-shaped puzzle piece like button
  - 8 interlocking pieces with tab/hole connectors
  - Progressive fill animation based on like count
  - Pulse animation when complete

All original artwork is covered under the MIT license as part of this project.

## License Summary

This project uses only open-source dependencies with permissive licenses (MIT, Apache-2.0, ISC, MPL-2.0, SIL OFL). All dependencies allow for commercial and non-commercial use with appropriate attribution.

For the full license of each dependency, please refer to their respective repositories linked above.
