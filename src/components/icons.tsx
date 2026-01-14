import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image 
        src="https://i.pravatar.cc/32?u=12345"
        alt="EJA Globaltrans Logo" 
        width={32} 
        height={32} 
        className="text-primary rounded-full"
      />
      <span className="font-headline font-bold text-xl text-primary hidden sm:inline-block">
        EJA Globaltrans
      </span>
    </div>
  );
}
