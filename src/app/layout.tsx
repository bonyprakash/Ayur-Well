import type {Metadata} from 'next';
import {Alegreya} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'NaturaLife',
  description:
    'Your personal naturopathic advisor for healthy living and balanced nutrition.',
};

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          alegreya.variable
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
