'use client';

import { Leaf } from 'lucide-react';

export function IntroAnimation() {
  return (
    <div className="intro-leaf-screen">
        <div className="leaves-container">
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
        </div>
        <div className="intro-leaf-title">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-bold text-2xl text-primary">NaturaLife</span>
        </div>
    </div>
  );
}
