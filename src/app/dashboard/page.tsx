'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, Truck, FileText, BookMarked } from 'lucide-react';

interface User {
    nom: string;
    empresa: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This effect runs only on the client side
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                // If parsing fails, clear the invalid item and redirect
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }
        } else {
            // No user in localStorage, redirect to login
            router.push('/login');
            return;
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };
    
    if (isLoading || !user) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">
                    Benvingut, {user.nom}
                </h1>
                <p className="mt-4 text-lg text-foreground/80">
                    Aquesta és la teva zona privada. Des d'aquí pots gestionar els teus serveis, documents i seguiments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookMarked /> Gestió de Comandes
                        </CardTitle>
                        <CardDescription>
                            Crea noves sol·licituds de servei i consulta el teu històric.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                         <Button asChild className="w-full">
                            <Link href="/booking">
                                Anar a Comandes
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Truck /> Seguiment d'Enviaments
                        </CardTitle>
                        <CardDescription>
                            Localitza la teva mercaderia en temps real amb el teu codi de seguiment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                         <Button asChild className="w-full">
                            <Link href="/tracking">
                                Anar a Seguiment
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <FileText /> Documents
                        </CardTitle>
                        <CardDescription>
                            Consulta i descarrega les teves factures i altres documents importants.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                         <Button asChild className="w-full">
                            <Link href="/documents">
                                Anar a Documents
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 text-center">
                <Button onClick={handleLogout} variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Tancar Sessió
                </Button>
            </div>
        </div>
    );
}
