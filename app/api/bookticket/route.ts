import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../supabase/server";
import { bookTicket } from "../../../src/infrastructure/repositories/addMyTicketToDB";

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