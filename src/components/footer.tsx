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
    <footer className="bg-card text-card-foreground border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <Logo />
            <span className="font-bold text-2xl ml-2">NaturaLife</span>
          </div>
          <div className="text-center text-muted-foreground">
            <p className="text-lg italic">
              "The greatest wealth is health."
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end space-x-4">
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
          {currentYear !== null && <p>NaturaLife © {currentYear}</p>}
        </div>
      </div>
    </footer>
  );
}
