import About from '@/components/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Razvan Soare',
  description:
    'About Razvan Soare. I build products end to end, mostly for the web, and explore what AI can do.',
};

export default function AboutPage() {
  return <About />;
}
