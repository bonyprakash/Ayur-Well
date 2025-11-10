'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/components/header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Leaf, AlertTriangle, WandSparkles, Loader2, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  suggestRemedy,
  type SuggestRemedyOutput,
} from '@/ai/flows/suggest-remedy';
import { useToast } from '@/hooks/use-toast';

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

const remedyFormSchema = z.object({
  problem: z.string().min(10, { message: 'Please describe your problem in at least 10 characters.' }),
});

export default function HerbalRemediesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [remedySuggestion, setRemedySuggestion] = useState<SuggestRemedyOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof remedyFormSchema>>({
    resolver: zodResolver(remedyFormSchema),
  });

  async function onSubmit(values: z.infer<typeof remedyFormSchema>) {
    setIsLoading(true);
    setRemedySuggestion(null);
    try {
      const result = await suggestRemedy(values);
      if (!result) {
        throw new Error('Failed to get a suggestion.');
      }
      setRemedySuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a remedy suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }


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
              Discover the healing power of nature.
            </p>
          </div>

          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <WandSparkles className="text-primary" /> AI Remedy Finder
              </CardTitle>
              <CardDescription>
                Describe your ailment, and our AI will suggest a natural,
                naturopathic remedy for you.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem>
                        <Textarea
                          placeholder="e.g., 'I have a persistent dry cough and a sore throat...'"
                          className="min-h-[100px]"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Finding a Remedy...
                      </>
                    ) : (
                      'Get Suggestion'
                    )}
                  </Button>
                  
                  {remedySuggestion && (
                     <Card className="w-full bg-primary/10 animate-fade-in">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg text-primary-dark">Suggested Remedy</h4>
                                    <p className="text-muted-foreground">{remedySuggestion.remedy}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-destructive/80 flex-shrink-0 mt-1" />
                                 <div>
                                    <h4 className="font-bold text-lg text-destructive/90">Disclaimer</h4>
                                    <p className="text-muted-foreground">{remedySuggestion.disclaimer}</p>
                                </div>
                            </div>
                        </CardContent>
                     </Card>
                  )}

                </CardFooter>
              </form>
            </Form>
          </Card>

          <div className="text-center space-y-2 pt-8">
             <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Common Herbal Library
            </h2>
            <p className="text-muted-foreground">
              Learn about these powerful, everyday herbs.
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
