export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail?: string;
  slug: string;
  featured: boolean;
  category?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Aura Dental Tapnote',
    description: 'A comprehensive dental practice management application featuring patient records, appointment scheduling, and digital note-taking with an intuitive tap-based interface for clinical workflows.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    slug: 'aura-dental-tapnote',
    featured: true,
    category: 'Healthcare',
  },
  {
    id: '2',
    title: 'Bloomd',
    description: 'A modern plant care and gardening companion app that helps users track their plants, set watering reminders, and discover care tips with a beautiful, nature-inspired interface.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    slug: 'bloomd',
    featured: true,
    category: 'Lifestyle',
  },
  {
    id: '3',
    title: 'Bryant Dental',
    description: 'A premium e-commerce platform for dental equipment and loupes, featuring advanced product visualization, custom fitting tools, and seamless shopping experience for dental professionals.',
    technologies: ['React', 'GraphQL', 'Shopify', 'Three.js'],
    slug: 'bryant-dental',
    featured: true,
    category: 'E-commerce',
  },
  {
    id: '4',
    title: 'Honor Cycles',
    description: 'A custom bicycle shop website showcasing handcrafted bikes with an immersive gallery experience, online configuration tool, and integrated booking system for consultations.',
    technologies: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Stripe'],
    slug: 'honor-cycles',
    featured: false,
    category: 'E-commerce',
  },
  {
    id: '5',
    title: 'Ladbrokes Coral',
    description: 'A large-scale sports betting platform redesign focusing on real-time odds updates, live betting features, and an enhanced mobile-first user experience for millions of users.',
    technologies: ['React', 'Redux', 'WebSocket', 'AWS'],
    slug: 'ladbrokes-coral',
    featured: false,
    category: 'Sports & Gaming',
  },
  {
    id: '6',
    title: 'Dizinga',
    description: 'An innovative social commerce platform connecting local sellers with customers, featuring real-time chat, location-based discovery, and secure payment integration.',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    slug: 'dizinga',
    featured: false,
    category: 'Social Commerce',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
