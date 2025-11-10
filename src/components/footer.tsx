'use client';

import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Logo } from './logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Logo className="h-8 w-8 mr-2" />
            <span className="font-bold font-headline text-2xl">NaturaLife</span>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg italic text-muted-foreground">
              "The greatest medicine of all is to teach people how not to need it."
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
          <p>NaturaLife © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
