"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

interface Ticket {
  id: number;
  types: string;
  price: number;
  quantity: number;
}

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  types: string;
  capacity?: number;
  description?: string;
  tickets: Ticket[];
}

export function AllEventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/getevent")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat daftar event");
        setLoading(false);
      });
  }, []);

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "Seminar":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Seminar</Badge>;
      case "Concert":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Concert</Badge>;
      case "Exhibition":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Exhibition</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{type}</Badge>;
    }
  };

  if (loading) return <div className="text-center text-gray-600">Memuat event...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (events.length === 0) return <div className="text-center text-gray-600">Belum ada event tersedia.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Semua Event</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="bg-white/90 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg mb-1">{event.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                {getEventTypeBadge(event.types)}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{event.date} {event.time}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Kapasitas: {event.capacity} orang</span>
                </div>
              )}
              <div className="pt-2">
                <span className="text-xs text-gray-500 line-clamp-2">{event.description}</span>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                {event.tickets?.map((ticket) => (
                  <Badge key={ticket.id} className="bg-gray-100 text-gray-800 border-gray-200">
                    {ticket.types} - Rp {ticket.price.toLocaleString("id-ID")}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 