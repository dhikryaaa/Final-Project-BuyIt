import { isQuotaAvailable, isUserPurchaseMaxTicket, isTicketActive } from "../../entities/models/Ticket";
import { createClient } from "../../../supabase/client";
import { BookTicketInput } from "../../infrastructure/interface/bookTicketInput";

export async function bookTicket(input: BookTicketInput) {
  const supabase = createClient();

  const { data: ticket, error: ticketError } = await supabase
    .from("ticket")
    .select("*")
    .eq("eventId", input.eventId)
    .eq("types", input.types)
    .single();

  const { data: event, error: eventError } = await supabase
    .from("event")
    .select("date")
    .eq("id", input.eventId)
    .single();

  if (ticketError || !ticket) {
    throw new Error("Tiket tidak ditemukan");
  }

  if (eventError || !event) {
    throw new Error("Event tidak ditemukan");
  }

  if (!isTicketActive(new Date(), new Date(event.date))) {
    throw new Error("Tiket sudah tidak aktif");
  }

  if (!isQuotaAvailable(ticket, input.quantity)) {
    throw new Error("Kuota tiket tidak mencukupi");
  }

  const { data: userTickets } = await supabase
    .from("myticket")
    .select("quantity")
    .eq("eventId", input.eventId)
    .eq("userId", input.userId);

  const totalUserTickets = (userTickets || []).reduce((sum, t) => sum + (t.quantity || 0), 0);

  if (!isUserPurchaseMaxTicket(totalUserTickets, input.quantity)) {
    throw new Error("Maksimal pembelian 5 tiket per event");
  }

  const { error: updateError } = await supabase
    .from("ticket")
    .update({ quantity: ticket.quantity - input.quantity })
    .eq("id", ticket.id);

  if (updateError) {
    throw new Error("Gagal update kuota tiket");
  }

  const { data: myTicket, error: myTicketError } = await supabase
    .from("myticket")
    .insert({
      eventId: input.eventId,
      ticketId: ticket.id,
      types: input.types,
      quantity: input.quantity,
      status: input.status ?? "active",
      purchasedDate: new Date().toISOString(),
      totalPrice: ticket.price * input.quantity,
      userId: input.userId,
    })
  .select()
  .single();

  if (myTicketError) {
    console.error(myTicketError);
    throw new Error("Gagal menyimpan tiket user");
  }

  return myTicket;
} 