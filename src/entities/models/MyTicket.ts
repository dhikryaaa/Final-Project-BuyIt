export interface MyTicket{
    id: number;
    eventId: number;
    ticketId: number;
    types: string;
    quantity: number;
    totalPrice: number;
    purchaseDate: Date;
    status: string;
    userId: string;
}