'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, List, Send, BookMarked, Info, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Tipus de Dades ---
interface Solicitud {
  id: string;
  data: string;
  usuari: string;
  estat: 'Pendent' | 'Aprovat' | 'Rebutjat';
  detalls: string;
}

interface User {
  nom: string;
  empresa: string;
}

// --- Zod Schema per al formulari ---
const formSchema = z.object({
  serviceType: z.string({ required_error: 'Has de seleccionar un tipus de servei.' }),
  origin: z.string().min(2, { message: "L'origen ha de tenir almenys 2 caràcters." }),
  destination: z.string().min(2, { message: 'El destí ha de tenir almenys 2 caràcters.' }),
  charge: z.string().min(1, { message: 'La descripció de la càrrega és obligatòria.' }),
});

type FormValues = z.infer<typeof formSchema>;

// --- Component ---
export default function BookingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: '',
      destination: '',
      charge: '',
    },
  });

  // --- Autenticació i Càrrega de Dades ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const fetchSolicitudes = useCallback(async (currentUser: User) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://sheetdb.io/api/v1/yla6vr6ie4rsn?sheet=solicituds');
      if (!response.ok) {
        throw new Error('Error en la connexió amb la base de dades.');
      }
      const data: Solicitud[] = await response.json();
      
      const userSolicitudes = data
        .filter(s => s.usuari?.toLowerCase() === currentUser.nom?.toLowerCase())
        .map(s => {
            let fechaCorregida = s.data;
            if (s.data && typeof s.data === 'string' && s.data.includes('/')) {
                const parts = s.data.split(' ')[0].split('/');
                if (parts.length === 3) {
                    fechaCorregida = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
                }
            }
            return { ...s, data: fechaCorregida };
        });

      setSolicitudes(userSolicitudes.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()));
    } catch (e: any) {
      setError(e.message || 'Ha ocorregut un error inesperat.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSolicitudes(user);
    }
  }, [user, fetchSolicitudes]);

  // --- Lògica d'Enviament ---
  async function onSubmit(values: FormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error d\'autenticació',
        description: 'No s\'ha pogut identificar l\'usuari. Si us plau, torna a iniciar sessió.',
      });
      return;
    }

    setIsSubmitting(true);
    const newId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const details = `Servei: ${values.serviceType} | Origen: ${values.origin} | Destí: ${values.destination} | Càrrega: ${values.charge}`;

    const newRow = {
      id: newId,
      data: today,
      usuari: user.nom,
      estat: 'Pendent',
      detalls: details,
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/yla6vr6ie4rsn?sheet=solicituds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [newRow] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No s'ha pogut desar la sol·licitud.");
      }

      toast({
        title: 'Sol·licitud Enviada!',
        description: 'La teva sol·licitud s\'ha registrat correctament.',
      });
      form.reset();
      await fetchSolicitudes(user); // Refresh the list
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'No s\'ha pogut enviar la sol·licitud.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- Renderitzat ---
  if (!user && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'aprovat':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'rebutjat':
        return 'bg-red-100 text-red-800 border-red-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24 space-y-16">
      {/* Formulari de Sol·licitud */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl font-headline">
            <BookMarked className="h-8 w-8 text-primary" />
            Gestió de Comandes
          </CardTitle>
          <CardDescription>
            Omple el següent formulari per crear una nova sol·licitud de servei.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="serviceType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipus de Servei</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecciona un servei..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Transport Terrestre (Líquids)">Transport Terrestre (Líquids)</SelectItem>
                        <SelectItem value="Transport Terrestre (Palets)">Transport Terrestre (Palets)</SelectItem>
                        <SelectItem value="Magatzem">Magatzem</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="origin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl><Input placeholder="Ciutat o port d'origen" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="destination" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destí</FormLabel>
                    <FormControl><Input placeholder="Ciutat o port de destí" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="charge" render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripció de la Càrrega</FormLabel>
                  <FormControl><Textarea placeholder="Descriu la mercaderia, pes, mides, tipus d'embalatge, etc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end pt-4 border-t">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Enviar Sol·licitud
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Llistat d'Històric */}
      <div>
        <h2 className="text-3xl font-bold font-headline mb-8 flex items-center gap-3">
          <List className="h-8 w-8 text-primary" />
          Les Meves Sol·licituds
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : solicitudes.length > 0 ? (
          <div className="space-y-6">
            {solicitudes.map((sol) => (
              <Card key={sol.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span>Sol·licitud: {sol.id}</span>
                    <Badge variant="outline" className={cn('font-bold', getStatusBadge(sol.estat))}>
                      {sol.estat}
                    </Badge>
                  </CardTitle>
                   <CardDescription>
                    Data: {new Date(sol.data).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">{sol.detalls}</p>
                </CardContent>
                {sol.estat?.toLowerCase() === 'aprovat' && (
                  <CardFooter className="border-t px-6 py-4">
                    <Button variant="secondary" size="sm" className="ml-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Descarregar Albarà
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        ) : (
           <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Sense Sol·licituds</AlertTitle>
            <AlertDescription>
                Actualment no tens cap sol·licitud registrada. Fes servir el formulari de dalt per crear-ne una de nova.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
