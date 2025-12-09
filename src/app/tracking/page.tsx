'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle, Warehouse, Truck, CheckCircle2, ShieldCheck, MapPin, Calendar, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Interfície de dades que esperem de l'API de SheetDB
interface ShippingInfo {
  code: string; // Columna 'code' segons les instruccions
  client: string;
  origin: string;
  destination: string;
  status: 'En magatzem' | 'En trànsit' | 'Duanes' | 'Lliurat';
  location: string;
  eta: string;
}

type SearchState = 'idle' | 'loading' | 'error' | 'found' | 'not_found';

// Configuració dels estats per a la barra de progrés i la línia de temps
const statusConfig = {
  'En magatzem': { progress: 10, color: 'bg-yellow-500' },
  'En trànsit': { progress: 50, color: 'bg-blue-500' },
  'Duanes': { progress: 75, color: 'bg-orange-500' },
  'Lliurat': { progress: 100, color: 'bg-green-500' },
};
const statusOrder: ShippingInfo['status'][] = ['En magatzem', 'En trànsit', 'Duanes', 'Lliurat'];

export default function TrackingPage() {
  const [code, setCode] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;

    // Reset i estat de càrrega
    setSearchState('loading');
    setShippingInfo(null);
    setErrorMessage('');

    // Depuració: Log del codi cercat
    console.log("Cercant codi:", code);

    try {
      const apiUrl = `https://sheetdb.io/api/v1/yla6vr6ie4rsn/search?code=${code}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Error de xarxa o de servidor.');
      }

      const data: ShippingInfo[] = await response.json();
      
      // Depuració: Log de les dades rebudes
      console.log("Dades rebudes:", data);

      if (data.length > 0) {
        setShippingInfo(data[0]);
        setSearchState('found');
      } else {
        setSearchState('not_found');
      }
    } catch (error) {
      setErrorMessage('Error connectant amb el servidor. Si us plau, intenta-ho de nou més tard.');
      setSearchState('error');
      console.error("Fetch error:", error);
    }
  };

  const renderTimelineNode = (status: ShippingInfo['status'], icon: React.ReactNode, index: number) => {
    if (!shippingInfo) return null;
    const currentStatusIndex = statusOrder.indexOf(shippingInfo.status);
    const isActive = currentStatusIndex >= index;
    const isCurrent = currentStatusIndex === index;

    return (
      <div className={`flex flex-col items-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${isCurrent ? 'bg-primary text-primary-foreground border-primary' : 'bg-background'}`}>
          {icon}
        </div>
        <span className={`mt-2 text-xs text-center ${isCurrent ? 'font-bold' : ''}`}>{status}</span>
      </div>
    );
  };
  
  const renderContent = () => {
    switch (searchState) {
      case 'loading':
        return (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        );
      case 'not_found':
        return (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No s'ha trobat</AlertTitle>
            <AlertDescription>No hem trobat cap enviament amb aquest codi.</AlertDescription>
          </Alert>
        );
      case 'error':
        return (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        );
      case 'found':
        if (!shippingInfo) return null;
        const currentStatus = statusConfig[shippingInfo.status];
        return (
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>Enviament: {shippingInfo.code}</span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${currentStatus.color} text-white`}>{shippingInfo.status}</span>
              </CardTitle>
              <CardDescription>Informació detallada del teu enviament.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Progrés</h3>
                  <Progress value={currentStatus.progress} className={`h-2 ${currentStatus.color}`} />
                  <div className="grid grid-cols-4 gap-2 relative items-start">
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-border -z-10"/>
                    {renderTimelineNode('En magatzem', <Warehouse className="h-5 w-5" />, 0)}
                    {renderTimelineNode('En trànsit', <Truck className="h-5 w-5" />, 1)}
                    {renderTimelineNode('Duanes', <ShieldCheck className="h-5 w-5" />, 2)}
                    {renderTimelineNode('Lliurat', <CheckCircle2 className="h-5 w-5" />, 3)}
                  </div>
              </div>

              <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Client</p>
                  <p className="font-semibold text-base">{shippingInfo.client}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Ubicació Actual</p>
                  <p className="font-semibold text-base">{shippingInfo.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Data Prevista (ETA)</p>
                  <p className="font-semibold text-base">{shippingInfo.eta}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground">Origen</p>
                  <p className="font-semibold">{shippingInfo.origin}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground">Destí</p>
                  <p className="font-semibold">{shippingInfo.destination}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'idle':
      default:
        return null; // No mostrar res si no s'ha iniciat la cerca
    }
  };

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
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: EJA123456"
            className="flex-grow text-base"
            disabled={searchState === 'loading'}
          />
          <Button type="submit" size="lg" disabled={searchState === 'loading' || !code}>
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
        {renderContent()}
      </div>
    </div>
  );
}
