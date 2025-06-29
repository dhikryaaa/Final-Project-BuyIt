import { createClient } from "../../../supabase/client";
import { EventRepository } from "../../infrastructure/interface/eventRepository";

export const eventRepository: EventRepository = {
  async getAllEvents() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("event")
      .select(`
        *,
        tickets:ticket (
          id,
          types,
          price,
          quantity
        )
      `);

    if (error) {
      throw new Error("Failed to fetch events: " + error.message);
    }

    return data as CustomEvent[];
  },
};
