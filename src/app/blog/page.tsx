'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { translateContent } from '@/ai/flows/translate-content';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const originalBlogPosts = [
  {
    id: 'fasting-power',
    title: 'The Power of Fasting in Naturopathy',
    description: 'Explore how intermittent fasting can reset your body, improve metabolic health, and boost cellular repair.',
    image: placeholderImages.find(p => p.id === 'fasting-benefits'),
    content: `
      <p>Fasting is not just about skipping meals; it\'s a profound practice that allows the body\'s digestive system to rest and initiate deep cellular cleansing. In naturopathy, it is considered one of the most effective ways to detoxify the body and reset metabolic functions.</p>
      <br/>
      <h3 class="font-bold text-lg mb-2">Key Benefits:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Cellular Repair (Autophagy):</strong> Fasting triggers a process called autophagy, where your body removes old, damaged cells and recycles them for energy, making way for new, healthier cells.</li>
        <li><strong>Improved Insulin Sensitivity:</strong> By giving your body a break from constant glucose intake, fasting can lower insulin resistance, which is crucial for preventing type 2 diabetes and managing weight.</li>
        <li><strong>Enhanced Brain Function:</strong> Studies suggest fasting may increase the production of BDNF, a brain hormone that supports the growth of new neurons and may protect against neurodegenerative diseases.</li>
      </ul>
      <br/>
      <p>Getting started is simple. You can try the 16/8 method (fasting for 16 hours and eating within an 8-hour window) or a 24-hour fast once a week. Always listen to your body and consult a professional before starting a new fasting regimen.</p>
    `,
  },
  {
    id: 'digestion-secrets',
    title: 'Natural Ways to Improve Digestion',
    description: 'Discover simple, effective strategies to soothe your gut, reduce bloating, and enhance nutrient absorption naturally.',
    image: placeholderImages.find(p => p.id === 'healthy-gut'),
    content: `
      <p>A healthy gut is the cornerstone of overall wellness. When your digestive system is functioning optimally, you absorb more nutrients, have more energy, and feel better. Here are some natural ways to support your digestion:</p>
      <br/>
      <h3 class="font-bold text-lg mb-2">Effective Practices:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Incorporate Probiotic Foods:</strong> Foods like yogurt, kefir, and fermented vegetables (like sauerkraut) introduce beneficial bacteria that help balance your gut microbiome.</li>
        <li><strong>Chew Your Food Thoroughly:</strong> Digestion begins in the mouth. Chewing well breaks down food and mixes it with enzymes, making it easier for your stomach to process.</li>
        <li><strong>Drink Herbal Teas:</strong> Ginger, peppermint, and chamomile teas are known for their digestive-soothing properties. Ginger can help with nausea, peppermint with bloating, and chamomile with relaxation.</li>
      </ul>
      <br/>
      <p>Avoid drinking large amounts of water with meals, as it can dilute stomach acid. Instead, stay hydrated between meals. A mindful approach to eating can make a world of difference.</p>
    `,
  },
  {
    id: 'detox-foods',
    title: 'Detox Through Food: A Natural Cleanse',
    description: 'Learn which foods can support your body’s natural detoxification pathways for a gentle and effective cleanse.',
    image: placeholderImages.find(p => p.id === 'detox-foods'),
    content: `
      <p>Your body has its own powerful detoxification system: the liver, kidneys, and gut. You can support this system by eating the right foods. A food-based detox is gentler and more sustainable than extreme juice cleanses.</p>
      <br/>
      <h3 class="font-bold text-lg mb-2">Top Detox-Supporting Foods:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Cruciferous Vegetables:</strong> Broccoli, cauliflower, and leafy greens like kale contain compounds that support liver detoxification enzymes.</li>
        <li><strong>Berries and Citrus Fruits:</strong> These are packed with antioxidants that protect cells from damage caused by toxins. Lemon water in the morning is a classic way to kick-start this process.</li>
        <li><strong>Garlic and Onions:</strong> These contain sulfur compounds that are essential for supporting the body\'s master antioxidant, glutathione.</li>
      </ul>
      <br/>
      <p>Remember to drink plenty of water to help your kidneys flush out waste products. Combining these foods with a diet low in processed ingredients is the best recipe for a natural, effective cleanse.</p>
    `,
  },
];

type BlogPost = typeof originalBlogPosts[0];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ja', label: 'Japanese' },
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(originalBlogPosts);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === selectedLanguage) return;
    
    setSelectedLanguage(languageCode);

    if (languageCode === 'en') {
      setBlogPosts(originalBlogPosts);
      return;
    }

    setIsTranslating(true);
    try {
      const language = languages.find(l => l.value === languageCode)?.label || 'English';
      
      const translatedPosts = await Promise.all(
        originalBlogPosts.map(async (post) => {
          const [translatedTitle, translatedDescription, translatedContent] = await Promise.all([
            translateContent({ content: post.title, targetLanguage: language }),
            translateContent({ content: post.description, targetLanguage: language }),
            translateContent({ content: post.content, targetLanguage: language }),
          ]);
          return {
            ...post,
            title: translatedTitle.translatedText,
            description: translatedDescription.translatedText,
            content: translatedContent.translatedText,
          };
        })
      );
      setBlogPosts(translatedPosts);
    } catch (error) {
      console.error("Translation failed:", error);
      toast({
        variant: 'destructive',
        title: 'Translation Failed',
        description: 'Could not translate the content. Please try again.',
      });
      // Revert to English on failure
      setBlogPosts(originalBlogPosts);
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
              NaturaLife Insights
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Knowledge and inspiration for your wellness journey.
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
              {blogPosts.map((post) => (
                <Dialog key={post.id}>
                  <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group rounded-xl">
                    {post.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={post.image.imageHint}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-base pt-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                      <DialogTrigger asChild>
                        <Button variant="outline">Read More</Button>
                      </DialogTrigger>
                    </CardFooter>
                  </Card>

                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {post.title}
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div
                          className="prose prose-sm sm:prose-base max-w-none text-muted-foreground pt-4"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
