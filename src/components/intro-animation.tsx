'use client';

export function IntroAnimation() {
  return (
    <div className="intro-leaf-screen">
      <div className="leaves-container">
        {/* These divs will be styled into leaves by the CSS */}
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">NaturaLife</h1>
      </div>
    </div>
  );
}
