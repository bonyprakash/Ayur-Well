'use client';

import Link from 'next/link';
import { User } from 'lucide-react';

import { UserProfileSheet } from './user-profile-sheet';
import { Logo } from './logo';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type UserProfile = {
  height: number | null;
  weight: number | null;
};

interface HeaderProps {
  userProfile?: UserProfile;
  onProfileSave?: (profile: UserProfile) => void;
  showProfileSheet?: boolean;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/diet-planner', label: 'Diet Planner' },
  { href: '/herbal-remedies', label: 'Herbs' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header({
  userProfile,
  onProfileSave,
  showProfileSheet = true,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Logo className="h-8 w-8 mr-2" />
          <Link href="/" className="font-bold font-headline text-2xl">
            NaturaLife
          </Link>
        </div>
        <nav className="flex-1">
          <ul className="flex items-center justify-center space-x-4 lg:space-x-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end space-x-2">
          {showProfileSheet && userProfile && onProfileSave && (
            <UserProfileSheet
              userProfile={userProfile}
              onSave={onProfileSave}
            />
          )}
        </div>
      </div>
    </header>
  );
}
