import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FeaturedEvents() {
  const events = [
    {
      id: 1,
      title: "Digital Marketing Masterclass",
      type: "Seminar",
      date: "2024-02-15",
      location: "Jakarta Convention Center",
      price: "Rp 250,000",
      image: "/placeholder.svg?height=200&width=300",
      attendees: 150,
      category: "seminar",
    },
    {
      id: 2,
      title: "Jazz Night with Local Artists",
      type: "Concert",
      date: "2024-02-20",
      location: "Balai Sarbini",
      price: "From Rp 150,000",
      image: "/placeholder.svg?height=200&width=300",
      attendees: 500,
      category: "concert",
    },
    {
      id: 3,
      title: "Modern Art Exhibition",
      type: "Exhibition",
      date: "2024-02-25",
      location: "National Gallery",
      price: "From Rp 50,000",
      image: "/placeholder.svg?height=200&width=300",
      attendees: 200,
      category: "exhibition",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these popular events happening soon
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="card-hover border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-purple-600">{event.type}</Badge>
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
                    <span className="text-sm">{event.attendees} attendees</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-600">{event.price}</span>
                  <Button asChild size="sm">
                    <Link href={`/events/${event.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          >
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
