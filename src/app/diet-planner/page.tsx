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
  AlertTriangle,
  User,
  Copy
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";


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
    {required_error: 'Please select your activity level.'}
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


export default function DietPlannerPage() {
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [isLoadingRemedy, setIsLoadingRemedy] = useState(false);
  const [remedySuggestion, setRemedySuggestion] = useState<SuggestRemedyOutput | null>(null);
  const [results, setResults] = useState<WellnessPlanOutput & { dailyCalories?: number, bmi?: number } | null>(null);
  const { toast } = useToast();

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
  
  const calculateBMI = (height: number, weight: number) => {
      if (height > 0 && weight > 0) {
        const heightInMeters = height / 100;
        return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
      }
      return undefined;
  }

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
    const bmi = calculateBMI(values.height, values.weight);

    try {
      const wellnessPlan = await generateWellnessPlan({
        ...values,
        dailyCalories: dailyCalories
      });
      if (!wellnessPlan) {
        throw new Error('Could not generate a wellness plan.');
      }
      setResults({...wellnessPlan, dailyCalories, bmi});
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

  const resetForm = () => {
    wellnessPlanForm.reset();
    remedyForm.reset();
    setResults(null);
    setRemedySuggestion(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Meal plan details copied.",
    })
  }

  const parseMealPlan = (mealPlan: string) => {
    const meals: {title: string, items: string}[] = [];
    const mealTitles = ["Breakfast:", "Lunch:", "Dinner:", "Snacks:"];
    let currentPlan = mealPlan;

    mealTitles.forEach((title, index) => {
        const nextTitle = mealTitles[index + 1];
        let mealContent;
        if(currentPlan.includes(title)) {
            if (nextTitle && currentPlan.includes(nextTitle)) {
                mealContent = currentPlan.substring(currentPlan.indexOf(title) + title.length, currentPlan.indexOf(nextTitle)).trim();
            } else {
                mealContent = currentPlan.substring(currentPlan.indexOf(title) + title.length).trim();
            }
            if(mealContent) meals.push({ title: title.replace(':', ''), items: mealContent });
        }
    });
    
    if (meals.length === 0 && mealPlan) {
        return [{ title: 'Meal Plan', items: mealPlan }]
    }

    return meals;
  }
  
  const mealPlanCards = results ? parseMealPlan(results.mealPlan) : [];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                    Your Personal Wellness Planner
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                    Get AI-powered naturopathic remedies and personalized diet plans.
                </p>
            </div>
            
            {results && (
                 <Card className="w-full glassmorphism-card animate-fade-in-up">
                    <CardHeader>
                        <CardTitle className="text-xl">Your Profile Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-white/60 rounded-lg shadow-sm">
                            <User className="mx-auto h-8 w-8 text-primary"/>
                            <p className="text-sm text-muted-foreground mt-2">Age</p>
                            <p className="text-xl font-bold">{wellnessPlanForm.getValues('age')}</p>
                        </div>
                        <div className="p-4 bg-white/60 rounded-lg shadow-sm">
                             <p className="text-3xl font-bold">{results.bmi || 'N/A'}</p>
                             <p className="text-sm text-muted-foreground">BMI</p>
                        </div>
                        <div className="p-4 bg-white/60 rounded-lg shadow-sm">
                             <p className="text-3xl font-bold">{results.dailyCalories || 'N/A'}</p>
                              <p className="text-sm text-muted-foreground">kcal/day</p>
                        </div>
                         <div className="p-4 bg-white/60 rounded-lg shadow-sm flex items-center justify-center">
                            <Button onClick={resetForm} variant="outline" size="lg">Start Over</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    {/* Remedy Finder Card */}
                    <Card className="w-full glassmorphism-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <WandSparkles className="text-primary"/> Remedy Finder
                            </CardTitle>
                            <CardDescription>Describe an ailment for a natural remedy suggestion.</CardDescription>
                        </CardHeader>
                        <Form {...remedyForm}>
                        <form onSubmit={remedyForm.handleSubmit(onRemedySubmit)}>
                            <CardContent>
                                <FormField
                                    control={remedyForm.control}
                                    name="problem"
                                    render={({ field }) => (
                                    <FormItem>
                                        <Textarea
                                        placeholder="e.g., 'I have a persistent dry cough...'"
                                        className="min-h-[100px] glassmorphism-input"
                                        {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4">
                                <Button type="submit" disabled={isLoadingRemedy} className="gradient-button">
                                    {isLoadingRemedy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Finding Remedy...</> : 'Get Remedy'}
                                </Button>
                                {remedySuggestion && (
                                    <Card className="w-full bg-primary/5 animate-fade-in">
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-bold text-md">Suggested Remedy</h4>
                                                    <p className="text-sm text-muted-foreground">{remedySuggestion.remedy}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="h-5 w-5 text-destructive/80 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-bold text-md text-destructive/90">Disclaimer</h4>
                                                    <p className="text-sm text-muted-foreground">{remedySuggestion.disclaimer}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </CardFooter>
                        </form>
                        </Form>
                    </Card>

                    {/* Wellness Profile Form */}
                     <Card className="w-full glassmorphism-card">
                        <CardHeader>
                            <CardTitle>Create Your Wellness Profile</CardTitle>
                            <CardDescription>Fill this to get a personalized diet plan.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...wellnessPlanForm}>
                                <form onSubmit={wellnessPlanForm.handleSubmit(onWellnessPlanSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={wellnessPlanForm.control} name="age" render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Age</FormLabel>
                                                <FormControl><Input type="number" placeholder="e.g., 30" {...field} className="glassmorphism-input" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                        <FormField control={wellnessPlanForm.control} name="gender" render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl><SelectTrigger className="glassmorphism-input"><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                                                    <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                        <FormField control={wellnessPlanForm.control} name="height" render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Height</FormLabel>
                                                <FormControl><Input type="number" placeholder="cm" {...field} className="glassmorphism-input" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                        <FormField control={wellnessPlanForm.control} name="weight" render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Weight</FormLabel>
                                                <FormControl><Input type="number" placeholder="kg" {...field} className="glassmorphism-input" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                    </div>

                                    <FormField control={wellnessPlanForm.control} name="lifestyle" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Activity Level</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="glassmorphism-input"><SelectValue placeholder="Select activity level" /></SelectTrigger></FormControl>
                                                <SelectContent>{lifestyleOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={wellnessPlanForm.control} name="healthGoals" render={() => (
                                        <FormItem>
                                            <FormLabel>Health Goals</FormLabel>
                                            <FormDescription className="text-xs">Select at least one.</FormDescription>
                                            <div className="grid grid-cols-2 gap-2">
                                                {healthGoals.map(item => (<FormField key={item.id} control={wellnessPlanForm.control} name="healthGoals" render={({field}) => (
                                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                        <FormControl>
                                                            <Checkbox checked={field.value?.includes(item.id)} onCheckedChange={checked => {
                                                                return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter(value => value !== item.id));
                                                            }}/>
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-sm">{item.label}</FormLabel>
                                                    </FormItem>
                                                )}/>))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <div className="pt-4">
                                        <Button type="submit" disabled={isLoadingPlan} className="w-full gradient-button" size="lg">
                                            {isLoadingPlan ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Plan...</> : 'Get My Wellness Plan'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Results Section */}
                <div className="lg:col-span-2">
                    {isLoadingPlan && <div className="flex justify-center items-center h-96"><Loader2 className="w-12 h-12 animate-spin text-primary"/></div>}
                    
                    {results && !isLoadingPlan && (
                        <div className="space-y-6 animate-fade-in-up">
                            {/* Nutrition Targets */}
                            <Card className="glassmorphism-card">
                                <CardHeader>
                                    <CardTitle>Daily Nutrition Targets</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1"><p>Protein</p><p>25%</p></div>
                                        <Progress value={25} className="h-2" colorClass="bg-protein" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1"><p>Carbs</p><p>50%</p></div>
                                        <Progress value={50} className="h-2" colorClass="bg-carbs" />
                                    </div>
                                     <div>
                                        <div className="flex justify-between mb-1"><p>Fats</p><p>25%</p></div>
                                        <Progress value={25} className="h-2" colorClass="bg-fat" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Accordion for mobile, grid for desktop */}
                            {/* Mobile View */}
                            <div className="block lg:hidden">
                                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                                    {mealPlanCards.map((meal, index) => (
                                        <AccordionItem value={`item-${index}`} key={index} className="glassmorphism-card rounded-xl border-none">
                                            <AccordionTrigger className="p-4 text-lg font-semibold">{meal.title}</AccordionTrigger>
                                            <AccordionContent className="p-4 pt-0">
                                                <p className="text-muted-foreground whitespace-pre-line">{meal.items}</p>
                                                <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(meal.items)}><Copy className="mr-2 h-4 w-4"/> Copy</Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                    <AccordionItem value="item-practices" className="glassmorphism-card rounded-xl border-none">
                                        <AccordionTrigger className="p-4 text-lg font-semibold">Wellness Practices</AccordionTrigger>
                                        <AccordionContent className="p-4 pt-0">
                                            <p className="text-muted-foreground whitespace-pre-line">{results.wellnessPractices}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-guidance" className="glassmorphism-card rounded-xl border-none">
                                        <AccordionTrigger className="p-4 text-lg font-semibold">Nutritional Guidance</AccordionTrigger>
                                        <AccordionContent className="p-4 pt-0">
                                            <p className="text-muted-foreground whitespace-pre-line">{results.nutritionalGuidance}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            
                            {/* Desktop View */}
                            <div className="hidden lg:grid grid-cols-1 gap-6">
                                {mealPlanCards.map((meal, index) => (
                                    <Card key={index} className="glassmorphism-card">
                                        <CardHeader>
                                            <CardTitle>{meal.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground whitespace-pre-line">{meal.items}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(meal.items)}><Copy className="mr-2 h-4 w-4"/> Copy</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                                 <Card className="glassmorphism-card">
                                    <CardHeader><CardTitle>Wellness Practices</CardTitle></CardHeader>
                                    <CardContent><p className="text-muted-foreground whitespace-pre-line">{results.wellnessPractices}</p></CardContent>
                                </Card>
                                <Card className="glassmorphism-card">
                                    <CardHeader><CardTitle>Nutritional Guidance</CardTitle></CardHeader>
                                    <CardContent><p className="text-muted-foreground whitespace-pre-line">{results.nutritionalGuidance}</p></CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                    {!results && !isLoadingPlan && (
                        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-2xl h-full min-h-[500px]">
                            <Leaf className="w-16 h-16 text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-semibold">Your plan will appear here</h3>
                            <p className="text-muted-foreground mt-2 max-w-sm">Fill out your profile on the left to generate a personalized wellness and diet plan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
