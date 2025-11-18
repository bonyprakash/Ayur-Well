import * as React from 'react';
import { Leaf } from 'lucide-react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div
      className="flex items-center justify-center bg-primary/10 rounded-full p-1"
      // The {...props} is removed because we are not passing SVG props anymore
    >
      <Leaf className="text-primary h-6 w-6" />
    </div>
  );
}
