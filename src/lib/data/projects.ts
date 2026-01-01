export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail?: string;
  slug: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive admin dashboard for managing products, orders, and customer analytics with real-time data visualization.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    slug: 'ecommerce-dashboard',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with drag-and-drop functionality, team workspaces, and deadline tracking.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Framer Motion'],
    slug: 'task-management-app',
    featured: true,
  },
  {
    id: '3',
    title: 'Weather Forecast API',
    description: 'A RESTful API service providing accurate weather forecasts with location-based services and historical data analysis.',
    technologies: ['Node.js', 'Express', 'Redis', 'OpenWeather API'],
    slug: 'weather-forecast-api',
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
