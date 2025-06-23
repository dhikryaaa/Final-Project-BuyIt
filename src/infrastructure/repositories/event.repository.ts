import { Event } from "@/entities/models/Event";
import { createClient } from "../../../supabase/client";

const supabase = createClient();

export async function CreateEvent(event: Event) {
    const { data, error } = await supabase
        .from('event')
        .insert({
            name: event.name,
            location: event.location,
            date: event.date,
            time: event.time,
            types: event.types,
            capacity: event.capacity,
            description: event.description
        })
        .select()

    if (error) throw new Error(`Error creating event: ${error.message}`);

    return data?.[0];
}