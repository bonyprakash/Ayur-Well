'use client';

import { useEffect } from 'react';
import { Logo } from './logo';

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

export function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 2000); // Corresponds to the animation duration

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <html lang="en" suppressHydrationWarning>
       <head>
          <title>NaturaLife | Your Guide to Natural Wellness</title>
          <meta name="description" content="Symptom analysis, dosha identification, and natural remedy suggestions based on traditional Ayurvedic practices." />
          <meta name="keywords" content="ayurveda, naturopathy, wellness, dosha, vata, pitta, kapha, herbal remedies, yoga" />
      </head>
      <body>
        <div className="flex h-screen w-full items-center justify-center bg-background intro-screen">
          <div className="flex flex-col items-center gap-4 intro-content">
            <Logo />
            <span className="font-bold text-2xl" style={{ color: '#245C47' }}>
              NaturaLife
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
