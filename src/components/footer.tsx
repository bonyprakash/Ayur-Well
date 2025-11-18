'use client';

import { useState, useEffect } from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Logo } from './logo';
import Link from 'next/link';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="bg-secondary/50 text-foreground border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Logo className="h-8 w-8 mr-2" />
            <span className="font-bold font-headline text-2xl text-primary">AyurWell</span>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg italic text-muted-foreground">
              "Health is a state of complete harmony of the body, mind, and spirit."
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          {currentYear && <p>Copyright © {currentYear} AyurWell. All Rights Reserved.</p>}
        </div>
      </div>
    </footer>
  );
}
