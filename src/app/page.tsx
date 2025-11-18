'use client';

import { Leaf, User, BookOpen } from 'lucide-react';
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
import Image from 'next/image';

const featureCards = [
  {
    icon: Leaf,
    title: 'Symptom Analysis',
    description: 'Answer a few questions to identify potential Ayurvedic imbalances (doshas).',
  },
  {
    icon: User,
    title: 'Personalized Remedies',
    description: 'Receive AI-powered suggestions for diet, yoga, and herbal treatments.',
  },
  {
    icon: BookOpen,
    title: 'Track Your Progress',
    description: 'Monitor your journey towards wellness by tracking the remedies you use.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center text-center bg-gradient-to-br from-green-100 to-green-50 overflow-hidden animate-fade-in-up">
          <div className="container px-4 md:px-6 z-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Embrace Your Natural Path</span>
              <span className="block text-primary">to Wellness</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-600 sm:max-w-2xl">
              Discover the ancient secrets of naturopathy to heal, balance, and rejuvenate your body and mind.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/diet-planner">
                <Button size="lg" className="gradient-button text-white shadow-lg transition-transform duration-300 hover:scale-105">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/herbal-remedies">
                <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all">
                  Explore Remedies
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-28 px-4 bg-background animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">How NaturaLife Helps You</h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">A simple, three-step journey to rediscover your natural state of health and balance.</p>
            </div>
            <div className="mx-auto grid items-start gap-10 sm:max-w-4xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
              {featureCards.map((feature, index) => (
                <Card key={feature.title} className="text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary rounded-2xl">
                  <CardHeader className="items-center">
                    <div className="p-4 rounded-full bg-primary/10 self-center mb-4">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
