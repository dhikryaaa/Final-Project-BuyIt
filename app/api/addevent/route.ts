import { NextRequest } from "next/server";
import { createEventHandler } from "@/app/use-cases/create-event";

export async function POST(req: NextRequest) {
  return createEventHandler(req);
}
