import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Transport Nacional',
    price: 'Des de 55€',
    description: 'Solucions de càrrega completa (FTL) i grupaje (LTL) a tota la península.',
    features: [
      'Lliuraments en 24-72h',
      'Seguiment en temps real',
      'Assegurança bàsica inclosa',
      'Atenció al client dedicada',
    ],
    cta: 'Sol·licitar Pressupost',
  },
  {
    name: 'Transport Internacional',
    price: 'Consultar',
    description: 'Connectem la teva empresa amb Europa, gestionant tots els tràmits duaners.',
    features: [
      'Cobertura a tota la UE',
      'Gestió de duanes (DDP/DAP)',
      'Assessoria en comerç exterior',
      'Xarxa de socis europeus',
    ],
    cta: 'Contactar per a tarifa',
  },
  {
    name: 'Emmagatzematge',
    price: 'Des de 12€/m²',
    description: 'Emmagatzematge segur i gestió d\'estocs a les nostres instal·lacions.',
    features: [
      'Magatzems amb seguretat 24/7',
      'Control d\'inventari',
      'Picking i packing',
      'Logística inversa',
    ],
    cta: 'Consultar Disponibilitat',
  },
    {
    name: 'Mercaderies Especials',
    price: 'Personalitzat',
    description: 'Transport de mercaderies perilloses (ADR), refrigerades o de grans dimensions.',
    features: [
      'Vehicles i personal certificat ADR',
      'Control de temperatura',
      'Transport de càrregues voluminoses',
      'Permisos especials gestionats',
    ],
    cta: 'Demanar estudi',
  },
];

export default function PricesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Tarifes i Preus</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
          Troba la solució logística que millor s'adapta a les teves necessitats amb preus clars i competitius.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {pricingTiers.map((tier) => (
          <Card key={tier.name} className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
              <CardDescription className="h-10">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
              <div className="text-4xl font-bold">{tier.price}</div>
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={tier.name === 'Transport Internacional' ? 'secondary' : 'default'}>
                <Link href="/request-service">{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-16 text-center text-sm text-foreground/70">
            <p>Els preus mostrats són orientatius i poden variar segons el pes, volum, distància i naturalesa de la mercaderia.</p>
            <p>Per a un pressupost exacte, si us plau, contacta amb nosaltres o sol·licita un servei.</p>
        </div>
    </div>
  );
}
