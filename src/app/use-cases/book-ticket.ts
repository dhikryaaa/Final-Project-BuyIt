import { BookTicketInput, bookTicket } from "@/infrastructure/repositories/bookTicket";

export async function bookTicketUseCase(input: BookTicketInput) {
  return await bookTicket(input);
} 