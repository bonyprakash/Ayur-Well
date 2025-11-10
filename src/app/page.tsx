'use client';

import {Leaf, Zap, HeartPulse, BrainCircuit} from 'lucide-react';
import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Header} from '@/components/header';

const featureCards = [
  {
    icon: HeartPulse,
    title: 'Personalized Wellness',
    description: 'Get a wellness plan tailored to your age, lifestyle, and health goals.',
    href: '/diet-planner',
  },
  {
    icon: Leaf,
    title: 'Herbal Remedies',
    description: 'Discover natural remedies and herbs to support your health journey.',
    href: '/herbal-remedies',
  },
  {
    icon: BrainCircuit,
    title: 'Wellness Blog',
    description: 'Read articles and tips on naturopathy, nutrition, and mindful living.',
    href: '/blog',
  },
];


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
        <section className="w-full max-w-5xl text-center py-12 md:py-24 space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline">
            Welcome to NaturaLife
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl">
            Your AI-powered guide to natural wellness and balanced living.
          </p>
           <div className="pt-6">
             <Link href="/diet-planner">
                <Button size="lg">Get Your Free Wellness Plan</Button>
             </Link>
           </div>
        </section>

        <section className="w-full max-w-5xl py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featureCards.map((feature) => (
                    <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="items-center text-center">
                            <feature.icon className="w-12 h-12 text-primary mb-4" />
                            <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <CardDescription>{feature.description}</CardDescription>
                             <div className="mt-6">
                               <Link href={feature.href}>
                                <Button variant="outline">Learn More</Button>
                               </Link>
                             </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
}
