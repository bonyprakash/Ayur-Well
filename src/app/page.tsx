'use client';

import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  HeartPulse,
  Leaf,
  Loader2,
  PersonStanding,
  Sparkles,
  UtensilsCrossed,
  Wind,
} from 'lucide-react';

import {
  identifyDosha,
  type DoshaIdentificationOutput,
} from '@/ai/flows/dosha-identification';
import {
  suggestRemedies,
  type SuggestRemediesOutput,
} from '@/ai/flows/remedy-suggestion';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {Header} from '@/components/header';
import {ResultsDashboard} from '@/components/results-dashboard';

const formSchema = z.object({
  symptoms: z
    .string()
    .min(10, {message: 'Please describe your symptoms in at least 10 characters.'})
    .max(2000, {
      message: 'Symptom description must not exceed 2000 characters.',
    }),
});

type UserProfile = {
  height: number | null;
  weight: number | null;
};

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const WaterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const doshaDetails = {
  Vata: {
    icon: Wind,
    description:
      'Associated with air and space. Governs movement, creativity, and energy.',
    color: 'text-blue-500',
  },
  Pitta: {
    icon: SunIcon,
    description:
      'Associated with fire and water. Governs metabolism, digestion, and transformation.',
    color: 'text-red-500',
  },
  Kapha: {
    icon: WaterIcon,
    description:
      'Associated with earth and water. Governs structure, stability, and lubrication.',
    color: 'text-green-500',
  },
};

const remedyCategories = [
  {
    key: 'remedies',
    title: 'Home Remedies',
    icon: HeartPulse,
  },
  {
    key: 'ayurvedicTreatments',
    title: 'Ayurvedic Treatments',
    icon: Sparkles,
  },
  {
    key: 'herbs',
    title: 'Herbs',
    icon: Leaf,
  },
  {
    key: 'yogaPoses',
    title: 'Yoga Poses',
    icon: PersonStanding,
  },
  {
    key: 'dietaryTips',
    title: 'Dietary Tips',
    icon: UtensilsCrossed,
  },
] as const;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [doshaResult, setDoshaResult] =
    useState<DoshaIdentificationOutput | null>(null);
  const [remediesResult, setRemediesResult] =
    useState<SuggestRemediesOutput | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    height: null,
    weight: null,
  });
  const [remedyTracking, setRemedyTracking] = useState<
    Record<string, Record<string, {tried: boolean; helpful: boolean}>>
  >({});

  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDoshaResult(null);
    setRemediesResult(null);

    try {
      const identifiedDosha = await identifyDosha({symptoms: values.symptoms});
      if (!identifiedDosha || !identifiedDosha.dosha) {
        throw new Error('Could not identify dosha.');
      }
      setDoshaResult(identifiedDosha);

      const remedies = await suggestRemedies({
        doshaImbalance: identifiedDosha.dosha,
        symptoms: values.symptoms,
        userProfile: {
          height: userProfile.height ?? undefined,
          weight: userProfile.weight ?? undefined,
        },
      });
      setRemediesResult(remedies);
      setRemedyTracking({}); // Reset tracking for new results
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Failed to get recommendations. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    toast({
      title: 'Profile Saved',
      description: 'Your information has been updated.',
    });
  };

  const handleRemedyTrack = (
    category: string,
    remedy: string,
    field: 'tried' | 'helpful',
    value: boolean
  ) => {
    setRemedyTracking(prev => {
      const newTracking = {...prev};
      if (!newTracking[category]) {
        newTracking[category] = {};
      }
      if (!newTracking[category][remedy]) {
        newTracking[category][remedy] = {tried: false, helpful: false};
      }
      newTracking[category][remedy][field] = value;
      // If un-trying, also un-mark as helpful
      if (field === 'tried' && !value) {
        newTracking[category][remedy].helpful = false;
      }
      return newTracking;
    });
  };

  const resetForm = () => {
    form.reset();
    setDoshaResult(null);
    setRemediesResult(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        userProfile={userProfile}
        onProfileSave={handleProfileSave}
        showProfileSheet={!doshaResult}
      />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl">
          {!doshaResult ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
                  Welcome to AyurWell
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                  Discover your Ayurvedic path to wellness.
                </p>
              </div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">
                    Symptom Analysis
                  </CardTitle>
                  <CardDescription>
                    Describe your health concerns, and our AI will identify your
                    dosha imbalance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="symptoms"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              How are you feeling?
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., I have trouble sleeping, my skin is dry, and I often feel anxious..."
                                className="min-h-[150px] text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Be as detailed as possible for the most accurate
                              recommendations.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Find My Dosha'
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <ResultsDashboard
              doshaResult={doshaResult}
              remediesResult={remediesResult}
              remedyTracking={remedyTracking}
              onTrack={handleRemedyTrack}
              onReset={resetForm}
              doshaDetails={doshaDetails}
              remedyCategories={remedyCategories}
            />
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>AyurWell © {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">
          Disclaimer: This tool provides suggestions based on Ayurvedic
          principles and is not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}
