'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nom ha de tenir almenys 2 caràcters.' }),
  email: z.string().email({ message: 'El correu electrònic no és vàlid.' }),
  message: z.string().min(10, { message: 'El missatge ha de tenir almenys 10 caràcters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch('https://formspree.io/f/movgwnzj', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: 'Missatge Enviat!',
          description: 'Gràcies per contactar amb nosaltres. Et respondrem aviat.',
          variant: 'default',
        });
        form.reset();
      } else {
        throw new Error('Error en l\'enviament del formulari.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error en l\'enviament',
        description: 'No s\'ha pogut enviar el missatge. Si us plau, intenta-ho de nou més tard.',
      });
    }
  }

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl><Input placeholder="El teu nom" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correu electrònic</FormLabel>
                      <FormControl><Input placeholder="el.teu@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Missatge</FormLabel>
                      <FormControl><Textarea placeholder="Com et podem ajudar?" rows={5} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                
                <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Enviar Missatge'
                  )}
                </Button>
              </form>
            </Form>
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
