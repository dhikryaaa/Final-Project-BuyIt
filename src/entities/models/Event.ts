import { EventType } from "../valueObject/EventType";

export interface Event {
    id: number;
    name: string;
    location: string;
    date: Date;
    time: string;
    types: EventType;
    capacity: number;
    description: string;
}

export function createEvent(input: Event): Event {
    return {
        id: input.id,
        name: input.name,
        location: input.location,
        date: input.date,
        time: input.time,
        types: input.types,
        capacity: input.capacity,
        description: input.description
    }
}