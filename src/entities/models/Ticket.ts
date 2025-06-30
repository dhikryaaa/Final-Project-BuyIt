import { TicketType } from "../valueObject/TicketType";

export interface Ticket {
    id: number;
    eventId: number;
    types: TicketType
    price: number;
    quantity: number;
}

export function createTicket(input: Ticket): Ticket {
    return {
        id: input.id,
        eventId: input.eventId,
        types: input.types,
        price: input.price,
        quantity: input.quantity
    }
}

export function isQuotaAvailable(ticket: Ticket, quantity: number): boolean {
    if (ticket.quantity < quantity) {
        return false;
    }
    return true;
}

export function isUserPurchaseMaxTicket(currentPurchased: number, quantity: number): boolean {
    if (currentPurchased + quantity <= 5) {
        return true;
    }
    return false;
}

export function isTicketActive(nowDate: Date, eventDate: Date): boolean {
    if (nowDate > eventDate) {
        return false;
    }
    return true;
}

export function isTicketTypesValid(types: string): boolean {
    const validTypes = ["Regular", "VIP", "VVIP"];
    if (validTypes.includes(types)) {
        return true;
    }
    return false;
}