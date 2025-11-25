import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Truck, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-warehouse');

const values = [
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: 'Compromís',
    description: 'Ens dediquem a complir les promeses que fem als nostres clients, garantint la seva satisfacció.',
  },
  {
    icon: <Truck className="h-8 w-8 text-accent" />,
    title: 'Fiabilitat',
    description: 'Som un soci de confiança. La teva mercaderia està segura amb nosaltres, de principi a fi.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'Orientació al Client',
    description: 'Les teves necessitats són la nostra prioritat. Oferim solucions personalitzades i un tracte proper.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Sobre EJA Globaltrans</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
          Connectant negocis i mercats amb solucions logístiques integrals des del cor de Tarragona.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">La Nostra Història</h2>
            <p className="mt-4 text-foreground/80">
              Fundada a Polígon Industrial Constantí, Tarragona, EJA Globaltrans va néixer amb la vocació de ser un referent en el sector del transport de mercaderies. Amb anys d'experiència, hem crescut fins a convertir-nos en un operador logístic integral, adaptant-nos a les necessitats canviants del comerç global i mantenint sempre el nostre compromís local.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">La Nostra Missió</h2>
            <p className="mt-4 text-foreground/80">
              La nostra missió és oferir solucions de transport i logística que superin les expectatives dels nostres clients a través de l'eficiència, la seguretat i la innovació constant. Volem ser el motor que impulsa el creixement dels nostres clients, facilitant el seu accés a mercats nacionals i internacionals.
            </p>
          </div>
        </div>
        <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover shadow-lg"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
      </div>

      <section className="mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Els Nostres Valors</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Els principis que guien cada una de les nostres decisions i accions.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center">
                <div className="inline-block rounded-full bg-accent/10 p-4">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
                <p className="mt-2 text-foreground/80">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
