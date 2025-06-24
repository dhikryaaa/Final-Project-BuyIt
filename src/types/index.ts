export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  type: "seminar" | "concert" | "exhibition"
  date: string
  location: string
  image: string
  organizer: string
  ticketTypes: TicketType[]
  maxTicketsPerUser: number
  createdAt: string
}

export interface TicketType {
  id: string
  name: string
  price: number
  quota: number
  available: number
  description?: string
}

export interface Booking {
  id: string
  userId: string
  eventId: string
  ticketType: string
  quantity: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  event: Event
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
