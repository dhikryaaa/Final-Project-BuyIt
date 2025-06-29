"use client";

import { useEffect, useState } from "react";
import { createClient } from '../../../supabase/client';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket, User, Download, DollarSign, MapPin, Clock } from "lucide-react";
import { Header } from "../../components/layout/header";

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  types: string;
}

interface MyTicket {
  id: number;
  eventId: number;
  ticketId: number;
  types: string;
  quantity: number;
  userId: string;
  status: string;
  purchasedDate: string;
  totalPrice: number;
  event: Event;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<MyTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ambil user email
        const { data } = await supabase.auth.getUser();
        setUserEmail(data?.user?.email || '');
        // Fetch tiket user
        const res = await fetch("/api/myticket");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Gagal fetch tiket');
        setTickets(json.data || []);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [supabase.auth]);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const getTicketTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vip':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">VIP</Badge>;
      case 'vvip':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">VVIP</Badge>;
      case 'regular':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Regular</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{type}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat tiket Anda...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tiket Saya</h1>
              <p className="text-gray-600">Kelola dan lihat semua tiket event Anda</p>
            </div>
            
            {userEmail && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Login sebagai</p>
                      <p className="font-semibold text-gray-900">{userEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Error State */}
          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!loading && !error && tickets.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Ticket className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada tiket</h3>
                <p className="text-gray-600 mb-6">Anda belum memiliki tiket event. Mulai booking event favorit Anda!</p>
                <Button asChild>
                  <a href="/events">Lihat Events</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Tickets Grid */}
          {!loading && !error && tickets.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Ticket className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{ticket.event?.name || `Event #${ticket.eventId}`}</CardTitle>
                          <p className="text-sm text-gray-500">Ticket #{ticket.ticketId}</p>
                        </div>
                      </div>
                      {getStatusBadge(ticket.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    {ticket.event && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{ticket.event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {ticket.event.date && ticket.event.time 
                              ? format(new Date(`${ticket.event.date}T${ticket.event.time}`), 'dd MMMM yyyy HH:mm')
                              : "Tanggal belum ditentukan"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{ticket.event.types}</span>
                        </div>
                      </div>
                    )}

                    {/* Ticket Type and Quantity */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        {getTicketTypeBadge(ticket.types)}
                        <span className="text-sm text-gray-600">x{ticket.quantity}</span>
                      </div>
                    </div>

                    {/* Purchase Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Dibeli: {ticket.purchasedDate
                          ? format(new Date(ticket.purchasedDate + 'T00:00:00'), 'dd MMMM yyyy')
                          : "-"}
                      </span>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Total Harga:</span>
                      </div>
                      <span className="font-bold text-lg text-green-600">
                        Rp {ticket.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" className="flex-1">
                        Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {!loading && !error && tickets.length > 0 && (
            <Card className="mt-8 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{tickets.length}</div>
                    <div className="text-purple-100">Total Tiket</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      Rp {tickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0).toLocaleString('id-ID')}
                    </div>
                    <div className="text-purple-100">Total Pengeluaran</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {tickets.filter(t => t.status.toLowerCase() === 'confirmed' || t.status.toLowerCase() === 'active').length}
                    </div>
                    <div className="text-purple-100">Tiket Aktif</div>
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