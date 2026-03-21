"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Menu, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserNav } from "@/components/layout/user-nav"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden h-9 w-9" />}>
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <SheetTitle className="text-lg font-bold mb-4">导航</SheetTitle>
              <nav className="flex flex-col gap-1">
                <Link href="/dashboard" className="text-sm px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors font-medium">
                  仪表盘
                </Link>
                <Link href="/tickets" className="text-sm px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors font-medium">
                  我的工单
                </Link>
                <Link href="/tickets/new" className="text-sm px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors font-medium">
                  新建工单
                </Link>
                {session?.user?.role === "ADMIN" && (
                  <Link href="/admin" className="text-sm px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors font-medium">
                    管理后台
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-sm tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Headset className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            黑与白支持
          </Link>
          <nav className="hidden md:flex items-center gap-0.5">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground rounded-lg">
                仪表盘
              </Button>
            </Link>
            <Link href="/tickets">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground rounded-lg">
                我的工单
              </Button>
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground rounded-lg">
                  管理后台
                </Button>
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
