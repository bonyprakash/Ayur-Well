'use client';

import {Leaf, Zap, HeartPulse, BrainCircuit, Grape, PersonStanding, Bed, ArrowDown} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Header} from '@/components/header';

const awarenessCards = [
  {
    icon: Grape,
    title: 'Mindful Diet',
    description: 'Nourish your body with whole, natural foods that heal and energize.',
    bgColor: 'bg-green-100/50',
  },
  {
    icon: PersonStanding,
    title: 'Active Lifestyle',
    description: 'Incorporate movement and yoga to improve circulation and vitality.',
     bgColor: 'bg-blue-100/50',
  },
  {
    icon: Bed,
    title: 'Proper Rest',
    description: 'Ensure deep, restorative sleep to allow your body to repair and rejuvenate.',
     bgColor: 'bg-purple-100/50',
  },
];


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center">
         <section className="relative w-full h-[80vh] flex items-center justify-center text-center text-primary-dark bg-gradient-to-br from-green-100 to-green-50 animate-fade-in">
          <div className="space-y-6 max-w-4xl p-4 z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline leading-tight">
              Embrace Nature.
              <br />
              <span className="text-primary">Rediscover Wellness.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your AI-powered guide to natural wellness and balanced living.
            </p>
            <div className="pt-6">
              <Link href="/diet-planner">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-full px-8 py-6 text-lg">Get Your Personal Plan</Button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 animate-bounce">
              <ArrowDown className="w-8 h-8 text-primary/50" />
          </div>
        </section>

        <section id="principles" className="w-full max-w-6xl py-20 md:py-28 px-4 animate-fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Principles of Naturopathy</h2>
              <p className="text-muted-foreground mt-3 text-lg">Embrace a lifestyle that aligns with nature's wisdom.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {awarenessCards.map((feature) => (
                    <Card key={feature.title} className="shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 border-t-4 border-primary bg-card/80 backdrop-blur-sm">
                        <CardHeader className="items-center text-center">
                            <div className={`p-4 rounded-full ${feature.bgColor}`}>
                                <feature.icon className="w-12 h-12 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-2xl pt-4">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <CardDescription className="text-base">{feature.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
