import { eventRepository } from '../../src/infrastructure/repositories/getEventFromDB';
import { Event } from '../../src/entities/models/Event';
import { EventType } from '../../src/entities/valueObject/EventType';
import { Ticket } from '../../src/entities/models/Ticket';
import { TicketType } from '../../src/entities/valueObject/TicketType';

jest.mock('../../supabase/client', () => ({
  createClient: jest.fn(),
}));

import { createClient } from '../../supabase/client';

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

// Define the extended Event type that includes tickets
interface EventWithTickets extends Event {
  tickets: Ticket[];
}

type MockSupabaseClient = {
  from: jest.Mock;
  select: jest.Mock;
};

describe('eventRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEvents', () => {
    it('should return events with tickets when Supabase query is successful', async () => {
      const mockEvents: EventWithTickets[] = [
        {
          id: 1,
          name: 'Test Event 1',
          location: 'Test Location 1',
          date: new Date('2024-01-01'),
          time: '19:00',
          types: 'Concert' as EventType,
          capacity: 100,
          description: 'Test description 1',
          tickets: [
            {
              id: 1,
              eventId: 1,
              types: 'Regular' as TicketType,
              price: 100000,
              quantity: 50
            },
            {
              id: 2,
              eventId: 1,
              types: 'VIP' as TicketType,
              price: 200000,
              quantity: 20
            }
          ]
        },
        {
          id: 2,
          name: 'Test Event 2',
          location: 'Test Location 2',
          date: new Date('2024-01-02'),
          time: '20:00',
          types: 'Seminar' as EventType,
          capacity: 200,
          description: 'Test description 2',
          tickets: [
            {
              id: 3,
              eventId: 2,
              types: 'Regular' as TicketType,
              price: 50000,
              quantity: 100
            }
          ]
        }
      ];

      const mockSupabaseClient: MockSupabaseClient = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({
          data: mockEvents,
          error: null
        })
      };

      mockCreateClient.mockReturnValue(mockSupabaseClient as unknown as ReturnType<typeof createClient>);

      const result = await eventRepository.getAllEvents();

      expect(mockCreateClient).toHaveBeenCalledTimes(1);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('event');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith(`
        *,
        tickets:ticket (
          id,
          types,
          price,
          quantity
        )
      `);
      expect(result).toEqual(mockEvents);
      expect(result[0].tickets).toHaveLength(2);
      expect(result[1].tickets).toHaveLength(1);
    });

    it('should return empty array when no events are found', async () => {
      const mockSupabaseClient: MockSupabaseClient = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({
          data: [],
          error: null
        })
      };

      mockCreateClient.mockReturnValue(mockSupabaseClient as unknown as ReturnType<typeof createClient>);

      const result = await eventRepository.getAllEvents();

      expect(mockCreateClient).toHaveBeenCalledTimes(1);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('event');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith(`
        *,
        tickets:ticket (
          id,
          types,
          price,
          quantity
        )
      `);
      expect(result).toEqual([]);
    });

    it('should handle events with different EventType values and their tickets', async () => {
      const mockEvents: EventWithTickets[] = [
        {
          id: 1,
          name: 'Concert Event',
          location: 'Music Hall',
          date: new Date('2024-01-01'),
          time: '19:00',
          types: 'Concert' as EventType,
          capacity: 100,
          description: 'A great concert',
          tickets: [
            {
              id: 1,
              eventId: 1,
              types: 'Regular' as TicketType,
              price: 150000,
              quantity: 80
            }
          ]
        },
        {
          id: 2,
          name: 'Seminar Event',
          location: 'Conference Room',
          date: new Date('2024-01-02'),
          time: '20:00',
          types: 'Seminar' as EventType,
          capacity: 200,
          description: 'An informative seminar',
          tickets: [
            {
              id: 2,
              eventId: 2,
              types: 'Regular' as TicketType,
              price: 75000,
              quantity: 150
            }
          ]
        },
        {
          id: 3,
          name: 'Exhibition Event',
          location: 'Exhibition Center',
          date: new Date('2024-01-03'),
          time: '09:00',
          types: 'Exhibition' as EventType,
          capacity: 50,
          description: 'An interesting exhibition',
          tickets: [
            {
              id: 3,
              eventId: 3,
              types: 'Regular' as TicketType,
              price: 25000,
              quantity: 40
            }
          ]
        }
      ];

      const mockSupabaseClient: MockSupabaseClient = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({
          data: mockEvents,
          error: null
        })
      };

      mockCreateClient.mockReturnValue(mockSupabaseClient as unknown as ReturnType<typeof createClient>);

      const result = await eventRepository.getAllEvents();

      expect(result).toHaveLength(3);
      expect(result[0].types).toBe('Concert');
      expect(result[1].types).toBe('Seminar');
      expect(result[2].types).toBe('Exhibition');
      expect(result[0].tickets[0].price).toBe(150000);
      expect(result[1].tickets[0].price).toBe(75000);
      expect(result[2].tickets[0].price).toBe(25000);
    });

    it('should throw error when Supabase returns an error', async () => {
      const mockSupabaseClient: MockSupabaseClient = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database connection failed' }
        })
      };

      mockCreateClient.mockReturnValue(mockSupabaseClient as unknown as ReturnType<typeof createClient>);

      await expect(eventRepository.getAllEvents()).rejects.toThrow('Failed to fetch events: Database connection failed');
    });
  });
}); 