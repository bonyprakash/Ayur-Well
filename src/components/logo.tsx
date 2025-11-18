import * as React from 'react';
import { Leaf } from 'lucide-react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div
      className="flex items-center justify-center bg-primary/10 rounded-full p-2"
    >
      <Leaf className="text-primary h-6 w-6" style={{ color: '#245C47' }} />
    </div>
  );
}
