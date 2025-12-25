'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Logo } from './logo';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/diet-planner', label: 'Diet Planner' },
  { href: '/herbal-remedies', label: 'Herbs' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header({children}: {children?: React.ReactNode}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm border-black/5">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Logo />
          <span className="hidden font-bold text-xl sm:inline-block" style={{color: '#245C47'}}>
            NaturaLife
          </span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center space-x-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
           {children}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                   <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo />
                      <span className="font-bold text-xl" style={{color: '#245C47'}}>NaturaLife</span>
                  </Link>
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'transition-colors hover:text-primary',
                         pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
