import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Truck, Warehouse, Globe, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    icon: <Truck className="h-8 w-8 text-accent" />,
    title: 'Transport Terrestre Nacional',
    description: 'Serveis de càrrega completa (FTL) i grupaje (LTL) a tota la península Ibèrica. Flexibilitat i rapidesa per a les teves necessitats.',
    detailedDescription: 'El nostre servei de transport terrestre nacional és la columna vertebral de la nostra operació. Oferim solucions de càrrega completa (FTL) per a enviaments grans i urgents, i serveis de grupaje (LTL) per optimitzar costos en càrregues més petites. La nostra flota moderna i la nostra xarxa logística ens permeten garantir lliuraments puntuals i segurs a qualsevol punt de la península Ibèrica, adaptant-nos sempre a les necessitats específiques de cada client.',
    image: PlaceHolderImages.find(p => p.id === 'service-freight'),
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'Transport Internacional',
    description: 'Connectem la teva empresa amb Europa i el món, gestionant tots els tràmits duaners i logístics per a un transport sense complicacions.',
    detailedDescription: 'Amb el nostre servei de transport internacional, les fronteres no són un problema. Connectem la teva empresa amb els principals mercats europeus i mundials. Ens encarreguem de tota la gestió duanera, documentació i coordinació logística per garantir un trànsit fluid i sense sorpreses. Ja sigui per carretera, mar o aire, la teva mercaderia arribarà a la seva destinació de manera eficient.',
    image: PlaceHolderImages.find(p => p.id === 'service-logistics'),
  },
  {
    icon: <Warehouse className="h-8 w-8 text-accent" />,
    title: 'Solucions d\'Emmagatzematge',
    description: 'Disposem d\'instal·lacions modernes i segures a Constantí (Tarragona) per a l\'emmagatzematge i la gestió d\'estocs de la teva mercaderia.',
    detailedDescription: 'Les nostres instal·lacions a Constantí (Tarragona) ofereixen més que un simple espai. Proporcionem solucions d\'emmagatzematge segures, amb vigilància 24/7 i sistemes de gestió d\'inventari avançats. Oferim serveis de picking, packing i manipulació de mercaderies, convertint-nos en una extensió del teu propi magatzem i optimitzant la teva cadena de subministrament.',
    image: PlaceHolderImages.find(p => p.id === 'service-warehousing'),
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Mercaderies Especials',
    description: 'Transport de mercaderies perilloses (ADR), refrigerades o de grans dimensions amb personal i vehicles especialitzats.',
    detailedDescription: 'Entenem que no totes les mercaderies són iguals. Per això, comptem amb personal i vehicles especialitzats per al transport de mercaderies perilloses (ADR), productes que requereixen control de temperatura (refrigerats o congelats) i càrregues de grans dimensions o pes. Gestionem tots els permisos necessaris i garantim el compliment de les normatives més estrictes per a un transport segur i fiable.',
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

      <div className="mt-16 max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {services.map((service, index) => (
            <AccordionItem key={service.title} value={`item-${index}`} className="border rounded-lg bg-card overflow-hidden">
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex items-center gap-4">
                   <div className="rounded-full bg-accent/10 p-3">
                     {service.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold font-headline text-primary">{service.title}</h3>
                    <p className="text-sm text-foreground/70 mt-1">{service.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-primary/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                    <div className="prose prose-sm max-w-none text-foreground/80">
                        <p>{service.detailedDescription}</p>
                    </div>
                    <div className="relative h-48 md:h-full w-full rounded-md overflow-hidden">
                        {service.image && (
                        <Image
                            src={service.image.imageUrl}
                            alt={service.description}
                            fill
                            className="object-cover"
                            data-ai-hint={service.image.imageHint}
                        />
                        )}
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
