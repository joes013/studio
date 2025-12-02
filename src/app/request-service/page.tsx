import { ServiceRequestForm } from './service-request-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function RequestServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-3">
            Sol·licitud de Servei de Transport
          </CardTitle>
          <CardDescription>
            Omple el formulari per sol·licitar un nou servei. Ens posarem en contacte amb tu el més aviat possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}
