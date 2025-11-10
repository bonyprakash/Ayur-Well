'use client';

import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Loader2,
  Leaf,
  HeartPulse,
  Soup,
  Flame,
  PersonStanding,
  Lightbulb,
  X,
  WandSparkles,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

import {
  generateWellnessPlan,
  type WellnessPlanOutput,
} from '@/ai/flows/wellness-plan';
import {
  suggestRemedy,
  type SuggestRemedyOutput,
} from '@/ai/flows/suggest-remedy';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/hooks/use-toast';
import {Header} from '@/components/header';
import {ResultsDashboard} from '@/components/results-dashboard';


const remedyFormSchema = z.object({
  problem: z.string().min(10, { message: 'Please describe your problem in at least 10 characters.' }),
});

const wellnessPlanFormSchema = z.object({
  age: z.coerce.number().positive({message: 'Please enter a valid age.'}).min(18, {message: "You must be at least 18 years old."}),
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select a gender.',
  }),
   height: z.coerce.number().positive({message: 'Please enter a valid height in cm.'}),
  weight: z.coerce.number().positive({message: 'Please enter a valid weight in kg.'}),
  lifestyle: z.enum(
    ['sedentary', 'lightly_active', 'moderately_active', 'very_active'],
    {required_error: 'Please select your lifestyle.'}
  ),
  healthGoals: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one health goal.',
  }),
});

type WellnessPlanFormValues = z.infer<typeof wellnessPlanFormSchema>;

const lifestyleOptions = [
  {value: 'sedentary', label: 'Sedentary (little to no exercise)', multiplier: 1.2},
  {value: 'lightly_active', label: 'Lightly Active (light exercise 1-3 days/week)', multiplier: 1.375},
  {value: 'moderately_active', label: 'Moderately Active (moderate exercise 3-5 days/week)', multiplier: 1.55},
  {value: 'very_active', label: 'Very Active (hard exercise 6-7 days/week)', multiplier: 1.725},
];

const healthGoals = [
  {id: 'weight_loss', label: 'Weight Loss'},
  {id: 'detox', label: 'Detoxification'},
  {id: 'stress_relief', label: 'Stress Relief'},
  {id: 'immunity_boosting', label: 'Immunity Boosting'},
  {id: 'increase_energy', label: 'Increase Energy'},
] as const;

const resultCategories = [
    { key: 'introduction', title: 'Your Personal Plan', icon: HeartPulse },
    { key: 'nutritionalGuidance', title: 'Nutritional Guidance', icon: Leaf },
    { key: 'mealPlan', title: 'Sample Meal Plan', icon: Soup },
    { key: 'wellnessPractices', title: 'Wellness Practices', icon: PersonStanding },
] as const;

const quickTips = [
    'Start your day with lukewarm lemon water to kickstart your metabolism.',
    'Avoid eating heavy meals after sunset to improve digestion.',
    'Incorporate 30 minutes of mindful walking into your daily routine.',
    'Try to drink at least 8 glasses of water throughout the day.',
    'Chew your food thoroughly to aid digestion and nutrient absorption.',
];


