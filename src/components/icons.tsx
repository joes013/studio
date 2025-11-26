import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image 
        src="https://static.vecteezy.com/system/resources/previews/002/638/049/non_2x/e-gold-letter-logo-alphabet-for-business-and-company-with-yellow-color-corporate-brading-and-lettering-with-golden-metal-design-and-wing-vector.jpg"
        alt="EJA Globaltrans Logo" 
        width={32} 
        height={32} 
        className="text-primary"
      />
      <span className="font-headline font-bold text-xl text-primary hidden sm:inline-block">
        EJA Globaltrans
      </span>
    </div>
  );
}
