import { eventRepository } from '../../src/infrastructure/repositories/getEventFromDB';
import { Event } from '../../src/entities/models/Event';
import { EventType } from '../../src/entities/valueObject/EventType';

jest.mock('../../supabase/client', () => ({
  createClient: jest.fn(),
}));

import { createClient } from '../../supabase/client';

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

type MockSupabaseClient = {
  from: jest.Mock;
  select: jest.Mock;
};

describe('eventRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEvents', () => {
    it('should return events when Supabase query is successful', async () => {
      const mockEvents: Event[] = [
        {
          id: 1,
          name: 'Test Event 1',
          location: 'Test Location 1',
          date: new Date('2024-01-01'),
          time: '19:00',
          types: 'Concert' as EventType,
          capacity: 100,
          description: 'Test description 1'
        },
        {
          id: 2,
          name: 'Test Event 2',
          location: 'Test Location 2',
          date: new Date('2024-01-02'),
          time: '20:00',
          types: 'Seminar' as EventType,
          capacity: 200,
          description: 'Test description 2'
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
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
      expect(result).toEqual(mockEvents);
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
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
      expect(result).toEqual([]);
    });

    it('should handle events with different EventType values', async () => {
      const mockEvents: Event[] = [
        {
          id: 1,
          name: 'Concert Event',
          location: 'Music Hall',
          date: new Date('2024-01-01'),
          time: '19:00',
          types: 'Concert' as EventType,
          capacity: 100,
          description: 'A great concert'
        },
        {
          id: 2,
          name: 'Seminar Event',
          location: 'Conference Room',
          date: new Date('2024-01-02'),
          time: '20:00',
          types: 'Seminar' as EventType,
          capacity: 200,
          description: 'An informative seminar'
        },
        {
          id: 3,
          name: 'Exhibition Event',
          location: 'Exhibition Center',
          date: new Date('2024-01-03'),
          time: '09:00',
          types: 'Exhibition' as EventType,
          capacity: 50,
          description: 'An interesting exhibition'
        }
      ];

      const mockSupabaseClient = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({
          data: mockEvents,
          error: null
        })
      };

      mockCreateClient.mockReturnValue(mockSupabaseClient as any);

      const result = await eventRepository.getAllEvents();

      expect(result).toHaveLength(3);
      expect(result[0].types).toBe('Concert');
      expect(result[1].types).toBe('Seminar');
      expect(result[2].types).toBe('Exhibition');
    });
  });
}); 