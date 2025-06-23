'use client'

import { useState } from 'react';

export default function EventPage() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    time: '',
    types: '',
    capacity: '',
    description: '',
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Kalau kamu perlu token Auth:
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buat Event</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Nama Event" value={form.name} onChange={handleChange} className="w-full border p-2" required />
        <input name="location" placeholder="Lokasi" value={form.location} onChange={handleChange} className="w-full border p-2" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border p-2" required />
        <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full border p-2" required />
        <input name="types" placeholder="Tipe Event" value={form.types} onChange={handleChange} className="w-full border p-2" />
        <input type="number" name="capacity" placeholder="Kapasitas" value={form.capacity} onChange={handleChange} className="w-full border p-2" />
        <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} className="w-full border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      {result && (
        <div className="mt-4 p-4 border border-green-500 text-green-700">
          <h2 className="font-semibold">Event berhasil dibuat:</h2>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border border-red-500 text-red-700">
          <h2 className="font-semibold">Gagal:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
