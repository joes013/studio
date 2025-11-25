import { ServiceRequestForm } from './service-request-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function RequestServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-3">
            Sol·licitud de Servei de Transport
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
                <Bot className="h-3.5 w-3.5" />
                Amb ajuda d'IA
            </span>
          </CardTitle>
          <CardDescription>
            Omple el formulari per sol·licitar un nou servei. La nostra IA t'ajudarà a completar els camps per accelerar el procés.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}
