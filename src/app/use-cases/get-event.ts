import { EventRepository } from "../../infrastructure/interface/eventRepository";

export async function getAllEventsUseCase(repo: EventRepository): Promise<Event[]> {
  if (!repo.getAllEvents) {
    throw new Error("Repository does not implement getAllEvents()");
  }
  return await repo.getAllEvents();
}
