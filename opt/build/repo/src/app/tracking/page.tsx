'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle, Warehouse, Truck, CheckCircle2, ShieldCheck, MapPin, Calendar, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ShippingInfo {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  status: 'En magatzem' | 'EN TRANSIT' | 'DUANES' | 'LLIURAT';
  location: string;
  eta: string;
}

// Mock data
const mockShippingData: { [key: string]: ShippingInfo } = {
  'EJA123456': {
    tracking_code: 'EJA123456',
    client: 'Client de Prova A',
    origin: 'Polígon Constantí, Tarragona',
    destination: 'Zona Franca, Barcelona',
    status: 'EN TRANSIT',
    location: 'AP-7, prop de Vilafranca del Penedès',
    eta: '2024-10-26',
  },
  'EJA654321': {
    tracking_code: 'EJA654321',
    client: 'Client de Prova B',
    origin: 'Polígon Riu Clar, Tarragona',
    destination: 'Polígono Plaza, Saragossa',
    status: 'LLIURAT',
    location: 'Polígono Plaza, Saragossa',
    eta: '2024-10-24',
  },
};

type SearchState = 'idle' | 'loading' | 'error' | 'found' | 'not_found';

type StatusKey = 'En magatzem' | 'EN TRANSIT' | 'DUANES' | 'LLIURAT';

const statusConfig: Record<StatusKey, { progress: number; color: string; icon: React.ReactNode }> = {
  'En magatzem': { progress: 10, color: 'bg-yellow-500', icon: <Warehouse className="h-5 w-5" /> },
  'EN TRANSIT': { progress: 50, color: 'bg-blue-500', icon: <Truck className="h-5 w-5" /> },
  'DUANES': { progress: 75, color: 'bg-orange-500', icon: <ShieldCheck className="h-5 w-5" /> },
  'LLIURAT': { progress: 100, color: 'bg-green-500', icon: <CheckCircle2 className="h-5 w-5" /> },
};
const statusOrder: StatusKey[] = ['En magatzem', 'EN TRANSIT', 'DUANES', 'LLIURAT'];

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [searchState, setSearchState] = useState<SearchState>('idle');

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!trackingCode.trim()) return;

    setSearchState('loading');
    setShippingInfo(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const code = trackingCode.trim().toUpperCase();
    const data = mockShippingData[code];
    
    if (data) {
      setShippingInfo(data);
      setSearchState('found');
    } else {
      setSearchState('not_found');
    }
  };

  const renderTimelineNode = (status: StatusKey, index: number) => {
    if (!shippingInfo) return null;
    
    const receivedStatus = shippingInfo.status?.toUpperCase().trim() as StatusKey | undefined;
    const currentStatusKey = receivedStatus && statusOrder.includes(receivedStatus) ? receivedStatus : null;
    const currentStatusIndex = currentStatusKey ? statusOrder.indexOf(currentStatusKey) : -1;
    
    const isActive = currentStatusIndex >= index;
    const isCurrent = currentStatusIndex === index;

    return (
      <div key={status} className={`flex flex-col items-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${isCurrent ? 'bg-primary text-primary-foreground border-primary' : 'bg-background'}`}>
          {statusConfig[status].icon}
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
            <AlertDescription>No hem trobat cap enviament amb el codi de prova. Prova amb 'EJA123456' o 'EJA654321'.</AlertDescription>
          </Alert>
        );
      case 'found':
        if (!shippingInfo) return null;
        
        const receivedStatus = shippingInfo.status?.toUpperCase().trim() as StatusKey | undefined;
        const currentStatusKey : StatusKey | undefined = receivedStatus && statusOrder.includes(receivedStatus) ? receivedStatus : undefined;
        const currentStatus = currentStatusKey ? statusConfig[currentStatusKey] : null;
        
        return (
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>Enviament: {shippingInfo.tracking_code}</span>
                {currentStatus ? (
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${currentStatus.color} text-white`}>{shippingInfo.status}</span>
                ) : (
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-400 text-white">{shippingInfo.status || 'Desconegut'}</span>
                )}
              </CardTitle>
              <CardDescription>Informació detallada del teu enviament.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Progrés</h3>
                  {currentStatus && <Progress value={currentStatus.progress} className={`h-2 ${currentStatus.color}`} />}
                  <div className="grid grid-cols-4 gap-2 relative items-start pt-2">
                    <div className="absolute top-7 left-0 w-full h-0.5 bg-border -z-10"/>
                    {statusOrder.map((status, index) => renderTimelineNode(status, index))}
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
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Localitza el teu enviament</h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
          Introdueix un codi de seguiment de prova per veure l'estat de la teva mercaderia. Prova amb 'EJA123456'.
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
        {renderContent()}
      </div>
    </div>
  );
}
