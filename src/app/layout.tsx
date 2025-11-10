import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'NaturaLife | Your Guide to Natural Wellness',
  description: 'Create personalized naturopathic wellness plans, discover herbal remedies, and learn about healthy living. Your AI-powered companion for a balanced life.',
  keywords: 'naturopathy, wellness, diet planner, herbal remedies, healthy living, natural health',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          inter.variable
        )}
      >
        <div className="flex-grow">
            {children}
        </div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
