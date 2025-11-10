import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3ZM16 27C10.038 27 5 21.962 5 16C5 10.038 10.038 5 16 5C21.962 5 27 10.038 27 16C27 21.962 21.962 27 16 27Z"
        className="fill-primary"
      />
      <path
        d="M16 7C12.875 7 10.055 9.423 9.25 12.5H13V19.5H11V21.5H21V19.5H19V12.5H22.75C21.945 9.423 19.125 7 16 7Z"
        className="fill-accent"
      />
    </svg>
  );
}
