'use client';

import { Leaf } from 'lucide-react';

export function IntroAnimation() {
  return (
    <div className="intro-wave-screen">
      <div className="intro-wave-content">
        <svg
          className="intro-wave-svg"
          viewBox="0 0 400 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="intro-wave-path-left"
            d="M 0,50 C 100,20 150,80 200,50"
            stroke="hsl(var(--primary))"
            fill="transparent"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="intro-wave-path-right"
            d="M 400,50 C 300,80 250,20 200,50"
            stroke="hsl(var(--primary))"
            fill="transparent"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="intro-wave-title">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-bold text-2xl text-primary">NaturaLife</span>
        </div>
      </div>
    </div>
  );
}
