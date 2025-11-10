'use server';

/**
 * @fileOverview Suggests a naturopathic remedy for a given ailment.
 *
 * - suggestRemedy - A function that provides a remedy for a user's described problem.
 * - SuggestRemedyInput - The input type for the suggestRemedy function.
 * - SuggestRemedyOutput - The return type for the suggestRemedy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SuggestRemedyInputSchema = z.object({
  problem: z
    .string()
    .min(10)
    .describe('A description of the health problem or ailment.'),
});
export type SuggestRemedyInput = z.infer<typeof SuggestRemedyInputSchema>;

const SuggestRemedyOutputSchema = z.object({
  remedy: z
    .string()
    .describe('A safe, natural, naturopathic or herbal remedy for the problem.'),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer that this is not medical advice and a professional should be consulted.'
    ),
});
export type SuggestRemedyOutput = z.infer<typeof SuggestRemedyOutputSchema>;

export async function suggestRemedy(
  input: SuggestRemedyInput
): Promise<SuggestRemedyOutput> {
  return suggestRemedyFlow(input);
}

const suggestRemedyPrompt = ai.definePrompt({
  name: 'suggestRemedyPrompt',
  input: {schema: SuggestRemedyInputSchema},
  output: {schema: SuggestRemedyOutputSchema},
  prompt: `You are an expert naturopath. A user is asking for a natural remedy for the following problem:
"{{{problem}}}"

1.  Suggest a single, common, and safe natural or herbal remedy.
2.  Explain how to use it.
3.  Provide a clear disclaimer that this is not a substitute for professional medical advice.
4.  Do not suggest any pharmaceutical drugs or complex treatments. Focus on simple, accessible remedies.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        // Block medical advice
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
});

const suggestRemedyFlow = ai.defineFlow(
  {
    name: 'suggestRemedyFlow',
    inputSchema: SuggestRemedyInputSchema,
    outputSchema: SuggestRemedyOutputSchema,
  },
  async input => {
    const {output} = await suggestRemedyPrompt(input);
    return output!;
  }
);
