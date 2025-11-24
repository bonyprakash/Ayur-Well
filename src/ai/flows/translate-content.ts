'use server';

/**
 * @fileOverview Translates text content into a specified language.
 *
 * - translateContent - A function that translates a given text.
 * - TranslateContentInput - The input type for the translateContent function.
 * - TranslateContentOutput - The return type for the translateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const TranslateContentInputSchema = z.object({
  content: z.string().describe('The text content to be translated.'),
  targetLanguage: z
    .string()
    .describe('The target language for translation (e.g., "Spanish", "French", "Hindi").'),
});
export type TranslateContentInput = z.infer<
  typeof TranslateContentInputSchema
>;

const TranslateContentOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateContentOutput = z.infer<
  typeof TranslateContentOutputSchema
>;

export async function translateContent(
  input: TranslateContentInput
): Promise<TranslateContentOutput> {
  return translateContentFlow(input);
}

const translateContentPrompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: {schema: TranslateContentInputSchema},
  output: {schema: TranslateContentOutputSchema},
  prompt: `Translate the following content into {{{targetLanguage}}}.

Content:
"{{{content}}}"

Return only the translated text, without any additional explanations or context.`,
});

const translateContentFlow = ai.defineFlow(
  {
    name: 'translateContentFlow',
    inputSchema: TranslateContentInputSchema,
    outputSchema: TranslateContentOutputSchema,
  },
  async input => {
    const {output} = await translateContentPrompt(input);
    return output!;
  }
);
