import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Contacta amb Nosaltres</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
          Tens alguna pregunta o vols un pressupost? Estem aquí per ajudar-te.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold font-headline mb-6">Envia'ns un missatge</h2>
            <form action="https://formspree.io/f/movgwnzj" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nom complet</label>
                <Input type="text" id="name" name="name" placeholder="El teu nom" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Correu electrònic</label>
                <Input type="email" id="email" name="email" placeholder="el.teu@email.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Missatge</label>
                <Textarea id="message" name="message" rows={5} placeholder="Com et podem ajudar?" required />
              </div>
              <Button type="submit" className="w-full" size="lg">Enviar Missatge</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold font-headline mb-6">La nostra informació</h2>
              <div className="space-y-4 text-base">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                  <span className="text-foreground/80">Polígon Industrial Constantí,<br />43120 Tarragona, Espanya</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <a href="tel:+34977000000" className="text-foreground/80 hover:text-accent">+34 977 000 000</a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-accent" />
                  <a href="mailto:contacte@ejaglobaltrans.com" className="text-foreground/80 hover:text-accent">contacte@ejaglobaltrans.com</a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="relative h-80 w-full">
              {mapImage && (
                <Image
                  src={mapImage.imageUrl}
                  alt="Mapa de la ubicació de EJA Globaltrans"
                  fill
                  className="object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
