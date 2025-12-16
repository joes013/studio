import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, Truck, Warehouse, Leaf, Wind, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-truck');


const features = [
  {
    icon: <Truck className="h-10 w-10 text-accent" />,
    title: 'Transport Nacional i Internacional',
    description: 'Cobrim rutes per tot el territori nacional i europeu, garantint lliuraments puntuals.',
  },
  {
    icon: <Warehouse className="h-10 w-10 text-accent" />,
    title: 'Emmagatzematge i Logística',
    description: 'Solucions d\'emmagatzematge segures i gestió logística integral per a la teva mercaderia.',
  },
  {
    icon: <Package className="h-10 w-10 text-accent" />,
    title: 'Distribució Capil·lar',
    description: 'Lliuraments d\'última milla eficients per arribar a qualsevol punt que necessitis.',
  },
];

const sustainabilityFeatures = [
    {
      icon: <Truck className="h-8 w-8 text-accent" />,
      title: 'Flota Moderna i Eficient',
      description: 'Invertim en vehicles d\'última generació que redueixen les emissions i optimitzen el consum de combustible.'
    },
    {
      icon: <Wind className="h-8 w-8 text-accent" />,
      title: 'Optimització de Rutes',
      description: 'Utilitzem tecnologia per planificar les rutes més curtes i eficients, minimitzant la nostra petjada de carboni.'
    },
    {
      icon: <Recycle className="h-8 w-8 text-accent" />,
      title: 'Logística Verda',
      description: 'Promovem la consolidació de càrregues i l\'ús d\'embalatges sostenibles per reduir residus.'
    }
  ];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 max-w-3xl px-4 text-primary-foreground">
          <h1 className="text-4xl font-bold md:text-6xl font-headline tracking-tight">
            La teva solució de transport de confiança
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            A EJA Globaltrans, connectem el teu negoci amb el món, oferint serveis de logística eficients, segurs i puntuals.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/request-service">
              Sol·licita un pressupost <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">Per què escollir EJA Globaltrans?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Ens comprometem amb l'excel·lència en cada enviament, oferint més que un simple transport.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold font-headline">{feature.title}</h3>
                <p className="mt-2 text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">El Nostre Compromís amb la Sostenibilitat</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                    Estem dedicats a construir un futur més verd per a la logística, implementant pràctiques que cuiden el nostre planeta.
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                {sustainabilityFeatures.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center">
                    <div className="inline-block p-4 bg-accent/10 rounded-full">
                        {feature.icon}
                    </div>
                    <h3 className="mt-5 text-xl font-semibold font-headline">{feature.title}</h3>
                    <p className="mt-2 text-foreground/80">{feature.description}</p>
                </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 sm:py-24">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline tracking-tight">Preparat per començar?</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Deixa'ns encarregar-nos de la teva logística perquè et puguis centrar en el teu negoci.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/request-service">
                Sol·licitar Servei
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Contacta amb Nosaltres
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
