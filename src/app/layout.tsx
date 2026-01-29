import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';

const WhatsAppButton = dynamic(
  () => import('../components/WhatsAppButton').then((m) => m.default),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Wandermate Packages - Curated Travel Experiences',
  description: 'Discover curated travel experiences for the modern explorer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
