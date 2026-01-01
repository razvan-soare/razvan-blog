export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  thumbnail?: string;
  slug: string;
  featured: boolean;
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Aura Dental Tapnote',
    description: 'A comprehensive dental practice management application featuring patient records, appointment scheduling, and digital note-taking with an intuitive tap-based interface for clinical workflows.',
    fullDescription: `Aura Dental Tapnote revolutionizes how dental practices manage their day-to-day operations. Built with a focus on clinical efficiency, the application streamlines patient record management, appointment scheduling, and digital note-taking through an innovative tap-based interface.

The system features a robust patient management module that allows practitioners to quickly access medical histories, treatment plans, and billing information. The tap-based note-taking interface was designed specifically for dental professionals, enabling them to document procedures without interrupting their workflow.

Key achievements include reducing average documentation time by 40%, implementing HIPAA-compliant data storage, and integrating with major dental imaging systems. The application serves over 50 dental practices and has processed more than 100,000 patient records.`,
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    slug: 'aura-dental-tapnote',
    featured: true,
    category: 'Healthcare',
    liveUrl: 'https://auradental.io',
    githubUrl: 'https://github.com/example/aura-dental',
    gallery: ['/images/projects/aura-dental-1.jpg', '/images/projects/aura-dental-2.jpg', '/images/projects/aura-dental-3.jpg'],
  },
  {
    id: '2',
    title: 'Bloomd',
    description: 'A modern plant care and gardening companion app that helps users track their plants, set watering reminders, and discover care tips with a beautiful, nature-inspired interface.',
    fullDescription: `Bloomd is a delightful plant care companion designed for both novice gardeners and experienced plant enthusiasts. The app combines beautiful design with practical functionality to help users keep their plants thriving.

Users can add plants to their collection by scanning or searching, and the app automatically provides care instructions tailored to their local climate and indoor conditions. Smart watering reminders adapt based on seasonal changes and plant-specific needs.

The community feature allows users to share photos of their plants, get advice from fellow gardeners, and participate in growing challenges. With over 10,000 plants in the database and integration with local nurseries, Bloomd has become an essential tool for plant lovers.`,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    slug: 'bloomd',
    featured: true,
    category: 'Lifestyle',
    liveUrl: 'https://bloomd.app',
    gallery: ['/images/projects/bloomd-1.jpg', '/images/projects/bloomd-2.jpg'],
  },
  {
    id: '3',
    title: 'Bryant Dental',
    description: 'A premium e-commerce platform for dental equipment and loupes, featuring advanced product visualization, custom fitting tools, and seamless shopping experience for dental professionals.',
    fullDescription: `Bryant Dental is a premium e-commerce experience built for dental professionals seeking high-quality loupes and equipment. The platform combines sophisticated 3D product visualization with an intuitive shopping experience.

The standout feature is the custom fitting tool that uses facial measurements and preferences to recommend the perfect loupe configuration. Users can visualize different frame styles, magnification levels, and light attachments in real-time using Three.js-powered 3D models.

The platform integrates seamlessly with Shopify for inventory management and order fulfillment, while maintaining a completely custom frontend experience. The implementation resulted in a 60% increase in conversion rate and significantly reduced return rates due to better product visualization.`,
    technologies: ['React', 'GraphQL', 'Shopify', 'Three.js'],
    slug: 'bryant-dental',
    featured: true,
    category: 'E-commerce',
    liveUrl: 'https://bryantdental.com',
    gallery: ['/images/projects/bryant-dental-1.jpg', '/images/projects/bryant-dental-2.jpg', '/images/projects/bryant-dental-3.jpg'],
  },
  {
    id: '4',
    title: 'Honor Cycles',
    description: 'A custom bicycle shop website showcasing handcrafted bikes with an immersive gallery experience, online configuration tool, and integrated booking system for consultations.',
    fullDescription: `Honor Cycles is a bespoke website for a premium custom bicycle manufacturer. The site captures the craftsmanship and attention to detail that goes into each handmade bike through immersive visual storytelling.

The bike configurator allows customers to explore different frame geometries, component selections, and finish options. Each configuration updates in real-time with pricing and lead time estimates. The gallery showcases completed builds with high-resolution photography and the stories behind each custom creation.

An integrated booking system allows customers to schedule consultations and fittings at the workshop. The site is managed through Sanity CMS, giving the client full control over content updates while maintaining the sophisticated design.`,
    technologies: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Stripe'],
    slug: 'honor-cycles',
    featured: false,
    category: 'E-commerce',
    liveUrl: 'https://honorcycles.com',
    githubUrl: 'https://github.com/example/honor-cycles',
    gallery: ['/images/projects/honor-cycles-1.jpg', '/images/projects/honor-cycles-2.jpg'],
  },
  {
    id: '5',
    title: 'Ladbrokes Coral',
    description: 'A large-scale sports betting platform redesign focusing on real-time odds updates, live betting features, and an enhanced mobile-first user experience for millions of users.',
    fullDescription: `Ladbrokes Coral is one of the UK's largest sports betting platforms, serving millions of users daily. This project involved a complete redesign of the user experience with a focus on mobile-first design and real-time performance.

The technical challenge was handling millions of concurrent WebSocket connections for live odds updates while maintaining sub-100ms latency. The architecture leverages AWS infrastructure with a globally distributed CDN and edge computing for optimal performance.

The redesign introduced a new betting slip experience, live streaming integration, and personalized recommendations based on betting history. Post-launch metrics showed a 35% increase in mobile engagement and significant improvements in bet placement completion rates.`,
    technologies: ['React', 'Redux', 'WebSocket', 'AWS'],
    slug: 'ladbrokes-coral',
    featured: false,
    category: 'Sports & Gaming',
    liveUrl: 'https://ladbrokes.com',
    gallery: ['/images/projects/ladbrokes-1.jpg', '/images/projects/ladbrokes-2.jpg', '/images/projects/ladbrokes-3.jpg'],
  },
  {
    id: '6',
    title: 'Dizinga',
    description: 'An innovative social commerce platform connecting local sellers with customers, featuring real-time chat, location-based discovery, and secure payment integration.',
    fullDescription: `Dizinga is a social commerce platform that empowers local sellers to reach customers in their community. Built as a React Native app, it provides a seamless experience for both buyers and sellers on iOS and Android.

The platform features real-time chat powered by Firebase, enabling direct communication between buyers and sellers. Location-based discovery helps users find products and services nearby, while the secure payment integration handles transactions with escrow protection.

Sellers can easily list products with photos, manage inventory, and track orders. The social features allow users to follow their favorite sellers, share discoveries, and leave reviews. The platform has facilitated over $2M in transactions across 5,000+ active sellers.`,
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    slug: 'dizinga',
    featured: false,
    category: 'Social Commerce',
    githubUrl: 'https://github.com/example/dizinga',
    gallery: ['/images/projects/dizinga-1.jpg', '/images/projects/dizinga-2.jpg'],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  const currentProject = getProjectBySlug(currentSlug);
  if (!currentProject) return [];

  // Prioritize projects in the same category, then other projects
  const sameCategory = projects.filter(
    (p) => p.slug !== currentSlug && p.category === currentProject.category
  );
  const otherProjects = projects.filter(
    (p) => p.slug !== currentSlug && p.category !== currentProject.category
  );

  return [...sameCategory, ...otherProjects].slice(0, limit);
}
