'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceRequest } from '@/lib/service-requests';
import { Loader2 } from 'lucide-react';

interface User {
    nom: string;
    empresa: string;
}

interface QuoteRequest extends ServiceRequest {
    // SheetDB might return strings for numbers/dates
    createdAt: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // This effect runs only on the client side
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);

            // Fetch quote requests for the user's company
            const fetchQuotes = async () => {
                try {
                    const response = await fetch(`https://sheetdb.io/api/v1/yla6vr6ie4rsn/search?empresa=${encodeURIComponent(parsedUser.empresa)}&sheet=solicituds`);
                    if (!response.ok) {
                        throw new Error('No s\'ha pogut obtenir les sol·licituds.');
                    }
                    const data: QuoteRequest[] = await response.json();
                    // Sort by date descending
                    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setQuoteRequests(data);
                } catch (err: any) {
                    setError(err.message || 'Ha ocorregut un error en carregar les dades.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchQuotes();
        } else {
            // No user logged in
            setIsLoading(false);
        }
    }, []);
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 text-center">
                <h1 className="text-3xl font-bold">Accés denegat</h1>
                <p className="mt-4">Si us plau, inicia sessió per veure el teu panell de gestió.</p>
            </div>
        );
    }
    
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Pendent': return 'secondary';
            case 'Acceptada': return 'default';
            case 'En progrés': return 'outline';
            case 'Completada': return 'default';
            case 'Cancel·lada': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Gestió de Sol·licituds</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
                    Benvingut, {user.nom}. Aquí pots veure l'estat de totes les sol·licituds de {user.empresa}.
                </p>
            </div>

            <div className="mt-16">
                <Card>
                    <CardHeader>
                        <CardTitle>Sol·licituds de {user.empresa}</CardTitle>
                        <CardDescription>Llistat de totes les sol·licituds de servei realitzades.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && <p className="text-destructive text-center py-8">{error}</p>}

                        {!error && quoteRequests.length > 0 && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Origen</TableHead>
                                        <TableHead>Destí</TableHead>
                                        <TableHead>Descripció</TableHead>
                                        <TableHead className="text-right">Estat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quoteRequests.map((request, index) => (
                                        <TableRow key={`${request.customerName}-${index}`}>
                                            <TableCell>{new Date(request.createdAt).toLocaleDateString('ca-ES')}</TableCell>
                                            <TableCell>{request.customerName}</TableCell>
                                            <TableCell>{request.pickupLocation}</TableCell>
                                            <TableCell>{request.deliveryLocation}</TableCell>
                                            <TableCell>{request.itemDescription}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {!error && !isLoading && quoteRequests.length === 0 && (
                            <div className="text-center py-12 text-foreground/70">
                                <p>No s'han trobat sol·licituds per a {user.empresa}.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