export default function DietPlannerPage() {
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [isLoadingRemedy, setIsLoadingRemedy] = useState(false);
  const [remedySuggestion, setRemedySuggestion] = useState<SuggestRemedyOutput | null>(null);
  const [results, setResults] = useState<WellnessPlanOutput & { dailyCalories?: number } | null>(null);
  const [tip, setTip] = useState<string | null>(null);

  const {toast} = useToast();

  const wellnessPlanForm = useForm<WellnessPlanFormValues>({
    resolver: zodResolver(wellnessPlanFormSchema),
    defaultValues: {
      age: 25,
      gender: undefined,
      lifestyle: undefined,
      healthGoals: [],
    },
  });

  const remedyForm = useForm<z.infer<typeof remedyFormSchema>>({
    resolver: zodResolver(remedyFormSchema),
  });

  const calculateBMR = (values: WellnessPlanFormValues) => {
    const s = values.gender === 'male' ? 5 : -161;
    const bmr = (10 * values.weight) + (6.25 * values.height) - (5 * values.age) + s;
    const activityMultiplier = lifestyleOptions.find(opt => opt.value === values.lifestyle)?.multiplier || 1.2;
    return Math.round(bmr * activityMultiplier);
  };

  async function onRemedySubmit(values: z.infer<typeof remedyFormSchema>) {
    setIsLoadingRemedy(true);
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
      setIsLoadingRemedy(false);
    }
  }


  async function onWellnessPlanSubmit(values: WellnessPlanFormValues) {
    setIsLoadingPlan(true);
    setResults(null);

    const dailyCalories = calculateBMR(values);

    try {
      const wellnessPlan = await generateWellnessPlan({
        ...values,
        dailyCalories: dailyCalories
      });
      if (!wellnessPlan) {
        throw new Error('Could not generate a wellness plan.');
      }
      setResults({...wellnessPlan, dailyCalories});
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get recommendations. Please try again later.',
      });
    } finally {
      setIsLoadingPlan(false);
    }
  }

  const showRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * quickTips.length);
    setTip(quickTips[randomIndex]);
  };

  const resetForm = () => {
    wellnessPlanForm.reset();
    remedyForm.reset();
    setResults(null);
    setRemedySuggestion(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8 animate-fade-in">
        <div className="w-full max-w-4xl">
          {!results ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-primary">
                  Your Personal Wellness Assistant
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                  Get AI-powered naturopathic remedies and personalized diet plans.
                </p>
              </div>

               <Card className="shadow-lg border-t-4 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                    <WandSparkles className="text-primary" /> Remedy Finder
                  </CardTitle>
                  <CardDescription>
                    Describe an ailment, and our AI will suggest a natural,
                    naturopathic remedy.
                  </CardDescription>
                </CardHeader>
                <Form {...remedyForm}>
                  <form onSubmit={remedyForm.handleSubmit(onRemedySubmit)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={remedyForm.control}
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
                      <Button type="submit" disabled={isLoadingRemedy}>
                        {isLoadingRemedy ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Finding a Remedy...
                          </>
                        ) : (
                          'Get Remedy Suggestion'
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

              <Card className="shadow-lg border-t-4 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">
                    Create Your Wellness Profile
                  </CardTitle>
                  <CardDescription>
                    For a personalized diet plan, tell us a bit about yourself.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...wellnessPlanForm}>
                    <form
                      onSubmit={wellnessPlanForm.handleSubmit(onWellnessPlanSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField
                          control={wellnessPlanForm.control}
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
                          control={wellnessPlanForm.control}
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
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={wellnessPlanForm.control}
                          name="height"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 175" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={wellnessPlanForm.control}
                          name="weight"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 70" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={wellnessPlanForm.control}
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
                        control={wellnessPlanForm.control}
                        name="healthGoals"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Health Goals</FormLabel>
                              <FormDescription>
                                Select one or more goals you'd like to achieve.
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {healthGoals.map(item => (
                                <FormField
                                  key={item.id}
                                  control={wellnessPlanForm.control}
                                  name="healthGoals"
                                  render={({field}) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
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
                                        <FormLabel className="font-normal cursor-pointer w-full">
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

                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={isLoadingPlan}
                            className="w-full md:w-1/2"
                            size="lg"
                        >
                            {isLoadingPlan ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Your Plan...
                            </>
                            ) : (
                            'Get My Wellness Plan'
                            )}
                        </Button>
                         <Button
                            type="button"
                            variant="outline"
                            onClick={showRandomTip}
                            className="w-full md:w-auto"
                            size="lg"
                        >
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Get a Quick Tip
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
                {results.dailyCalories && (
                     <Card className="bg-primary/10 border-primary shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-headline text-primary">
                                <Flame className="w-6 h-6" />
                                Estimated Daily Calorie Needs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-center text-primary">{results.dailyCalories} <span className="text-xl font-medium text-muted-foreground">kcal/day</span></p>
                             <p className="text-center text-sm text-muted-foreground mt-2">This is an estimate for maintaining your current weight. The meal plan below is tailored to your health goals.</p>
                        </CardContent>
                    </Card>
                )}
                <ResultsDashboard
                    results={results}
                    onReset={resetForm}
                    resultCategories={resultCategories}
                />
            </div>
          )}
        </div>
      </main>

       {tip && (
        <div className="fixed bottom-6 right-6 w-80 animate-fade-in-up">
            <Card className="bg-accent/90 backdrop-blur-sm border-primary shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-headline text-accent-foreground">
                        Naturopathic Tip
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setTip(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-accent-foreground">{tip}</p>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
