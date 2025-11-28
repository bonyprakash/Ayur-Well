'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Leaf, AlertTriangle } from 'lucide-react';
import type { Remedy } from '@/app/herbal-remedies/page';

interface RemedyCardProps {
  remedy: Remedy;
}

export function RemedyCard({ remedy }: RemedyCardProps) {
  const [tried, setTried] = useState(false);
  const [helpful, setHelpful] = useState(false);

  const handleTriedChange = (checked: boolean) => {
    setTried(checked);
    if (!checked) {
      setHelpful(false);
    }
  };

  return (
    <Card
      key={remedy.name}
      className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group rounded-xl"
    >
      <div className="relative h-48 w-full">
        <Image
          src={remedy.image}
          alt={remedy.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={remedy.hint}
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
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
                <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Track Your Experience</h4>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id={`${remedy.name}-tried`} checked={tried} onCheckedChange={handleTriedChange} />
                            <Label htmlFor={`${remedy.name}-tried`}>I've Tried This</Label>
                        </div>
                        {tried && (
                             <div className="flex items-center space-x-2 animate-fade-in">
                                <Checkbox id={`${remedy.name}-helpful`} checked={helpful} onCheckedChange={(checked) => setHelpful(!!checked)} />
                                <Label htmlFor={`${remedy.name}-helpful`}>Found It Helpful</Label>
                            </div>
                        )}
                    </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

    