export interface EventRepository {
    getAllEvents(): Promise<Event[]>;
}
