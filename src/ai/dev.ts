import { config } from 'dotenv';
config(); // Load environment variables

// Import flows to register them with Genkit
import '@/ai/flows/wellness-plan.ts';
