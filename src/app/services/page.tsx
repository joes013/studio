import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Truck, Warehouse, Globe, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    icon: <Truck className="h-8 w-8 text-accent" />,
    title: 'Transport Terrestre Nacional',
    description: 'Serveis de càrrega completa (FTL) i grupaje (LTL) a tota la península Ibèrica. Flexibilitat i rapidesa per a les teves necessitats.',
    image: PlaceHolderImages.find(p => p.id === 'service-freight'),
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'Transport Internacional',
    description: 'Connectem la teva empresa amb Europa i el món, gestionant tots els tràmits duaners i logístics per a un transport sense complicacions.',
    image: PlaceHolderImages.find(p => p.id === 'service-logistics'),
  },
  {
    icon: <Warehouse className="h-8 w-8 text-accent" />,
    title: 'Solucions d\'Emmagatzematge',
    description: 'Disposem d\'instal·lacions modernes i segures a Constantí (Tarragona) per a l\'emmagatzematge i la gestió d\'estocs de la teva mercaderia.',
    image: PlaceHolderImages.find(p => p.id === 'service-warehousing'),
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Mercaderies Especials',
    description: 'Transport de mercaderies perilloses (ADR), refrigerades o de grans dimensions amb personal i vehicles especialitzats.',
    image: PlaceHolderImages.find(p => p.id === 'hero-truck'),
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Els Nostres Serveis</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
          Oferim una àmplia gamma de solucions logístiques dissenyades per adaptar-se a les necessitats úniques del teu negoci.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="overflow-hidden flex flex-col md:flex-row group">
            <div className="md:w-2/5 relative h-64 md:h-auto">
              {service.image && (
                <Image
                  src={service.image.imageUrl}
                  alt={service.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={service.image.imageHint}
                />
              )}
            </div>
            <div className="md:w-3/5 flex flex-col justify-center p-6">
              <CardHeader className="p-0">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                     {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-4 flex-grow">
                <CardDescription className="text-base text-foreground/80">
                  {service.description}
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
