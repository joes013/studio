'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // If user is already logged in, redirect to dashboard
        if (localStorage.getItem('user')) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        if (!username || !password) {
            setError('Usuari i contrasenya són obligatoris.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://sheetdb.io/api/v1/yla6vr6ie4rsn/search?usuari=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&sheet=usuaris`);

            if (!response.ok) {
                throw new Error('Error en la connexió amb el servidor.');
            }

            const data = await response.json();

            if (data.length > 0) {
                const user = data[0];
                // Save user info to localStorage
                localStorage.setItem('user', JSON.stringify({
                    nom: user.nom,
                    empresa: user.empresa,
                }));
                router.push('/dashboard');
            } else {
                setError('Dades incorrectes. Si us plau, verifica les teves credencials.');
            }
        } catch (err) {
            setError('Ha ocorregut un error. Si us plau, intenta-ho de nou més tard.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Inici de Sessió</CardTitle>
                    <CardDescription>Accedeix al teu panell de gestió.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuari</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="El teu nom d'usuari"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contrasenya</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="La teva contrasenya"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error d'accés</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
