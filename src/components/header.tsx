'use client';

import {UserProfileSheet} from './user-profile-sheet';
import {Logo} from './logo';

type UserProfile = {
  height: number | null;
  weight: number | null;
};

interface HeaderProps {
  userProfile: UserProfile;
  onProfileSave: (profile: UserProfile) => void;
  showProfileSheet?: boolean;
}

export function Header({
  userProfile,
  onProfileSave,
  showProfileSheet = true,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Logo className="h-8 w-8 mr-2" />
          <span className="font-bold font-headline text-2xl">AyurWell</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {showProfileSheet && (
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
