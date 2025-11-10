'use client';

import {Leaf, Zap, HeartPulse, BrainCircuit, Grape, PersonStanding, Bed} from 'lucide-react';
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
        <section className="relative w-full h-[50vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://picsum.photos/seed/herbs/1800/1000"
            alt="Fresh herbs and nature background"
            fill
            className="object-cover -z-10 brightness-50"
            data-ai-hint="herbs nature"
          />
          <div className="space-y-4 max-w-4xl p-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline">
              Live Healthy Through Nature
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200">
              Your AI-powered guide to natural wellness and balanced living.
            </p>
            <div className="pt-6">
              <Link href="/diet-planner">
                  <Button size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Principles of Naturopathy</h2>
              <p className="text-muted-foreground mt-2">Embrace a lifestyle that aligns with nature's wisdom.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {awarenessCards.map((feature) => (
                    <Card key={feature.title} className="shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-primary">
                        <CardHeader className="items-center text-center">
                            <div className={`p-4 rounded-full ${feature.bgColor}`}>
                                <feature.icon className="w-10 h-10 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-2xl pt-4">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <CardDescription>{feature.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
