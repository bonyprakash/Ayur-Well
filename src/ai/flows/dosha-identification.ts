'use server';

/**
 * @fileOverview Determines the primary Ayurvedic dosha imbalance (Vata, Pitta, or Kapha) based on user-provided symptoms.
 *
 * - identifyDosha - An async function that takes user symptoms as input and returns the identified dosha.
 * - DoshaIdentificationInput - The input type for the identifyDosha function.
 * - DoshaIdentificationOutput - The return type for the identifyDosha function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DoshaIdentificationInputSchema = z.object({
  symptoms: z
    .string()
    .describe("A detailed description of the user's symptoms and health concerns."),
});
export type DoshaIdentificationInput = z.infer<typeof DoshaIdentificationInputSchema>;

const DoshaIdentificationOutputSchema = z.object({
  dosha: z
    .enum(['Vata', 'Pitta', 'Kapha'])
    .describe('The identified primary Ayurvedic dosha imbalance.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the dosha identification based on the provided symptoms.'),
});
export type DoshaIdentificationOutput = z.infer<typeof DoshaIdentificationOutputSchema>;

export async function identifyDosha(input: DoshaIdentificationInput): Promise<DoshaIdentificationOutput> {
  return identifyDoshaFlow(input);
}

const doshaIdentificationPrompt = ai.definePrompt({
  name: 'doshaIdentificationPrompt',
  input: {schema: DoshaIdentificationInputSchema},
  output: {schema: DoshaIdentificationOutputSchema},
  prompt: `You are an expert Ayurvedic health advisor. Analyze the following symptoms and identify the primary Ayurvedic dosha imbalance (Vata, Pitta, or Kapha). Provide a brief reasoning for your identification.

Symptoms: {{{symptoms}}}

Respond with the dosha and reasoning.
`,
});

const identifyDoshaFlow = ai.defineFlow(
  {
    name: 'identifyDoshaFlow',
    inputSchema: DoshaIdentificationInputSchema,
    outputSchema: DoshaIdentificationOutputSchema,
  },
  async input => {
    const {output} = await doshaIdentificationPrompt(input);
    return output!;
  }
);
