'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../../supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Ticket, User, LogOut, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Header } from "../../components/layout/header";

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

export interface BookTicketInput {
  eventId: number;
  userId: string;
  types: "Regular" | "VIP" | "VVIP";
  quantity: number;
  status?: "active" | "expired" | "canceled";
}

const ticketTypeMap: Record<string, ("Regular" | "VIP" | "VVIP")[]> = {
  Seminar: ["Regular", "VIP"],
  Concert: ["Regular", "VIP", "VVIP"],
  Exhibition: ["Regular", "VIP"],
};

export default function BookTicketPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketType, setTicketType] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [result, setResult] = useState<{ success: boolean; data?: unknown; message?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(true);
  const supabase = createClient();

  // Fetch user from Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        setUserEmail(data.user.email ?? '');
      } else {
        setUserId('');
        setUserEmail('');
      }
    };
    getUser();
  }, []);

  // Fetch all events
  useEffect(() => {
    setEventsLoading(true);
    fetch('/api/getevent')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setEventsLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setEventsLoading(false);
      });
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    if (!userId) {
      setError('Anda harus login untuk memesan tiket.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/bookticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({
          eventId: selectedEvent?.id,
          types: ticketType,
          quantity,
          status: "active",
          purchaseDate: new Date(),
          totalPrice: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'Seminar':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Seminar</Badge>;
      case 'Concert':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Concert</Badge>;
      case 'Exhibition':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Exhibition</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{type}</Badge>;
    }
  };

  const getTicketTypeBadge = (type: string) => {
    switch (type) {
      case 'VIP':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">VIP</Badge>;
      case 'VVIP':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">VVIP</Badge>;
      case 'Regular':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Regular</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{type}</Badge>;
    }
  };

  const getTicketPrice = (event: Event, ticketType: string): number => {
    const ticket = event.tickets?.find(t => t.types === ticketType);
    return ticket?.price || 0;
  };

  const calculateTotalPrice = () => {
    if (!selectedEvent || !ticketType) return 0;
    const price = getTicketPrice(selectedEvent, ticketType);
    return price * quantity;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Tiket Event</h1>
              <p className="text-gray-600">Pilih event favorit Anda dan pesan tiket sekarang</p>
            </div>
            
            {userId ? (
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Login sebagai</p>
                      <p className="font-semibold text-gray-900">{userEmail || userId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-red-600">Anda belum login</p>
                      <p className="font-semibold text-red-700">Silakan login untuk memesan tiket</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Events Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Available Events */}
            <div>
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-purple-600" />
                    Event Tersedia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {eventsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                      <span className="ml-2 text-gray-600">Memuat events...</span>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-8">
                      <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Tidak ada event tersedia saat ini.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {events.map(event => (
                        <Card 
                          key={event.id} 
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedEvent?.id === event.id 
                              ? 'ring-2 ring-purple-500 bg-purple-50' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setSelectedEvent(event);
                            setTicketType('');
                            setQuantity(1);
                            setResult(null);
                            setError(null);
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-gray-900">{event.name}</h3>
                              {getEventTypeBadge(event.types)}
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date} {event.time}</span>
                              </div>
                              {event.capacity && (
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>Kapasitas: {event.capacity} orang</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div>
              {selectedEvent ? (
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Pesan Tiket
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBook} className="space-y-6">
                      {/* Selected Event Info */}
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-gray-900 mb-2">{selectedEvent.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedEvent.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{selectedEvent.date} {selectedEvent.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kategori Tiket
                        </label>
                        <div className="grid gap-2">
                          {selectedEvent.tickets
                            ?.filter(ticket => {
                              // Untuk seminar, hanya tampilkan Regular dan VIP
                              if (selectedEvent.types === 'Seminar') {
                                return ticket.types === 'Regular' || ticket.types === 'VIP';
                              }
                              return true;
                            })
                            .map(ticket => (
                              <div
                                key={ticket.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                  ticketType === ticket.types 
                                    ? 'border-purple-500 bg-purple-50' 
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                                onClick={() => setTicketType(ticket.types)}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    {getTicketTypeBadge(ticket.types)}
                                    <span className="font-medium">{ticket.types}</span>
                                  </div>
                                  <span className="font-bold text-purple-600">
                                    Rp {ticket.price.toLocaleString('id-ID')}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Quantity Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jumlah Tiket
                        </label>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="text-lg font-semibold min-w-[3rem] text-center">{quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setQuantity(Math.min(5, quantity + 1))}
                            disabled={quantity >= 5}
                          >
                            +
                          </Button>
                          <span className="text-sm text-gray-500">(Max: 5 tiket)</span>
                        </div>
                      </div>

                      {/* Total Price */}
                      {ticketType && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Total Harga:</span>
                            <span className="text-xl font-bold text-green-600">
                              Rp {calculateTotalPrice().toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={loading || !userId || !ticketType}
                        className="w-full"
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Memesan...
                          </>
                        ) : (
                          'Pesan Tiket'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Pilih Event</h3>
                    <p className="text-gray-600">Pilih event dari daftar di sebelah kiri untuk mulai memesan tiket</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Result Messages */}
          {result && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">✅ Tiket berhasil dipesan!</h3>
                    <p className="text-sm">Detail pemesanan telah disimpan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="mt-6 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">❌ Gagal memesan tiket</h3>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
