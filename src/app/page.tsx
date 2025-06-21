'use client'

import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link
        href="/pages/dashboard"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Go to App
      </Link>
    </div>
  )
}
