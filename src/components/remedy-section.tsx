'use client';

import {Card, CardContent, CardHeader, CardTitle} from './ui/card';
import {Checkbox} from './ui/checkbox';
import {Label} from './ui/label';

interface RemedySectionProps {
  title: string;
  icon: React.ElementType;
  content: string;
  categoryKey: string;
  trackingData: Record<string, {tried: boolean; helpful: boolean}>;
  onTrack: (
    category: string,
    remedy: string,
    field: 'tried' | 'helpful',
    value: boolean
  ) => void;
}

function parseRemedies(text: string): string[] {
  if (!text) return [];
  return text
    .split(/\n-|\n\*/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

export function RemedySection({
  title,
  icon: Icon,
  content,
  categoryKey,
  trackingData,
  onTrack,
}: RemedySectionProps) {
  const remedies = parseRemedies(content);

  if (remedies.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2 space-y-0 pb-2">
          {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
          <CardTitle className="text-xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No specific recommendations provided for this category.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2 space-y-0 pb-2">
        {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
        <CardTitle className="text-xl font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {remedies.map((remedy, index) => {
            const remedyState = trackingData[remedy] || {
              tried: false,
              helpful: false,
            };
            const triedId = `${categoryKey}-${index}-tried`;
            const helpfulId = `${categoryKey}-${index}-helpful`;

            return (
              <li
                key={index}
                className="p-4 rounded-md border bg-background hover:bg-muted/50 transition-colors"
              >
                <p className="mb-3 text-base">{remedy}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={triedId}
                      checked={remedyState.tried}
                      onCheckedChange={checked =>
                        onTrack(categoryKey, remedy, 'tried', !!checked)
                      }
                    />
                    <Label htmlFor={triedId} className="cursor-pointer">
                      Tried
                    </Label>
                  </div>
                  {remedyState.tried && (
                    <div className="flex items-center space-x-2 animate-in fade-in-50">
                      <Checkbox
                        id={helpfulId}
                        checked={remedyState.helpful}
                        onCheckedChange={checked =>
                          onTrack(categoryKey, remedy, 'helpful', !!checked)
                        }
                      />
                      <Label htmlFor={helpfulId} className="cursor-pointer">
                        Helpful
                      </Label>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
