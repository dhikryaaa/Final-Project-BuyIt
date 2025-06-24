"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Event } from "@/types"

export function EventsGrid() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Digital Marketing Masterclass",
        description: "Learn advanced digital marketing strategies",
        type: "seminar",
        date: "2024-02-15T10:00:00Z",
        location: "Jakarta Convention Center",
        image: "/placeholder.svg?height=200&width=300",
        organizer: "Marketing Pro",
        ticketTypes: [{ id: "1", name: "Regular", price: 250000, quota: 100, available: 85 }],
        maxTicketsPerUser: 1,
        createdAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        title: "Jazz Night with Local Artists",
        description: "An evening of smooth jazz music",
        type: "concert",
        date: "2024-02-20T19:00:00Z",
        location: "Balai Sarbini",
        image: "/placeholder.svg?height=200&width=300",
        organizer: "Jazz Society",
        ticketTypes: [
          { id: "2", name: "Regular", price: 150000, quota: 200, available: 150 },
          { id: "3", name: "VIP", price: 300000, quota: 50, available: 30 },
          { id: "4", name: "VVIP", price: 500000, quota: 20, available: 15 },
        ],
        maxTicketsPerUser: 5,
        createdAt: "2024-01-01T00:00:00Z",
      },
    ]

    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="card-hover border-0 shadow-lg overflow-hidden">
          <div className="relative h-48">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <Badge className="absolute top-4 left-4 bg-purple-600 capitalize">{event.type}</Badge>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{new Date(event.date).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.organizer}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-purple-600">
                From Rp {event.ticketTypes[0]?.price.toLocaleString("id-ID")}
              </span>
              <Button asChild size="sm">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
