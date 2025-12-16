'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto bg-primary/10 p-3 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-primary"/>
          </div>
          <CardTitle className="text-3xl font-headline">Assistent d'IA</CardTitle>
          <CardDescription>
            Fes una pregunta al nostre assistent virtual sobre logística, transport o els nostres serveis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Com puc optimitzar els costos d'enviament?"
                className="flex-grow text-base"
                disabled={isLoading}
              />
              <Button type="submit" size="lg" disabled={isLoading || !prompt.trim()}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                Preguntar
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-6">
                 <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
          )}
          
          {isLoading && (
             <div className="mt-6 text-center text-muted-foreground flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>L'assistent està pensant...</span>
            </div>
          )}

          {response && (
            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-2">Resposta de l'Assistent:</h3>
                <div className="prose prose-sm max-w-none bg-muted/50 p-4 rounded-md">
                    <p>{response}</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
