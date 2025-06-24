"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"
import type { Event } from "@/types"

interface EventDetailsProps {
  eventId: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEvent: Event = {
      id: eventId,
      title: "Digital Marketing Masterclass 2024",
      description: `Join us for an intensive digital marketing masterclass where industry experts will share the latest strategies and techniques to boost your online presence.

      What you'll learn:
      • Advanced SEO techniques and content optimization
      • Social media marketing strategies that convert
      • Email marketing automation and personalization
      • Analytics and data-driven decision making
      • Paid advertising optimization across platforms

      This seminar is perfect for marketing professionals, business owners, and anyone looking to enhance their digital marketing skills. You'll receive practical insights, actionable strategies, and networking opportunities with like-minded professionals.

      Includes:
      • Workshop materials and digital resources
      • Networking lunch with speakers
      • Certificate of completion
      • Access to exclusive online community`,
      type: "seminar",
      date: "2024-02-15T10:00:00Z",
      location: "Jakarta Convention Center, Hall A",
      image: "/placeholder.svg?height=400&width=600",
      organizer: "Digital Marketing Institute",
      ticketTypes: [
        {
          id: "1",
          name: "Regular",
          price: 250000,
          quota: 100,
          available: 85,
          description: "Standard access to all sessions and materials",
        },
      ],
      maxTicketsPerUser: 1,
      createdAt: "2024-01-01T00:00:00Z",
    }

    setTimeout(() => {
      setEvent(mockEvent)
      setLoading(false)
    }, 1000)
  }, [eventId])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    )
  }

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-purple-600 mb-2 capitalize">{event.type}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm">
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm">
                    {new Date(event.date).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p className="text-sm">{event.organizer}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm">Full Day Event</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
            <div className="prose prose-gray max-w-none">
              {event.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
