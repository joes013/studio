'use client';

import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const { user, isLoading, signInWithGoogle } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Inici de Sessió</CardTitle>
                    <CardDescription>Accedeix al teu panell de gestió de sol·licituds.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <Button onClick={signInWithGoogle} className="w-full" size="lg">
                            Iniciar sessió amb Google
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
