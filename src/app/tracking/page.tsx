'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Loader2, PackageCheck, PackageX, Truck } from 'lucide-react';

type TrackingStatus = 'idle' | 'loading' | 'found' | 'not_found';

const trackingHistory = [
  { status: 'Lliurat', location: 'Client Final, Madrid', date: '2024-05-22 13:45' },
  { status: 'En repartiment', location: 'Destí, Madrid', date: '2024-05-22 09:00' },
  { status: 'En trànsit', location: 'Centre logístic, Madrid', date: '2024-05-21 15:00' },
  { status: 'En trànsit', location: 'Centre logístic, Saragossa', date: '2024-05-21 02:30' },
  { status: 'Recollit', location: 'Magatzem Origen, Tarragona', date: '2024-05-20 10:00' },
];

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState<TrackingStatus>('idle');

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;

    setStatus('loading');
    setTimeout(() => {
      if (trackingNumber.toUpperCase() === 'EJA123456') {
        setStatus('found');
      } else {
        setStatus('not_found');
      }
    }, 1500);
  };

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-accent" />
            <p className="mt-4 text-lg font-medium">Buscant el teu enviament...</p>
          </div>
        );
      case 'found':
        return (
            <div className="p-6 w-full">
                <h3 className="text-xl font-semibold mb-6">Historial de l'enviament: <span className="font-mono text-primary">{trackingNumber.toUpperCase()}</span></h3>
                <div className="relative pl-6">
                    <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                    {trackingHistory.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 mb-8">
                            <div className={`z-10 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-background border-2 ${index === 0 ? 'border-accent text-accent' : 'border-primary text-primary'}`}>
                                <Truck size={16} />
                            </div>
                            <div>
                                <p className="font-semibold">{item.status}</p>
                                <p className="text-sm text-foreground/80">{item.location}</p>
                                <p className="text-xs text-foreground/60">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'not_found':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <PackageX className="h-12 w-12 text-destructive" />
            <p className="mt-4 text-lg font-medium">No s'ha trobat l'enviament</p>
            <p className="text-foreground/80">El número de seguiment '{trackingNumber}' no és correcte. Si us plau, comprova-ho.</p>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <PackageCheck className="h-12 w-12 text-primary" />
            <p className="mt-4 text-lg font-medium">Introdueix el teu número de seguiment</p>
            <p className="text-foreground/80">Pots provar amb el número de mostra: <code className="font-mono bg-primary/10 px-2 py-1 rounded">EJA123456</code>.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Seguiment en Temps Real</CardTitle>
          <CardDescription>Introdueix el teu número de seguiment per conèixer l'estat del teu enviament.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Ex: EJA123456"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="text-base h-12"
            />
            <Button type="submit" size="lg" disabled={status === 'loading' || !trackingNumber} className="h-12">
              {status === 'loading' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Rastrejar
            </Button>
          </form>
          <div className="mt-8 border-t pt-8 min-h-[200px] flex items-center justify-center bg-primary/5 rounded-b-lg">
            {renderStatus()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
