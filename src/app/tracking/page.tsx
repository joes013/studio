'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle, Warehouse, Truck, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ShippingInfo {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  status: 'En magatzem' | 'En trànsit' | 'Lliurat';
  location: string;
  eta: string;
}

type SearchState = 'idle' | 'loading' | 'error' | 'found';

const statusConfig = {
  'En magatzem': { progress: 10, color: 'bg-yellow-500' },
  'En trànsit': { progress: 50, color: 'bg-blue-500' },
  'Lliurat': { progress: 100, color: 'bg-green-500' },
};

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!trackingCode.trim()) return;

    setSearchState('loading');
    setShippingInfo(null);
    setErrorMessage('');

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/yla6vr6ie4rsn/search?tracking_code=${trackingCode}`);
      
      if (!response.ok) {
        throw new Error('No s\'ha pogut connectar amb el servidor de seguiment.');
      }

      const data: ShippingInfo[] = await response.json();

      if (data.length > 0) {
        setShippingInfo(data[0]);
        setSearchState('found');
      } else {
        setErrorMessage('Codi no trobat. Si us plau, verifica el codi i torna a intentar-ho.');
        setSearchState('error');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ha ocorregut un error inesperat.');
      setSearchState('error');
    }
  };
  
  const currentStatusConfig = shippingInfo ? statusConfig[shippingInfo.status] : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Localitza el teu enviament</h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
          Introdueix el teu codi de seguiment per veure l'estat actual de la teva mercaderia.
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <Input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Ex: EJA123456"
            className="flex-grow text-base"
            disabled={searchState === 'loading'}
          />
          <Button type="submit" size="lg" disabled={searchState === 'loading' || !trackingCode}>
            {searchState === 'loading' ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Search className="mr-2 h-5 w-5" />
            )}
            Cercar
          </Button>
        </form>
      </div>

      <div className="mt-12">
        {searchState === 'loading' && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {searchState === 'error' && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error en la cerca</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {searchState === 'found' && shippingInfo && (
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Resultats per: {shippingInfo.tracking_code}</span>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{shippingInfo.status}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Progrés de l'enviament</h3>
                <Progress value={currentStatusConfig?.progress} className={`h-3 ${currentStatusConfig?.color}`} />
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div className={`flex flex-col items-center ${shippingInfo.status === 'En magatzem' || shippingInfo.status === 'En trànsit' || shippingInfo.status === 'Lliurat' ? 'text-primary' : 'text-muted-foreground'}`}>
                    <Warehouse className="h-6 w-6 mb-1" />
                    <span>En magatzem</span>
                  </div>
                   <div className={`flex flex-col items-center ${shippingInfo.status === 'En trànsit' || shippingInfo.status === 'Lliurat' ? 'text-primary' : 'text-muted-foreground'}`}>
                    <Truck className="h-6 w-6 mb-1" />
                    <span>En trànsit</span>
                  </div>
                   <div className={`flex flex-col items-center ${shippingInfo.status === 'Lliurat' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle2 className="h-6 w-6 mb-1" />
                    <span>Lliurat</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Origen</p>
                  <p className="font-semibold">{shippingInfo.origin}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Destí</p>
                  <p className="font-semibold">{shippingInfo.destination}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Ubicació Actual</p>
                  <p className="font-semibold">{shippingInfo.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Data Prevista (ETA)</p>
                  <p className="font-semibold">{shippingInfo.eta}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
