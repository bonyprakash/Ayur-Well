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


const remedies = [
  {
    name: 'Tulsi (Holy Basil)',
    benefit: 'Reduces stress and boosts immunity.',
    usage: 'Brew 5-10 fresh leaves into a tea and drink daily. Can also be consumed as a tincture.',
    precautions: 'May lower blood sugar; consult a doctor if you have diabetes. Avoid during pregnancy.',
  },
  {
    name: 'Turmeric',
    benefit: 'Powerful anti-inflammatory and antioxidant.',
    usage: 'Mix 1/2 teaspoon of turmeric powder in warm milk (Golden Milk) or add to curries and smoothies.',
    precautions: 'Can act as a blood thinner. High doses may cause stomach upset. Consult a doctor if you have gallbladder issues.',
  },
  {
    name: 'Ginger',
    benefit: 'Aids digestion, reduces nausea, and fights inflammation.',
    usage: 'Steep a few slices of fresh ginger in hot water for a soothing tea. Can be added to meals and juices.',
    precautions: 'May cause heartburn in high doses. Consult a doctor if you are on blood-thinning medication.',
  },
  {
    name: 'Aloe Vera',
    benefit: 'Heals skin and supports digestive health.',
    usage: 'Apply the gel from a fresh leaf directly to the skin for burns or irritation. Consume a small amount of juice for digestion.',
    precautions: 'Internal use can have a laxative effect. Ensure you are using a product intended for consumption. Not recommended during pregnancy.',
  },
  {
    name: 'Ashwagandha',
    benefit: 'Adaptogen that helps the body manage stress and anxiety.',
    usage: 'Take as a powder (1/2 teaspoon mixed with milk or honey) or as a capsule, typically before bed.',
    precautions: 'May cause drowsiness. Can interact with immunosuppressant and thyroid medications. Avoid with autoimmune conditions.',
  },
];


export default function HerbalRemediesPage() {
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8 animate-fade-in">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
              Herbal Remedies
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Discover the healing power of nature's most common herbs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remedies.map(remedy => (
              <Card
                key={remedy.name}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Leaf className="text-primary" /> {remedy.name}
                  </CardTitle>
                  <CardDescription className="pt-2 text-base">
                    {remedy.benefit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Learn More</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Usage</h4>
                            <p className="text-muted-foreground">
                              {remedy.usage}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2 text-destructive/80">
                              <AlertTriangle className="w-4 h-4" />
                              Precautions
                            </h4>
                            <p className="text-muted-foreground">
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
