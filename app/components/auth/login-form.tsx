"use client"

import type React from "react"

import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "./actions"

export function LoginForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="h-11 pr-10"
          />
        </div>
      </div>

      <Button formAction={login} className="w-full h-11">
        Sign In
      </Button>
    </form>
  )
}
