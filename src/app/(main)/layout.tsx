"use client"

import { Navbar } from "@/components/layout/navbar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6">
        {children}
      </main>
    </div>
  )
}
