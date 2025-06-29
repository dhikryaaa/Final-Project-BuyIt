import { bookTicket } from "../../src/infrastructure/repositories/addMyTicketToDB";
import { BookTicketInput } from "../../src/infrastructure/interface/bookTicketInput";

jest.mock("../../supabase/client", () => ({
  createClient: jest.fn(),
}));

import { createClient } from "../../supabase/client";
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

describe("bookTicket", () => {
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    const eqMock = jest.fn().mockReturnThis();

    mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn(),
      eq: eqMock,
      update: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
    };

    mockCreateClient.mockReturnValue(mockSupabaseClient);
  });

  const mockBookTicketInput: BookTicketInput = {
    eventId: 1,
    userId: "user123",
    types: "Regular",
    quantity: 2,
    status: "active",
    purchasedDate: new Date("2024-01-01"),
    totalPrice: 200000,
  };

  const mockTicket = {
    id: 1,
    eventId: 1,
    types: "Regular",
    price: 100000,
    quantity: 10,
  };

  const mockMyTicket = {
    id: 1,
    eventId: 1,
    ticketId: 1,
    types: "Regular",
    quantity: 2,
    status: "active",
    purchasedDate: "2024-01-01T00:00:00.000Z",
    totalPrice: 200000,
    userId: "user123",
  };

  it("should successfully book a ticket when all conditions are met", async () => {
    mockSupabaseClient.single
      .mockResolvedValueOnce({ data: mockTicket, error: null })
      .mockResolvedValueOnce({ data: mockMyTicket, error: null });

    const result = await bookTicket(mockBookTicketInput);

    expect(result).toEqual(mockMyTicket);
  });

  it("should throw error when ticket is not found", async () => {
    mockSupabaseClient.single.mockResolvedValueOnce({
      data: null,
      error: { message: "Ticket not found" },
    });

    await expect(bookTicket(mockBookTicketInput)).rejects.toThrow("Tiket tidak ditemukan");
  });

  it("should throw error when ticket quantity is insufficient", async () => {
    const insufficientTicket = { ...mockTicket, quantity: 1 };

    mockSupabaseClient.single.mockResolvedValueOnce({
      data: insufficientTicket,
      error: null,
    });

    await expect(bookTicket(mockBookTicketInput)).rejects.toThrow("Kuota tiket tidak mencukupi");
  });

  it("should throw error when user exceeds max 5 ticket", async () => {
    mockSupabaseClient.from.mockImplementation((table: string) => {
      if (table === "ticket") {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValueOnce({ data: mockTicket, error: null }),
        };
      }
  
      if (table === "myticket") {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          then: (resolve: any) =>
            resolve({ data: [{ quantity: 6 }], error: null }),
        };
      }
  
      return {};
    });
  
    await expect(bookTicket(mockBookTicketInput)).rejects.toThrow("Maksimal pembelian 5 tiket per event");
  });  

  it("should calculate total price correctly", async () => {
    const expensiveTicket = { ...mockTicket, price: 500000 };
    const expectedMyTicket = { ...mockMyTicket, totalPrice: 1000000 };

    mockSupabaseClient.single
      .mockResolvedValueOnce({ data: expensiveTicket, error: null })
      .mockResolvedValueOnce({ data: expectedMyTicket, error: null });

    const result = await bookTicket(mockBookTicketInput);
    expect(result.totalPrice).toBe(1000000);
  });
});
