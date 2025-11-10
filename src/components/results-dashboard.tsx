'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import type {
  DoshaIdentificationOutput,
  SuggestRemediesOutput,
} from '@/ai/flows/remedy-suggestion';
import {Button} from './ui/button';
import {RemedySection} from './remedy-section';

type ResultsDashboardProps = {
  doshaResult: DoshaIdentificationOutput | null;
  remediesResult: SuggestRemediesOutput | null;
  remedyTracking: Record<
    string,
    Record<string, {tried: boolean; helpful: boolean}>
  >;
  onTrack: (
    category: string,
    remedy: string,
    field: 'tried' | 'helpful',
    value: boolean
  ) => void;
  onReset: () => void;
  doshaDetails: any;
  remedyCategories: readonly {
    key: keyof SuggestRemediesOutput;
    title: string;
    icon: React.ElementType;
  }[];
};

export function ResultsDashboard({
  doshaResult,
  remediesResult,
  remedyTracking,
  onTrack,
  onReset,
  doshaDetails,
  remedyCategories,
}: ResultsDashboardProps) {
  if (!doshaResult || !remediesResult) {
    return null;
  }

  const {dosha, reasoning} = doshaResult;
  const details = doshaDetails[dosha] || {};
  const Icon = details.icon;

  return (
    <div className="w-full space-y-6 animate-in fade-in-50 duration-500">
      <Card className="w-full shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/30">
          <div className="flex items-start gap-4">
            {Icon && <Icon className={`w-12 h-12 shrink-0 ${details.color}`} />}
            <div>
              <CardDescription>Your Primary Dosha Imbalance</CardDescription>
              <CardTitle className={`text-4xl font-headline ${details.color}`}>
                {dosha}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-base">
          <p className="font-semibold mb-2">{details.description}</p>
          <p className="text-muted-foreground">{reasoning}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={onReset}>
            Start Over
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Explore these natural ways to bring balance to your {dosha} dosha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={remedyCategories[0].key} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
              {remedyCategories.map(cat => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="text-xs sm:text-sm"
                >
                  {cat.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {remedyCategories.map(cat => (
              <TabsContent key={cat.key} value={cat.key}>
                <RemedySection
                  title={cat.title}
                  icon={cat.icon}
                  content={remediesResult[cat.key]}
                  categoryKey={cat.key}
                  trackingData={remedyTracking[cat.key] || {}}
                  onTrack={onTrack}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
