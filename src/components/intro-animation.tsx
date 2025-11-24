'use client';

import { Logo } from './logo';

export function IntroAnimation() {
  return (
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
  );
}
