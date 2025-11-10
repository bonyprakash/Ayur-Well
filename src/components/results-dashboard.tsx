'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from './ui/button';
import { WellnessPlanOutput } from '@/ai/flows/wellness-plan';

type ResultsDashboardProps = {
  results: WellnessPlanOutput | null;
  onReset: () => void;
  resultCategories: readonly {
    key: keyof WellnessPlanOutput;
    title: string;
    icon: React.ElementType;
  }[];
};

function formatContent(text: string): string[] {
    if (!text) return [];
    // Split by markdown list items or numbered list items
    const cleanedText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/###\s*(.*)/g, '$1'); // Remove ### headings
        
    const items = cleanedText.split(/\n\s*(?:-|\*|\d+\.)\s+/).map(s => s.trim()).filter(s => s.length > 0);

    // Further split items that might contain sub-headings
    const finalItems: string[] = [];
    items.forEach(item => {
        const subItems = item.split(/\n\n/);
        finalItems.push(...subItems);
    });
    
    return finalItems;
}


export function ResultsDashboard({
  results,
  onReset,
  resultCategories,
}: ResultsDashboardProps) {
  if (!results) {
    return null;
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in-50 duration-500">
        {resultCategories.map(category => {
            const content = results[category.key];
            const Icon = category.icon;
            const listItems = formatContent(content);

            return (
                 <Card key={category.key} className="shadow-lg">
                    <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                        <Icon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-2xl font-headline">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-base space-y-2 pl-12">
                        {listItems.length > 1 ? (
                             <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                                {listItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">{content}</p>
                        )}
                    </CardContent>
                </Card>
            )
        })}
     
      <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onReset} size="lg">
            Start Over
          </Button>
      </div>
    </div>
  );
}
