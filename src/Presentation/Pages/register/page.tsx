// app/register/page.tsx
"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Daftar Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="organizer"
                checked={role === "organizer"}
                onChange={() => setRole("organizer")}
              />
              Organizer
            </label>
          </div>

          <Button className="w-full bg-[#F1945A] text-white hover:bg-[#d97c45]">
            Daftar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#F1945A] hover:underline">
              Masuk di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
