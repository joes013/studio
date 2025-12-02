'use client';

import { useUser } from '@/firebase/auth/use-user';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceRequest } from '@/lib/service-requests';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

// Helper to avoid React strict mode issues with Firebase hooks.
function useMemoFirebase(creator: () => any, deps: any[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(creator, deps);
}

export default function DashboardPage() {
    const { user, isLoading: isUserLoading } = useUser();
    const firestore = useFirestore();

    const quoteRequestsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(
            collection(firestore, 'users', user.uid, 'quoteRequests'),
            orderBy('createdAt', 'desc')
        );
    }, [firestore, user]);

    const { data: quoteRequests, isLoading: isQuotesLoading } = useCollection<ServiceRequest>(quoteRequestsQuery);
    
    if (isUserLoading) {
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
                <p className="mt-4">Si us plau, inicia sessió per veure les teves sol·licituds.</p>
            </div>
        );
    }
    
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Pendent':
                return 'secondary';
            case 'Acceptada':
                return 'default';
            case 'En progrés':
                return 'outline';
            case 'Completada':
                return 'default';
            case 'Cancel·lada':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Gestió de Sol·licituds</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
                    Aquí pots veure l'estat de totes les teves sol·licituds de pressupost i servei.
                </p>
            </div>

            <div className="mt-16">
                <Card>
                    <CardHeader>
                        <CardTitle>Les Meves Sol·licituds</CardTitle>
                        <CardDescription>Llistat de totes les sol·licituds de servei que has realitzat.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isQuotesLoading && (
                             <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        )}
                        {!isQuotesLoading && quoteRequests && quoteRequests.length > 0 && (
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
                                    {quoteRequests.map((request) => (
                                        <TableRow key={request.id}>
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
                         {!isQuotesLoading && (!quoteRequests || quoteRequests.length === 0) && (
                            <div className="text-center py-12 text-foreground/70">
                                <p>Encara no has fet cap sol·licitud.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
