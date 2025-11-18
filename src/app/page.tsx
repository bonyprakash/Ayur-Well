'use client';

import { Leaf, Zap, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';

const featureCards = [
  {
    icon: Leaf,
    title: 'Personalized Plans',
    description: 'Receive AI-powered diet and wellness plans tailored to your unique profile and goals.',
  },
  {
    icon: Zap,
    title: 'Instant Remedies',
    description: 'Describe your ailment and get instant suggestions for safe, natural, and effective remedies.',
  },
  {
    icon: HeartPulse,
    title: 'Holistic Guidance',
    description: 'Explore a rich library of herbal remedies, blog insights, and naturopathic knowledge.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center text-center bg-gradient-to-br from-[#E4FFE9] to-[#CFFFF3] overflow-hidden vignette">
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[800px] h-[800px] opacity-30">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4CAF68" d="M48.8,-68.1C63.2,-58.5,74.7,-43.7,77.7,-27.8C80.7,-11.9,75.2,5.2,69.1,21.6C63,38,56.3,53.7,44.7,64.3C33.1,74.9,16.5,80.4,-1.8,82.4C-20.1,84.4,-40.2,82.9,-54.6,72.9C-69,62.9,-77.7,44.4,-80.6,26C-83.5,7.6,-80.6,-10.7,-72.5,-25.1C-64.4,-39.5,-51.1,-50.1,-37.8,-59.5C-24.5,-68.9,-12.2,-77.2,1.8,-79.3C15.8,-81.4,31.7,-77.6,48.8,-68.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="container px-4 md:px-6 z-10 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Embrace Your Natural</span>
                  <span className="block" style={{color: '#245C47'}}>Path to Wellness</span>
                </h1>
                <p className="mt-6 max-w-lg text-lg text-gray-600">
                  Discover the ancient secrets of naturopathy to heal, balance, and rejuvenate your body and mind.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link href="/diet-planner">
                    <Button size="lg" className="gradient-button text-white shadow-lg text-base">
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link href="/herbal-remedies">
                    <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all text-base border-primary/20 text-primary hover:text-primary hover:bg-white/80">
                      Explore Remedies
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:flex items-center justify-center h-full">
                <div className="absolute w-[600px] h-[600px] opacity-20">
                   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#245C47" d="M57,-59.8C70.1,-46.9,74.3,-23.5,72.4,-2.4C70.5,18.6,62.5,37.3,49.8,50.8C37.1,64.3,20,72.6,0.8,72.1C-18.4,71.6,-36.8,62.3,-50.9,49.2C-65,36,-74.9,18,-75.6,-0.6C-76.3,-19.1,-67.9,-38.3,-54.1,-51.2C-40.3,-64.2,-20.1,-71,1.5,-72.2C23.2,-73.4,43.9,-72.7,57,-59.8Z" transform="translate(100 100)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-28 px-4 bg-background">
          <div className="container">
            <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-4xl font-bold" style={{color: '#245C47'}}>A Guided Path to Natural Healing</h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">Our platform provides personalized, AI-driven insights to help you achieve holistic well-being.</p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
              {featureCards.map((feature, index) => (
                <div key={feature.title} className="animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <Card className="text-center h-full glassmorphism-card shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl">
                    <CardHeader className="items-center">
                      <div className="p-4 rounded-full bg-white/50 self-center mb-4 border border-primary/10">
                        <feature.icon className="w-10 h-10" style={{color: '#245C47'}} />
                      </div>
                      <CardTitle className="text-2xl font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
