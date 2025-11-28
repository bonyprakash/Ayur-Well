'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header';
import { translateContent } from '@/ai/flows/translate-content';
import { useToast } from '@/hooks/use-toast';
import { RemedyCard } from '@/components/remedy-card';

const originalRemedies = [
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

export type Remedy = typeof originalRemedies[0];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ja', label: 'Japanese' },
];

export default function HerbalRemediesPage() {
  const [remedies, setRemedies] = useState<Remedy[]>(originalRemedies);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === selectedLanguage) return;
    
    setSelectedLanguage(languageCode);

    if (languageCode === 'en') {
      setRemedies(originalRemedies);
      return;
    }

    setIsTranslating(true);
    try {
      const language = languages.find(l => l.value === languageCode)?.label || 'English';
      
      const translatedRemedies = await Promise.all(
        originalRemedies.map(async (remedy) => {
          const [translatedName, translatedBenefit, translatedUsage, translatedPrecautions] = await Promise.all([
            translateContent({ content: remedy.name, targetLanguage: language }),
            translateContent({ content: remedy.benefit, targetLanguage: language }),
            translateContent({ content: remedy.usage, targetLanguage: language }),
            translateContent({ content: remedy.precautions, targetLanguage: language }),
          ]);
          return {
            ...remedy,
            name: translatedName.translatedText,
            benefit: translatedBenefit.translatedText,
            usage: translatedUsage.translatedText,
            precautions: translatedPrecautions.translatedText,
          };
        })
      );
      setRemedies(translatedRemedies);
    } catch (error) {
      console.error("Translation failed:", error);
      toast({
        variant: 'destructive',
        title: 'Translation Failed',
        description: 'Could not translate the content. Please try again.',
      });
      setRemedies(originalRemedies);
      setSelectedLanguage('en');
    } finally {
      setIsTranslating(false);
    }
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8 animate-fade-in">
        <div className="w-full max-w-5xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Guide to Herbal Remedies
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
              Explore nature's pharmacy. This guide offers insights into common Ayurvedic herbs for wellness.
            </p>
            <div className="flex justify-center">
               <div className="w-full max-w-[200px]">
                 <Select onValueChange={handleLanguageChange} defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               </div>
            </div>
          </div>

          {isTranslating ? (
             <div className="flex flex-col items-center justify-center space-y-4 h-96">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Translating content...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remedies.map(remedy => (
                <RemedyCard key={remedy.name} remedy={remedy} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

    