import { NextResponse } from "next/server";
import { getAllEventsUseCase } from "@/app/use-cases/get-event";
import { eventRepository } from "@/infrastructure/repositories/getEventFromDB";

export async function GET() {
  try {
    const events = await getAllEventsUseCase(eventRepository);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
