'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Leaf, AlertTriangle } from 'lucide-react';
import { Header } from '@/components/header';
import Image from 'next/image';

const remedies = [
  {
    name: 'Tulsi (Holy Basil)',
    benefit: 'Reduces stress and boosts immunity.',
    usage: 'Brew 5-10 fresh leaves into a tea and drink daily. Can also be consumed as a tincture.',
    precautions: 'May lower blood sugar; consult a doctor if you have diabetes. Avoid during pregnancy.',
    image: 'https://picsum.photos/seed/tulsi/400/300',
    hint: 'basil leaves',
  },
  {
    name: 'Turmeric',
    benefit: 'Powerful anti-inflammatory and antioxidant.',
    usage: 'Mix 1/2 teaspoon of turmeric powder in warm milk (Golden Milk) or add to curries and smoothies.',
    precautions: 'Can act as a blood thinner. High doses may cause stomach upset. Consult a doctor if you have gallbladder issues.',
    image: 'https://picsum.photos/seed/turmeric/400/300',
    hint: 'turmeric powder'
  },
  {
    name: 'Ginger',
    benefit: 'Aids digestion, reduces nausea, and fights inflammation.',
    usage: 'Steep a few slices of fresh ginger in hot water for a soothing tea. Can be added to meals and juices.',
    precautions: 'May cause heartburn in high doses. Consult a doctor if you are on blood-thinning medication.',
    image: 'https://picsum.photos/seed/ginger/400/300',
    hint: 'ginger root'
  },
  {
    name: 'Aloe Vera',
    benefit: 'Heals skin and supports digestive health.',
    usage: 'Apply the gel from a fresh leaf directly to the skin for burns or irritation. Consume a small amount of juice for digestion.',
    precautions: 'Internal use can have a laxative effect. Ensure you are using a product intended for consumption. Not recommended during pregnancy.',
    image: 'https://picsum.photos/seed/aloe/400/300',
    hint: 'aloe vera'
  },
  {
    name: 'Ashwagandha',
    benefit: 'Adaptogen that helps the body manage stress and anxiety.',
    usage: 'Take as a powder (1/2 teaspoon mixed with milk or honey) or as a capsule, typically before bed.',
    precautions: 'May cause drowsiness. Can interact with immunosuppressant and thyroid medications. Avoid with autoimmune conditions.',
    image: 'https://picsum.photos/seed/ashwagandha/400/300',
    hint: 'herb powder'
  },
  {
    name: 'Brahmi',
    benefit: 'Enhances memory and cognitive function.',
    usage: 'Consume as a powder mixed with honey or ghee, or take as a supplement.',
    precautions: 'Can cause stomach upset in some individuals. Best to start with a small dose.',
    image: 'https://picsum.photos/seed/brahmi/400/300',
    hint: 'green leaves'
  },
];


export default function HerbalRemediesPage() {
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8 animate-fade-in-up">
        <div className="w-full max-w-5xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
              Guide to Herbal Remedies
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
              Explore nature's pharmacy. This guide offers insights into common Ayurvedic herbs for wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remedies.map(remedy => (
              <Card
                key={remedy.name}
                className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-48 w-full">
                    <Image src={remedy.image} alt={remedy.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={remedy.hint} />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                    <Leaf className="text-primary" /> {remedy.name}
                  </CardTitle>
                  <CardDescription className="pt-1 text-base">
                    {remedy.benefit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">How to Use</h4>
                            <p className="text-muted-foreground text-sm">
                              {remedy.usage}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2 text-destructive/90">
                              <AlertTriangle className="w-4 h-4" />
                              Precautions
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {remedy.precautions}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
