'use client';

import { Leaf, PersonStanding, BookOpen } from 'lucide-react';
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
    icon: PersonStanding,
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
      <main className="flex flex-1 flex-col items-center">
        <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center text-center bg-beige-100 overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/30 opacity-70"></div>
          <div className="container px-4 md:px-6 z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-left">
                <div className="space-y-4">
                  <h1 className="text-4xl font-headline font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
                    Discover Balance with <span className="text-primary">AyurWell</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your personal guide to wellness through the ancient wisdom of Ayurveda. Understand your body, find your balance, and embrace natural healing.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/diet-planner">
                    <Button size="lg" className="shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                      Start Your Analysis
                    </Button>
                  </Link>
                  <Link href="/herbal-remedies">
                    <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all">
                      Explore Remedies
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative w-full h-64 sm:h-auto">
                <Image
                  src="https://picsum.photos/seed/ayurveda-hero/600/400"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  width={600}
                  height={400}
                  data-ai-hint="calm yoga meditation"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-28 px-4 bg-background animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">How AyurWell Helps You</h2>
              <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">A simple, three-step journey to rediscover your natural state of health and balance.</p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {featureCards.map((feature, index) => (
                <Card key={feature.title} className="shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary">
                  <CardHeader className="text-left">
                    <div className="p-3 rounded-full bg-primary/10 self-start mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
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
