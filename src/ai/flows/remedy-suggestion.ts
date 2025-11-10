'use server';

/**
 * @fileOverview Provides natural home remedies, Ayurvedic treatments, herbs, yoga poses, and dietary tips tailored to the identified dosha imbalance.
 *
 * - suggestRemedies - A function that suggests remedies based on dosha imbalance.
 * - SuggestRemediesInput - The input type for the suggestRemedies function.
 * - SuggestRemediesOutput - The return type for the suggestRemedies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRemediesInputSchema = z.object({
  doshaImbalance: z
    .enum(['Vata', 'Pitta', 'Kapha'])
    .describe('The identified dosha imbalance (Vata, Pitta, or Kapha).'),
  symptoms: z.string().describe('The user-reported symptoms.'),
  userProfile: z
    .object({
      height: z.number().optional().describe('The user height in cm.'),
      weight: z.number().optional().describe('The user weight in kg.'),
    })
    .optional()
    .describe('The user profile, including height and weight.'),
});
export type SuggestRemediesInput = z.infer<typeof SuggestRemediesInputSchema>;

const SuggestRemediesOutputSchema = z.object({
  remedies: z.string().describe('Suggested natural home remedies.'),
  ayurvedicTreatments: z.string().describe('Suggested Ayurvedic treatments.'),
  herbs: z.string().describe('Recommended herbs.'),
  yogaPoses: z.string().describe('Recommended yoga poses.'),
  dietaryTips: z.string().describe('Dietary tips for balancing the dosha.'),
});
export type SuggestRemediesOutput = z.infer<typeof SuggestRemediesOutputSchema>;

export async function suggestRemedies(input: SuggestRemediesInput): Promise<SuggestRemediesOutput> {
  return suggestRemediesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRemediesPrompt',
  input: {schema: SuggestRemediesInputSchema},
  output: {schema: SuggestRemediesOutputSchema},
  prompt: `You are an Ayurvedic health advisor. Suggest natural home remedies or free Ayurvedic treatments based on the user’s symptoms, without prescribing chemical medicines. Given the user’s health problem, identify the Ayurvedic dosha imbalance (Vata, Pitta, Kapha) and recommend simple herbs, yoga poses, and dietary tips to balance it.

  Dosha Imbalance: {{{doshaImbalance}}}
  Symptoms: {{{symptoms}}}
  User Profile: {{{userProfile}}}
  \n
  Provide tailored recommendations for remedies, treatments, herbs, yoga poses, and dietary tips.`,
});

const suggestRemediesFlow = ai.defineFlow(
  {
    name: 'suggestRemediesFlow',
    inputSchema: SuggestRemediesInputSchema,
    outputSchema: SuggestRemediesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
