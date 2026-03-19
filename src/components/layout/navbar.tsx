"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserNav } from "@/components/layout/user-nav"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden h-9 w-9" />}>
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <SheetTitle className="text-lg font-semibold mb-4">导航</SheetTitle>
              <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className="text-sm px-3 py-2 rounded-md hover:bg-secondary transition-colors">
                  仪表盘
                </Link>
                <Link href="/tickets" className="text-sm px-3 py-2 rounded-md hover:bg-secondary transition-colors">
                  我的工单
                </Link>
                <Link href="/tickets/new" className="text-sm px-3 py-2 rounded-md hover:bg-secondary transition-colors">
                  新建工单
                </Link>
                {session?.user?.role === "ADMIN" && (
                  <Link href="/admin" className="text-sm px-3 py-2 rounded-md hover:bg-secondary transition-colors">
                    管理后台
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="font-semibold text-sm tracking-tight">
            黑与白支持
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                仪表盘
              </Button>
            </Link>
            <Link href="/tickets">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                我的工单
              </Button>
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
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
