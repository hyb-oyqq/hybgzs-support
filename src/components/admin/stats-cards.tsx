"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Ticket, Clock, CheckCircle, Users, XCircle, CalendarPlus } from "lucide-react"

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
    { label: "总工单", value: stats.totalTickets, icon: Ticket, color: "text-foreground" },
    { label: "待处理", value: stats.openTickets, icon: Clock, color: "text-amber-600 dark:text-amber-400" },
    { label: "处理中", value: stats.inProgressTickets, icon: Clock, color: "text-blue-600 dark:text-blue-400" },
    { label: "已解决", value: stats.resolvedTickets, icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "已关闭", value: stats.closedTickets, icon: XCircle, color: "text-gray-500" },
    { label: "总用户", value: stats.totalUsers, icon: Users, color: "text-foreground" },
    { label: "今日新增", value: stats.todayTickets, icon: CalendarPlus, color: "text-accent" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <p className={`text-2xl font-semibold font-mono ${item.color}`}>
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
