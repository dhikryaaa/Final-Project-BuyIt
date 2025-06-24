import { NextRequest } from "next/server";
import { createTicketHandler } from "@/app/use-cases/create-ticket";

export async function POST(req: NextRequest) {
  return createTicketHandler(req);
} 