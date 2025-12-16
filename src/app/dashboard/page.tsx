'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 text-center">
            <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">
                Benvingut a la teva zona privada, {user.nom}
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
                Aquí podràs gestionar els teus serveis i sol·licituds.
            </p>
            <div className="mt-8">
                <Button onClick={handleLogout} size="lg">
                    Sortir
                </Button>
            </div>
        </div>
    );
}
