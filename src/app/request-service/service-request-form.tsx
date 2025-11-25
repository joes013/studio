'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { serviceRequestFormWithAI, ServiceRequestFormOutput } from '@/ai/flows/service-request-form-ai';
import { cn } from '@/lib/utils';

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
type Suggestions = ServiceRequestFormOutput['suggestedCompletions'];

export function ServiceRequestForm() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [isAiLoading, startAiTransition] = useTransition();

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

  const handleGetSuggestions = () => {
    const payload = {
      ...form.getValues(),
      weight: Number(form.getValues('weight')) || 0,
    };

    startAiTransition(async () => {
      try {
        const result = await serviceRequestFormWithAI(payload);
        if (result?.suggestedCompletions) {
          setSuggestions(result.suggestedCompletions);
          toast({
            title: 'Suggeriments rebuts!',
            description: 'L\'IA ha generat suggeriments per al formulari.',
          });
        }
      } catch (error) {
        console.error('Error fetching AI suggestions:', error);
        toast({
            variant: 'destructive',
            title: 'Error de l\'IA',
            description: 'No s\'han pogut obtenir els suggeriments. Intenta-ho més tard.',
        });
      }
    });
  };

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: 'Sol·licitud Enviada!',
      description: 'Hem rebut la teva sol·licitud. Ens posarem en contacte aviat.',
      variant: 'default',
    });
    form.reset();
    setSuggestions(null);
  }
  
  const renderSuggestion = (field: keyof Suggestions) => {
    const suggestionValue = suggestions?.[field];
    if (!suggestionValue || String(suggestionValue) === String(form.getValues(field))) return null;

    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 h-auto py-1 px-2 text-xs"
        onClick={() => {
            form.setValue(field, suggestionValue as any, { shouldValidate: true });
        }}
      >
        <Sparkles className="mr-2 h-3 w-3 text-accent" />
        Suggeriment: {suggestionValue.toString()}
      </Button>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="customerName" render={({ field }) => (
            <FormItem>
              <FormLabel>Nom del client</FormLabel>
              <FormControl><Input placeholder="Ex: Joan Petit" {...field} /></FormControl>
              {renderSuggestion('customerName')}
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="customerContact" render={({ field }) => (
            <FormItem>
              <FormLabel>Contacte (Telèfon o Email)</FormLabel>
              <FormControl><Input placeholder="Ex: 600123456 o joan@exemple.com" {...field} /></FormControl>
              {renderSuggestion('customerContact')}
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="pickupLocation" render={({ field }) => (
            <FormItem>
              <FormLabel>Adreça de recollida</FormLabel>
              <FormControl><Input placeholder="Carrer, número, ciutat, codi postal" {...field} /></FormControl>
              {renderSuggestion('pickupLocation')}
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="deliveryLocation" render={({ field }) => (
            <FormItem>
              <FormLabel>Adreça de lliurament</FormLabel>
              <FormControl><Input placeholder="Carrer, número, ciutat, codi postal" {...field} /></FormControl>
              {renderSuggestion('deliveryLocation')}
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="itemDescription" render={({ field }) => (
          <FormItem>
            <FormLabel>Descripció de la mercaderia</FormLabel>
            <FormControl><Textarea placeholder="Descriu el contingut, tipus d'embalatge, etc." {...field} /></FormControl>
            {renderSuggestion('itemDescription')}
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="weight" render={({ field }) => (
            <FormItem>
              <FormLabel>Pes (kg)</FormLabel>
              <FormControl><Input type="number" placeholder="Ex: 50" {...field} /></FormControl>
              {renderSuggestion('weight')}
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="dimensions" render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions (cm)</FormLabel>
              <FormControl><Input placeholder="Llargada x Amplada x Alçada (ex: 100x50x30)" {...field} /></FormControl>
              {renderSuggestion('dimensions')}
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="specialInstructions" render={({ field }) => (
          <FormItem>
            <FormLabel>Instruccions especials (opcional)</FormLabel>
            <FormControl><Textarea placeholder="Ex: mercaderia fràgil, lliurar en horari de matí..." {...field} /></FormControl>
            {renderSuggestion('specialInstructions')}
            <FormMessage />
          </FormItem>
        )} />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGetSuggestions} 
              disabled={isAiLoading}
            >
              {isAiLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bot className="mr-2 h-4 w-4" />
              )}
              Obtenir Suggeriments de l'IA
            </Button>

            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Sol·licitud
            </Button>
        </div>
      </form>
    </Form>
  );
}
