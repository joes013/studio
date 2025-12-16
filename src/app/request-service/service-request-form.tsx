'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase/auth/use-user';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const formSchema = z.object({
  customerName: z.string().min(2, { message: 'El nom ha de tenir almenys 2 caràcters.' }),
  customerContact: z.string().min(5, { message: 'El contacte ha de ser vàlid (telèfon o email).' }),
  pickupLocation: z.string().min(5, { message: 'L\'adreça de recollida és obligatòria.' }),
  deliveryLocation: z.string().min(5, { message: 'L\'adreça de lliurament és obligatòria.' }),
  itemDescription: z.string().min(10, { message: 'La descripció ha de ser més detallada.' }),
  weight: z.coerce.number().positive({ message: 'El pes ha de ser un número positiu.' }),
  dimensions: z.string().regex(/^\d+[xX]\d+[xX]\d+$/, { message: 'El format ha de ser llargada x amplada x alçada (ex: 100x50x30).' }),
  specialInstructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ServiceRequestForm() {
  const { toast } = useToast();
  const { user } = useUser();
  const getFirestore = useFirestore; // Keep the hook function itself

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerContact: '',
      pickupLocation: '',
      deliveryLocation: '',
      itemDescription: '',
      weight: undefined,
      dimensions: '',
      specialInstructions: '',
    },
  });


  async function onSubmit(values: FormValues) {
    // Send to Formspree
    try {
        const response = await fetch('https://formspree.io/f/movgwnzj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            throw new Error('Formspree submission failed');
        }
    } catch(formspreeError) {
        console.error("Error submitting to Formspree: ", formspreeError);
        toast({
            variant: 'destructive',
            title: 'Error en l\'enviament',
            description: 'No s\'ha pogut enviar la sol·licitud a través de Formspree.',
        });
        return; // Stop if formspree fails
    }

    // Save to Firestore if user is logged in
    if (user) {
      try {
          const firestore = getFirestore(); // Get the instance only when needed
          const quoteRequestData = {
              ...values,
              userId: user.uid,
              status: 'Pendent',
              createdAt: serverTimestamp(),
          };

          const collectionRef = collection(firestore, 'users', user.uid, 'quoteRequests');
          await addDoc(collectionRef, quoteRequestData);

          toast({
              title: 'Sol·licitud Enviada!',
              description: 'Hem rebut la teva sol·licitud. Pots veure el seu estat al teu panell de gestió.',
              variant: 'default',
          });
          form.reset();
      } catch (error) {
          console.error("Error saving service request: ", error);
          toast({
              variant: 'destructive',
              title: 'Error en desar',
              description: 'S\'ha enviat el correu, però no s\'ha pogut desar la sol·licitud al teu panell. Si us plau, contacta\'ns.',
          });
      }
    } else {
        // If no user, just show success for Formspree
        toast({
            title: 'Sol·licitud Enviada!',
            description: 'Hem rebut la teva sol·licitud. Ens posarem en contacte amb tu aviat.',
            variant: 'default',
        });
        form.reset();
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="customerName" render={({ field }) => (
            <FormItem>
              <FormLabel>Nom del client</FormLabel>
              <FormControl><Input placeholder="Ex: Joan Petit" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="customerContact" render={({ field }) => (
            <FormItem>
              <FormLabel>Contacte (Telèfon o Email)</FormLabel>
              <FormControl><Input placeholder="Ex: 600123456 o joan@exemple.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="pickupLocation" render={({ field }) => (
            <FormItem>
              <FormLabel>Adreça de recollida</FormLabel>
              <FormControl><Input placeholder="Carrer, número, ciutat, codi postal" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="deliveryLocation" render={({ field }) => (
            <FormItem>
              <FormLabel>Adreça de lliurament</FormLabel>
              <FormControl><Input placeholder="Carrer, número, ciutat, codi postal" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="itemDescription" render={({ field }) => (
          <FormItem>
            <FormLabel>Descripció de la mercaderia</FormLabel>
            <FormControl><Textarea placeholder="Descriu el contingut, tipus d'embalatge, etc." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="weight" render={({ field }) => (
            <FormItem>
              <FormLabel>Pes (kg)</FormLabel>
              <FormControl><Input type="number" placeholder="Ex: 50" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="dimensions" render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions (cm)</FormLabel>
              <FormControl><Input placeholder="Llargada x Amplada x Alçada (ex: 100x50x30)" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="specialInstructions" render={({ field }) => (
          <FormItem>
            <FormLabel>Instruccions especials (opcional)</FormLabel>
            <FormControl><Textarea placeholder="Ex: mercaderia fràgil, lliurar en horari de matí..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <div className="flex justify-end pt-4 border-t">
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Sol·licitud
            </Button>
        </div>
      </form>
    </Form>
  );
}

    