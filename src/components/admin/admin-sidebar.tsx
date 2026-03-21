"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Ticket, Users, FolderOpen, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/tickets", label: "工单管理", icon: Ticket },
  { href: "/admin/users", label: "用户管理", icon: Users },
  { href: "/admin/categories", label: "分类管理", icon: FolderOpen },
]

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside className={cn("flex flex-col w-60 border-r bg-card min-h-[calc(100vh-3.5rem)]", className)}>
      <div className="p-4 border-b">
        <h2 className="flex items-center gap-2.5 font-bold text-sm">
          <div className="w-1.5 h-4 rounded-full bg-primary" />
          管理后台
        </h2>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground rounded-xl hover:bg-secondary hover:text-foreground transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          返回用户端
        </Link>
      </div>
    </aside>
  )
}
