import { NextRequest, NextResponse } from "next/server";

import { MyTicketStatus } from "../../../src/entities/valueObject/MyTicketStatus";
import { createClient } from "../../../supabase/server";
import { bookTicket } from "../../../src/infrastructure/repositories/addMyTicketToDB";

export interface BookTicketInput {
  eventId: number;
  userId: string;
  types: "Regular" | "VIP" | "VVIP";
  quantity: number;
  ticketId: number;
  status: MyTicketStatus;
  purchasedDate: Date;
  totalPrice: number;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const input = {
    ...body,
    userId: user.id,
  };

  try {
    const result = await bookTicket(input);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 