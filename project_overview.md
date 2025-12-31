# Razvan Soare - Portfolio Website

## Project Description
A modern, playful yet professional portfolio website for Razvan Soare, a Front End Engineer based in the United Kingdom. The site showcases projects, blog posts (snippets), and personal information with a fun, animated design that reflects creativity and technical expertise.

The key differentiator is the animated stick figure character that floats around and interacts with the user - this playful element should be preserved and enhanced in the new design.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist (or similar modern font)
- **Deployment**: Vercel-ready

## Design System

### Color Palette
- **Background**: Dark theme (`#0e141b` or similar deep navy)
- **Primary Text**: White/Off-white
- **Accent Pink**: `#e60067` (for highlights, hover states)
- **Accent Blue**: `#5773ff` (for links, secondary accents)
- **Muted**: Gray tones for secondary text

### Typography
- Clean, modern sans-serif for body text
- Monospace for code snippets
- Playful handwritten style for special callouts (optional)

### Design Principles
- Dark mode first (light mode optional for later)
- Generous whitespace
- Subtle micro-interactions on hover
- Smooth page transitions
- Mobile-first responsive design
- Maximum content width: 1200px

## Pages & Content

### 1. Home Page (`/`)
**Hero Section:**
- Greeting: "Hello 👋 I am Razvan"
- Subtitle: "React developer and technology enthusiast 🎉"
- Animated stick figure character with:
  - Floating/bobbing animation
  - Hand wave on hover
  - Thought bubbles with fun messages
  - Interactive elements (responds to mouse movement)

**Recently Published Section:**
- Grid of 3 latest blog posts/snippets
- Card design with:
  - Title
  - Brief description
  - "Read more" link with animated arrow
  - Hover state with color accent

**Featured Projects Section:**
- Showcase 2-3 top projects
- Visual cards with project thumbnails
- Quick description and tech tags

### 2. About Page (`/about`)
**Content:**
- Brief bio: "27-year-old Front End Engineer based in the United Kingdom"
- Personal statement: "A passionate developer who loves coding, open challenges and the web platform"
- Why I love React section
- Hobbies & Interests:
  - Reading tech articles
  - Longboarding (including electric boards)
  - Running
  - Video gaming (Assassin's Creed fan)

**Social Links:**
- LinkedIn
- GitHub
- Instagram

**Design:**
- Profile illustration or the animated character
- Clean, readable layout
- Subtle animations on scroll

### 3. Projects Page (`/projects`)
**Project List:**
1. **Aura Dental Tapnote**
   - Description: Treatment documentation system for dentists
   - Type: Web Application

2. **Bloomd**
   - Description: Digital community for intergenerational knowledge exchange
   - Type: Web Platform

3. **Bryant Dental**
   - Description: Technology solutions for dentists
   - Type: E-commerce/Web Application

4. **Honor Cycles**
   - Description: Bike service & repair booking for London
   - Type: Web Application

5. **Ladbrokes Coral**
   - Description: Staff software for betting shops across UK
   - Type: Enterprise Application

6. **Dizinga**
   - Description: E-commerce platform for worldwide customer access
   - Type: E-commerce Platform

**Design:**
- Grid layout with project cards
- Project thumbnails/screenshots
- Hover effects revealing more info
- Click to expand or navigate to detail page

### 4. Blog/Snippets Page (`/blog` or `/snippets`)
**Content Categories:**
- Hooks (React hooks tutorials)
- Helpers (Utility functions and patterns)
- Tips (Development tips)

**Existing Articles:**
- "Editable content for any react project"
- "Prevent your React Context from re-rendering everything"
- "On scroll animation"
- "Disable Body Scroll Hook"
- "Conditional Rendering" - Clean up your code trick

**Design:**
- List or grid of article cards
- Category/tag filters
- Search functionality (optional)
- Reading time indicator

### 5. Individual Blog Post Page (`/blog/[slug]`)
- Full article content with MDX support
- Syntax highlighting for code blocks
- Table of contents (optional)
- Share buttons
- Related posts

### 6. Individual Project Page (`/projects/[slug]`)
- Project hero with large image
- Full description
- Technologies used
- Links (live site, GitHub if applicable)
- Screenshots gallery
- Related projects

## Key Features

### Animated Character
- SVG-based stick figure
- Idle floating/bobbing animation
- Hand wave gesture on interaction
- Thought bubbles with rotating messages
- Follows cursor subtly (parallax effect)
- Should appear on home page prominently
- Smaller version in header or footer

### Page Transitions
- Smooth fade transitions between pages
- Content slides in on page load
- Staggered animation for lists (cards appear one by one)

### Loading States
- Skeleton loaders for content
- Animated logo or character during page loads
- Progress indicator for navigation

### Micro-interactions
- Button hover effects with scale/color change
- Link underline animations
- Card lift effect on hover
- Smooth scroll behavior
- Focus states for accessibility

### Navigation
- Sticky header with blur backdrop
- Mobile hamburger menu with smooth animation
- Active page indicator
- Theme toggle (dark/light) - stretch goal

## Data Structure

### Blog Posts (can be MDX files or CMS)
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: 'hooks' | 'helper' | 'tips';
  publishedAt: string;
  readingTime: number;
}
```

### Projects
```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
```

## Milestones

### Milestone 1: Foundation & Core Layout
Set up the project structure and implement the basic layout components.

Features:
- Initialize Next.js 14 project with App Router
- Configure Tailwind CSS and shadcn/ui
- Set up project folder structure
- Create root layout with dark theme
- Implement responsive navigation header
- Create footer component
- Set up Framer Motion for animations
- Configure fonts and global styles

### Milestone 2: Home Page & Animated Character
Build the hero section with the signature animated character.

Features:
- Create hero section layout
- Implement animated stick figure SVG component
- Add floating/bobbing animation
- Add hand wave interaction on hover
- Create thought bubble component with rotating messages
- Build "Recently Published" section with post cards
- Add featured projects preview section
- Implement smooth scroll and entrance animations

### Milestone 3: Content Pages
Implement About, Projects, and Blog pages.

Features:
- Create About page with bio content
- Add social links component
- Build Projects page with grid layout
- Create project card component with hover effects
- Implement Blog/Snippets listing page
- Add category filtering for blog posts
- Create individual project detail page template
- Create individual blog post page template with MDX support

### Milestone 4: Data Layer & Polish
Set up data fetching and add finishing touches.

Features:
- Set up TanStack Query for data fetching
- Create static data files for projects and blog posts
- Implement loading skeletons
- Add page transition animations
- Implement staggered list animations
- Add meta tags and SEO optimization
- Ensure full mobile responsiveness
- Add 404 page with character animation
- Performance optimization

## Development Guidelines

### Code Style
- Use TypeScript strictly
- Follow Next.js App Router conventions
- Use server components where possible
- Client components only when needed (interactivity)
- Organize by feature, not by type

### Component Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   └── blog/
├── components/
│   ├── ui/          # shadcn components
│   ├── layout/      # Header, Footer, etc.
│   ├── home/        # Home page components
│   ├── character/   # Animated character
│   └── shared/      # Reusable components
├── lib/
│   ├── data/        # Static data files
│   └── utils/       # Utility functions
└── styles/
    └── globals.css
```

### Animation Guidelines
- Keep animations subtle (200-400ms duration)
- Use easing functions for natural movement
- Respect reduced-motion preferences
- Don't animate layout-causing properties when possible

## Notes
- The animated character is the signature element - prioritize getting it right
- Start with placeholder content, can be refined later
- Focus on smooth, polished animations over feature quantity
- Mobile experience is equally important as desktop
- Keep the playful personality while maintaining professionalism
