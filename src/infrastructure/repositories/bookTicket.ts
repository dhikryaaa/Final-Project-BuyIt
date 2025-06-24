import { createClient } from "../../../supabase/client";

export interface BookTicketInput {
  eventId: number;
  userId: string;
  types: "Regular" | "VIP" | "VVIP";
  quantity: number;
}

export async function bookTicket(input: BookTicketInput) {
  const supabase = createClient();

  // 1. Cek event & tiket
  const { data: ticket, error: ticketError } = await supabase
    .from("ticket")
    .select("*")
    .eq("eventId", input.eventId)
    .eq("types", input.types)
    .single();

  if (ticketError || !ticket) {
    throw new Error("Tiket tidak ditemukan");
  }

  // 2. Cek kuota
  if (ticket.quantity < input.quantity) {
    throw new Error("Kuota tiket tidak mencukupi");
  }

  // 3. Cek pembelian user sebelumnya (max 5 per event)
  const { data: userTickets, error: userTicketsError } = await supabase
    .from("myticket")
    .select("quantity")
    .eq("eventId", input.eventId)
    .eq("userId", input.userId);

  const totalUserTickets = (userTickets || []).reduce((sum, t) => sum + (t.quantity || 0), 0);
  if (totalUserTickets + input.quantity > 5) {
    throw new Error("Maksimal pembelian 5 tiket per event");
  }

  // 4. Update kuota tiket
  const { error: updateError } = await supabase
    .from("ticket")
    .update({ quantity: ticket.quantity - input.quantity })
    .eq("id", ticket.id);

  if (updateError) {
    throw new Error("Gagal update kuota tiket");
  }

  // 5. Insert ke tabel myticket
  const { data: myTicket, error: myTicketError } = await supabase
    .from("myticket")
    .insert({
      eventId: input.eventId,
      ticketId: ticket.id,
      types: input.types,
      quantity: input.quantity,
      userId: input.userId,
      status: "active",
      purchaseDate: new Date().toISOString(),
      totalPrice: ticket.price * input.quantity,
    })
    .select()
    .single();

  if (myTicketError) {
    throw new Error("Gagal menyimpan tiket user");
  }

  return myTicket;
} 