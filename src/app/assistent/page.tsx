'use client';

import {useState, FormEvent} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Loader2, Sparkles} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

export default function AssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: prompt}),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || 'Hi ha hagut un problema amb la petició.'
        );
      }

      const data = await res.json();
      setResponse(data.reply);
    } catch (err: any) {
      setError(
        err.message || 'No s\'ha pogut obtenir una resposta. Intenta-ho de nou.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">
          Assistent d'IA
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Fes una pregunta al nostre assistent virtual.
        </p>
      </div>

      <Card className="w-full">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Escriu la teva pregunta aquí... Ex: Quins serveis oferiu per a transport internacional?"
              rows={4}
              className="w-full text-base"
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processant...
                </>
              ) : (
                'Enviar Pregunta'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <Sparkles className="h-6 w-6 text-accent" />
              Resposta de l'Assistent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-foreground/90">
              <p>{response}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
