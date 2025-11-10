'use client';

import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Loader2,
  Leaf,
  HeartPulse,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Scale,
  Soup,
  Flame,
  Droplets,
  PersonStanding,
} from 'lucide-react';

import {
  generateWellnessPlan,
} from '@/ai/flows/wellness-plan';
import type { WellnessPlanOutput } from '@/ai/flows/wellness-plan';
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
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/hooks/use-toast';
import {Header} from '@/components/header';
import {ResultsDashboard} from '@/components/results-dashboard';

const lifestyleOptions = [
  {value: 'sedentary', label: 'Sedentary (little to no exercise)'},
  {value: 'lightly_active', label: 'Lightly Active (light exercise/sports 1-3 days/week)'},
  {value: 'moderately_active', label: 'Moderately Active (moderate exercise/sports 3-5 days/week)'},
  {value: 'very_active', label: 'Very Active (hard exercise/sports 6-7 days a week)'},
];

const healthGoals = [
  {id: 'weight_loss', label: 'Weight Loss'},
  {id: 'detox', label: 'Detoxification'},
  {id: 'stress_relief', label: 'Stress Relief'},
  {id: 'immunity_boosting', label: 'Immunity Boosting'},
  {id: 'increase_energy', label: 'Increase Energy'},
] as const;

const formSchema = z.object({
  age: z.coerce.number().positive({message: 'Please enter a valid age.'}).min(18, {message: "You must be at least 18 years old."}),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
  lifestyle: z.enum(
    ['sedentary', 'lightly_active', 'moderately_active', 'very_active'],
    {required_error: 'Please select your lifestyle.'}
  ),
  healthGoals: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one health goal.',
  }),
});

type UserProfile = {
  height: number | null;
  weight: number | null;
};

const resultCategories = [
    { key: 'introduction', title: 'Your Personal Plan', icon: HeartPulse },
    { key: 'nutritionalGuidance', title: 'Nutritional Guidance', icon: Leaf },
    { key: 'mealPlan', title: 'Sample Meal Plan', icon: Soup },
    { key: 'calorieGuidance', title: 'Calorie Guidance', icon: Flame },
    { key: 'wellnessPractices', title: 'Wellness Practices', icon: PersonStanding },
] as const;


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<WellnessPlanOutput | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    height: null,
    weight: null,
  });

  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 25,
      gender: undefined,
      lifestyle: undefined,
      healthGoals: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);

    try {
      const wellnessPlan = await generateWellnessPlan({
        ...values,
        height: userProfile.height ?? undefined,
        weight: userProfile.weight ?? undefined,
      });
      if (!wellnessPlan) {
        throw new Error('Could not generate a wellness plan.');
      }
      setResults(wellnessPlan);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get recommendations. Please try again later.',
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

  const resetForm = () => {
    form.reset();
    setResults(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        userProfile={userProfile}
        onProfileSave={handleProfileSave}
        showProfileSheet={!results}
      />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl">
          {!results ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
                  Welcome to NaturaLife
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                  Your AI-powered guide to natural wellness.
                </p>
              </div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">
                    Create Your Wellness Profile
                  </CardTitle>
                  <CardDescription>
                    Tell us a bit about yourself to get a personalized
                    naturopathic plan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 30" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                               <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="lifestyle"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Lifestyle</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your activity level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {lifestyleOptions.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="healthGoals"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Health Goals</FormLabel>
                              <FormDescription>
                                Select one or more goals you'd like to achieve.
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {healthGoals.map(item => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="healthGoals"
                                  render={({field}) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={checked => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      value => value !== item.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
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
                            Generating Your Plan...
                          </>
                        ) : (
                          'Get My Wellness Plan'
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          ) : (
             <ResultsDashboard
                results={results}
                onReset={resetForm}
                resultCategories={resultCategories}
            />
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>NaturaLife © {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">
          Disclaimer: This tool provides suggestions based on naturopathic
          principles and is not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}
