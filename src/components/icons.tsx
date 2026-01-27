import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image 
        src="/12345.png"
        alt="EJA Globaltrans Logo" 
        width={50} 
        height={50} 
        className="text-primary"
      />
      <span className="font-headline font-bold text-2xl text-primary hidden sm:inline-block">
        EJA Globaltrans
      </span>
    </div>
  );
}
