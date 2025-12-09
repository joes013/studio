'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, Loader2, PackageX, MapPin, Calendar, Warehouse, Truck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ShippingStatus = 'En magatzem' | 'En trànsit' | 'Lliurat';

interface ShippingInfo {
  tracking_code: string;
  origen: string;
  desti: string;
  eta: string;
  status: ShippingStatus;
  ubicacio_actual: string;
}

type SearchState = 'idle' | 'loading' | 'error' | 'found';

const statusConfig: Record<ShippingStatus, { progress: number; color: string; icon: React.ReactNode }> = {
  'En magatzem': { progress: 10, color: 'bg-yellow-500', icon: <Warehouse className="h-5 w-5" /> },
  'En trànsit': { progress: 50, color: 'bg-blue-500', icon: <Truck className="h-5 w-5" /> },
  'Lliurat': { progress: 100, color: 'bg-green-500', icon: <CheckCircle2 className="h-5 w-5" /> },
};

const mockData: ShippingInfo = {
    tracking_code: 'EJA123456',
    origen: 'Polígon Industrial Constantí, Tarragona',
    desti: 'Carrer de la Indústria, 123, Barcelona',
    eta: new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString('ca-ES'),
    status: 'En trànsit',
    ubicacio_actual: 'AP-7, a l\'alçada de Vilafranca del Penedès',
};


export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;

    setSearchState('loading');
    setError(null);
    setShippingInfo(null);
    
    // Simula una petita espera per millorar l'experiència d'usuari
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Dades de prova
    if (trackingCode.toUpperCase() === 'EJA123456') {
        setShippingInfo(mockData);
        setSearchState('found');
        return;
    }

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/yla6vr6ie4rsn/search?tracking_code=${trackingCode}`);
      
      const data: ShippingInfo[] = await response.json();

      if (response.ok && data.length > 0) {
        setShippingInfo(data[0]);
        setSearchState('found');
      } else {
        setError(`El codi de seguiment '${trackingCode}' no s'ha trobat.`);
        setSearchState('error');
      }
    } catch (err) {
      setError('Hi ha hagut un problema amb la connexió. Si us plau, intenta-ho de nou més tard.');
      setSearchState('error');
    }
  };

  const currentStatusInfo = shippingInfo ? statusConfig[shippingInfo.status] : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Localitza el teu enviament</CardTitle>
          <CardDescription>Introdueix el codi de seguiment per veure l'estat en temps real.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Ex: EJA123456"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="text-base h-12"
              aria-label="Codi de seguiment"
            />
            <Button type="submit" size="lg" disabled={searchState === 'loading' || !trackingCode} className="h-12">
              {searchState === 'loading' ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <Search className="mr-2" />
              )}
              Cercar
            </Button>
          </form>

          <div className="mt-8 border-t pt-8 min-h-[250px] flex items-center justify-center bg-primary/5 rounded-b-lg">
            {searchState === 'loading' && (
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
                <p className="mt-4 text-lg font-medium">Buscant...</p>
              </div>
            )}
            {searchState === 'idle' && (
                <p className="text-foreground/70">Introdueix un codi per començar el seguiment.</p>
            )}
            {searchState === 'error' && error && (
                <Alert variant="destructive" className="max-w-md">
                    <PackageX className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {searchState === 'found' && shippingInfo && currentStatusInfo && (
              <div className="w-full p-2 sm:p-6">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        {currentStatusInfo.icon}
                        <h3 className="text-xl sm:text-2xl font-bold font-headline">Estat: {shippingInfo.status}</h3>
                    </div>
                  <Progress value={currentStatusInfo.progress} className={cn("h-3")} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Origen</p>
                                <p className="text-foreground/80">{shippingInfo.origen}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="text-accent mt-1" />
                            <div>
                                <p className="font-semibold text-accent">Destí</p>
                                <p className="text-foreground/80">{shippingInfo.desti}</p>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-primary">Data prevista (ETA)</p>
                                <p className="text-foreground/80">{shippingInfo.eta}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Truck className="text-accent mt-1" />
                            <div>
                                <p className="font-semibold text-accent">Ubicació Actual</p>
                                <p className="text-foreground/80">{shippingInfo.ubicacio_actual}</p>
                            </div>
                        </div>
                    </div>
                </div>

              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
