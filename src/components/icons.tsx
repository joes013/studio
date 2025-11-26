import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image 
        src="https://i.pinimg.com/originals/fc/28/58/fc28587000b3e4408702a74c41ff98e0.jpg"
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
