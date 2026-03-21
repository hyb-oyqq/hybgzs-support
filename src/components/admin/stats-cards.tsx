"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Ticket, Clock, CheckCircle, Users, XCircle, CalendarPlus, Loader2 } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalTickets: number
    openTickets: number
    inProgressTickets: number
    resolvedTickets: number
    closedTickets: number
    totalUsers: number
    todayTickets: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const items = [
    { label: "总工单", value: stats.totalTickets, icon: Ticket, color: "text-primary", bg: "bg-primary/10" },
    { label: "待处理", value: stats.openTickets, icon: Clock, color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-500/15" },
    { label: "处理中", value: stats.inProgressTickets, icon: Loader2, color: "text-teal-700 dark:text-teal-400", bg: "bg-teal-100 dark:bg-teal-500/15" },
    { label: "已解决", value: stats.resolvedTickets, icon: CheckCircle, color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/15" },
    { label: "已关闭", value: stats.closedTickets, icon: XCircle, color: "text-stone-600 dark:text-stone-400", bg: "bg-stone-100 dark:bg-stone-500/15" },
    { label: "总用户", value: stats.totalUsers, icon: Users, color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-500/15" },
    { label: "今日新增", value: stats.todayTickets, icon: CalendarPlus, color: "text-accent-foreground", bg: "bg-accent/20" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {items.map((item) => (
        <Card key={item.label} className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold font-mono ${item.color}`}>
              {item.value}
            </p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">{item.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
