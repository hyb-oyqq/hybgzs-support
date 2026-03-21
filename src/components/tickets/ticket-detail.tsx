"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/tickets/status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { cn } from "@/lib/utils"
import type { TicketStatus, Priority } from "@/generated/prisma/enums"

const STATUS_BORDER: Record<TicketStatus, string> = {
  OPEN: "border-l-amber-500",
  IN_PROGRESS: "border-l-teal-500",
  RESOLVED: "border-l-emerald-500",
  CLOSED: "border-l-stone-400",
}

interface TicketDetailProps {
  ticket: {
    id: string
    title: string
    description: string
    status: TicketStatus
    priority: Priority
    createdAt: Date
    updatedAt: Date
    category?: { name: string } | null
    user: { id: string; name: string | null; image: string | null }
  }
}

export function TicketDetail({ ticket }: TicketDetailProps) {
  return (
    <Card className={cn("border-l-[3px] rounded-xl", STATUS_BORDER[ticket.status])}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg font-bold">{ticket.title}</CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
          {ticket.category && (
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full font-medium">
              {ticket.category.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6 border border-primary/10">
            <AvatarImage src={ticket.user.image || undefined} />
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">{(ticket.user.name || "U")[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{ticket.user.name}</span>
          <span className="text-muted-foreground/50">&middot;</span>
          <time>{new Date(ticket.createdAt).toLocaleString("zh-CN")}</time>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
          {ticket.description}
        </div>
      </CardContent>
    </Card>
  )
}
