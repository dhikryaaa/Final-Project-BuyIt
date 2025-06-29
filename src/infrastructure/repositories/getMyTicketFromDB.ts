import { createClient } from '../../../supabase/client';

export async function getMyTicketsByUserId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('myticket')
    .select(`
      *,
      event:eventId (
        id,
        name,
        location,
        date,
        time,
        types
      )
    `)
    .eq('userId', userId);
  if (error) throw new Error(error.message);
  return data;
} 