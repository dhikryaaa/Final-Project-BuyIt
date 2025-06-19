"use client"

import Link from "next/link"
import { Input } from "@/Presentation/Components/ui/input"
import { Button } from "@/Presentation/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Presentation/Components/ui/card"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
            Masuk
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#F1945A] hover:underline">
              Daftar di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
