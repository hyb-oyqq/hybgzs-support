"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/tickets/status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import type { TicketStatus, Priority } from "@/generated/prisma/enums"

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
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{ticket.title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
          {ticket.category && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {ticket.category.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-5 w-5">
            <AvatarImage src={ticket.user.image || undefined} />
            <AvatarFallback className="text-[10px]">{(ticket.user.name || "U")[0]}</AvatarFallback>
          </Avatar>
          <span>{ticket.user.name}</span>
          <span>&middot;</span>
          <time>{new Date(ticket.createdAt).toLocaleString("zh-CN")}</time>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
          {ticket.description}
        </div>
      </CardContent>
    </Card>
  )
}
