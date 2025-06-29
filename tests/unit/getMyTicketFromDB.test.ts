import { getMyTicketsByUserId } from '../../src/infrastructure/repositories/getMyTicketFromDB';

jest.mock('../../supabase/client', () => ({
  createClient: jest.fn(),
}));

import { createClient } from '../../supabase/client';

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

describe('getMyTicketsByUserId', () => {
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
    };
    mockCreateClient.mockReturnValue(mockSupabaseClient);
  });

  it('should return tickets for a user when query is successful', async () => {
    const mockTickets = [
      { id: 1, userId: 'user123', eventId: 1, types: 'Regular', quantity: 2 },
      { id: 2, userId: 'user123', eventId: 2, types: 'VIP', quantity: 1 }
    ];
    mockSupabaseClient.eq.mockResolvedValueOnce({ data: mockTickets, error: null });

    const result = await getMyTicketsByUserId('user123');
    expect(mockCreateClient).toHaveBeenCalledTimes(1);
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('myticket');
    expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
    expect(mockSupabaseClient.eq).toHaveBeenCalledWith('userId', 'user123');
    expect(result).toEqual(mockTickets);
  });

  it('should throw error when Supabase returns an error', async () => {
    mockSupabaseClient.eq.mockResolvedValueOnce({ data: null, error: { message: 'DB error' } });
    await expect(getMyTicketsByUserId('user123')).rejects.toThrow('DB error');
  });
}); 