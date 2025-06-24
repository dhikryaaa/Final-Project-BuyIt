import { Event } from "../../entities/models/Event";
import { EventRepository } from "../../infrastructure/repositories/getEventFromDB";

export async function getAllEventsUseCase(repo: EventRepository): Promise<Event[]> {
  return await repo.getAllEvents();
}
