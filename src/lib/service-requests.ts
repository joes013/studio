export interface ServiceRequest {
    id: string;
    userId: string;
    customerName: string;
    customerContact: string;
    pickupLocation: string;
    deliveryLocation: string;
    itemDescription: string;
    weight: number;
    dimensions: string;
    specialInstructions?: string;
    status: 'Pendent' | 'Acceptada' | 'En progrés' | 'Completada' | 'Cancel·lada';
    createdAt: string;
}
