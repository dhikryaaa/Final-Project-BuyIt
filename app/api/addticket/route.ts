import { NextRequest } from "next/server";
import { createTicketHandler } from "../../../src/app/use-cases/create-ticket";

export async function POST(req: NextRequest) {
  return createTicketHandler(req);
} 