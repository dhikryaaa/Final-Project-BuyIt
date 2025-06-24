import { NextRequest, NextResponse } from "next/server";

import { MyTicketStatus } from "@/entities/valueObject/MyTicketStatus";
import { createClient } from "../../../supabase/client";
import { bookTicket } from "@/infrastructure/repositories/bookTicket";

export interface BookTicketInput {
  eventId: number;
  userId: string;
  types: "Regular" | "VIP" | "VVIP";
  quantity: number;
  ticketId: number;
  status: MyTicketStatus;
  purchaseDate: Date;
  totalPrice: number;
}

const supabase = createClient();

export async function POST(req: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Jangan ambil userId dari body, ambil dari user.id
  const input = {
    ...body,
    userId: user.id, // Ambil dari Supabase Auth
  };

  try {
    const result = await bookTicket(input);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 