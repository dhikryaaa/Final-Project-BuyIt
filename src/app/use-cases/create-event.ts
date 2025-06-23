import { NextRequest, NextResponse } from "next/server";
import { CreateEvent } from "@/infrastructure/repositories/event.repository";

export async function createEventHandler(req: NextRequest) {
  const body = await req.json();

  try {
    const event = await CreateEvent(body);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
