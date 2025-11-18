import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'NaturaLife | Your Guide to Natural Wellness',
  description: 'Symptom analysis, dosha identification, and natural remedy suggestions based on traditional Ayurvedic practices.',
  keywords: 'ayurveda, naturopathy, wellness, dosha, vata, pitta, kapha, herbal remedies, yoga',
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
          'min-h-screen bg-background font-sans antialiased flex flex-col',
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
