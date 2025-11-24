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
    }, 2500); // Corresponds to the animation duration

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
        <div className="intro-leaf-screen">
          <div className="leaves-container">
            {/* Generating 10 leaves for a fuller effect */}
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
          </div>
          <div className="intro-leaf-content">
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
