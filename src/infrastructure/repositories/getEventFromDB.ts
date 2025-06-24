import { createClient } from "../../../supabase/client";
import { Event } from "../../entities/models/Event";

const supabase = createClient();

export interface EventRepository {
  getAllEvents(): Promise<Event[]>;
}

export const eventRepository: EventRepository = {
  async getAllEvents() {
    const { data, error } = await supabase.from("event").select("*");

    if (error) {
      throw new Error("Failed to fetch events: " + error.message);
    }

    return data as Event[];
  },
};
