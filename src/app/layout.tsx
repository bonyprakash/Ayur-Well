'use client';

import { useState, useEffect } from 'react';
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import { Footer } from '@/components/footer';
import { IntroAnimation } from '@/components/intro-animation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Using sessionStorage to ensure animation only runs once per session
    if (sessionStorage.getItem('introShown')) {
      setShowIntro(false);
    } else {
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('introShown', 'true');
      }, 3000); // Animation duration + fade out

      return () => clearTimeout(timer);
    }
  }, []);

  if (isClient && showIntro) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <IntroAnimation />
            </body>
        </html>
    )
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <title>NaturaLife | Your Guide to Natural Wellness</title>
          <meta name="description" content="Symptom analysis, dosha identification, and natural remedy suggestions based on traditional Ayurvedic practices." />
          <meta name="keywords" content="ayurveda, naturopathy, wellness, dosha, vata, pitta, kapha, herbal remedies, yoga" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          inter.variable
        )}
      >
        <div className="flex-grow animate-fade-in">
            {children}
        </div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
