import About from '@/components/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Razvan Soare',
  description: 'About Razvan Soare - React developer and technology enthusiast',
};

export default function AboutPage() {
  return <About />;
}
