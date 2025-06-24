import { getMyTicketsHandler } from '../../../src/app/use-cases/get-my-tickets';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return getMyTicketsHandler(req);
} 