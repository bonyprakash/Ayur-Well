'use server';

/**
 * @fileOverview Generates a personalized naturopathy-based wellness plan.
 *
 * - generateWellnessPlan - A function that creates a wellness plan based on user profile and goals.
 * - WellnessPlanInput - The input type for the generateWellnessPlan function.
 * - WellnessPlanOutput - The return type for the generateWellnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellnessPlanInputSchema = z.object({
  age: z.number().positive().describe("The user's age."),
  gender: z
    .enum(['male', 'female', 'other'])
    .describe("The user's gender."),
  lifestyle: z
    .enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active'])
    .describe("The user's lifestyle."),
  healthGoals: z
    .array(z.string())
    .min(1)
    .describe("The user's primary health goals (e.g., weight loss, detox)."),
  height: z.number().positive().describe("The user's height in cm."),
  weight: z.number().positive().describe("The user's weight in kg."),
  dailyCalories: z.number().positive().describe("The user's estimated daily calorie needs for maintenance."),
});
export type WellnessPlanInput = z.infer<typeof WellnessPlanInputSchema>;

const WellnessPlanOutputSchema = z.object({
  introduction: z
    .string()
    .describe("A brief, encouraging introduction to the user's personalized plan."),
  nutritionalGuidance: z
    .string()
    .describe('General nutritional principles and advice tailored to the user.'),
  mealPlan: z
    .string()
    .describe(
      'A sample one-day meal plan with breakfast, lunch, dinner, and snack suggestions using common, natural foods like fruits, millets, and herbal teas. It should be aligned with the user\'s calorie needs and health goals.'
    ),
  wellnessPractices: z
    .string()
    .describe(
      'Recommended natural wellness practices like yoga, fasting, hydrotherapy, etc.'
    ),
});
export type WellnessPlanOutput = z.infer<typeof WellnessPlanOutputSchema>;

export async function generateWellnessPlan(
  input: WellnessPlanInput
): Promise<WellnessPlanOutput> {
  return wellnessPlanFlow(input);
}

const wellnessPlanPrompt = ai.definePrompt({
  name: 'wellnessPlanPrompt',
  input: {schema: WellnessPlanInputSchema},
  output: {schema: WellnessPlanOutputSchema},
  prompt: `You are an expert naturopath and certified nutritionist. Your goal is to create a holistic, actionable, and safe wellness plan based on the user's profile and their estimated daily calorie needs. The plan should be easy to understand and follow. Do not prescribe chemical or processed treatments.

The user's estimated daily calorie need for maintenance is {{{dailyCalories}}} kcal. Create a meal plan that is adjusted based on their primary health goal. For example, for weight loss, suggest a slight caloric deficit. For energy gain, ensure nutrient-dense foods.

User Profile:
- Age: {{{age}}}
- Gender: {{{gender}}}
- Height: {{{height}}} cm
- Weight: {{{weight}}} kg
- Lifestyle: {{{lifestyle}}}
- Health Goals: {{{healthGoals}}}
- Estimated Daily Calorie Needs: {{{dailyCalories}}} kcal

Generate a personalized naturopathic wellness plan with the following sections:
1.  **Introduction**: Write a brief, encouraging introduction to the user's personalized plan.
2.  **Nutritional Guidance**: Provide core nutritional principles and advice tailored to the user's goals.
3.  **Sample Meal Plan**: Create a simple, one-day meal plan (breakfast, lunch, dinner, snacks) with healthy, natural food suggestions (e.g., fruits, millets, herbal teas). This plan should be mindful of the user's calorie needs and goals.
4.  **Wellness Practices**: Recommend 3-5 natural wellness practices (e.g., specific yoga poses, breathing exercises, hydrotherapy, fasting tips, herbal teas) that align with their goals.

Ensure the tone is supportive, educational, and empowering. Focus on simple, accessible foods and practices.
`,
});

const wellnessPlanFlow = ai.defineFlow(
  {
    name: 'wellnessPlanFlow',
    inputSchema: WellnessPlanInputSchema,
    outputSchema: WellnessPlanOutputSchema,
  },
  async input => {
    const {output} = await wellnessPlanPrompt(input);
    return output!;
  }
);
