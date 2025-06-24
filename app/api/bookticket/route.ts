import { NextRequest, NextResponse } from "next/server";
import { bookTicketUseCase } from "@/app/use-cases/book-ticket";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // userId sebaiknya diambil dari session/auth, ini contoh saja
    const userId = body.userId; // Ganti dengan userId dari session jika sudah ada auth
    const { eventId, types, quantity } = body;

    const ticket = await bookTicketUseCase({
      eventId,
      userId,
      types,
      quantity,
    });

    return NextResponse.json({ success: true, data: ticket }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
} 