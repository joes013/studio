import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-foreground/80 max-w-sm">
              La teva solució de transport i logística de confiança a Tarragona i més enllà.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Enllaços Ràpids</h3>
            <div className="mt-4 flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-foreground/80 hover:text-accent">Sobre Nosaltres</Link>
              <Link href="/services" className="text-sm text-foreground/80 hover:text-accent">Serveis</Link>
              <Link href="/prices" className="text-sm text-foreground/80 hover:text-accent">Preus</Link>
              <Link href="/blog" className="text-sm text-foreground/80 hover:text-accent">Blog</Link>
              <Link href="/tracking" className="text-sm text-foreground/80 hover:text-accent">Seguiment</Link>
              <Link href="/dashboard" className="text-sm text-foreground/80 hover:text-accent">Gestió</Link>
              <Link href="/request-service" className="text-sm text-foreground/80 hover:text-accent">Sol·licitar Servei</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Contacte</h3>
            <div className="mt-4 flex flex-col space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-sm text-foreground/80">Polígon Industrial Constantí, Tarragona, Espanya</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:+34977000000" className="text-sm text-foreground/80 hover:text-accent">+34 977 000 000</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:contacte@ejaglobaltrans.com" className="text-sm text-foreground/80 hover:text-accent">contacte@ejaglobaltrans.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} EJA Globaltrans. Tots els drets reservats.
          </p>
        </div>
      </div>
    </footer>
  );
}
