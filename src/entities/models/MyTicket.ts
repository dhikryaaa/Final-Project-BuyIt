import { MyTicketStatus } from "../valueObject/MyTicketStatus";

export interface MyTicket{
    id: number;
    eventId: number;
    ticketId: number;
    types: string;
    quantity: number;
    totalPrice: number;
    purchaseDate: Date;
    status: MyTicketStatus;
    userId: string;
}

export function createMyTicket(input: MyTicket): MyTicket {
    return {
        id: input.id,
        eventId: input.eventId,
        ticketId: input.ticketId,
        types: input.types,
        quantity: input.quantity,
        totalPrice: input.totalPrice,
        purchaseDate: input.purchaseDate,
        status: input.status,
        userId: input.userId
    }
}