import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/tickets/status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { MessageSquare } from "lucide-react"
import type { TicketStatus, Priority } from "@/generated/prisma/enums"

interface TicketCardProps {
  id: string
  title: string
  status: TicketStatus
  priority: Priority
  categoryName?: string | null
  replyCount?: number
  updatedAt: Date
  href?: string
}

export function TicketCard({ id, title, status, priority, categoryName, replyCount, updatedAt, href }: TicketCardProps) {
  return (
    <Link href={href ?? `/tickets/${id}`}>
      <Card className="hover:shadow-sm transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <StatusBadge status={status} />
                <PriorityBadge priority={priority} />
                {categoryName && (
                  <span className="text-xs text-muted-foreground">{categoryName}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <time className="text-xs text-muted-foreground">
                {new Date(updatedAt).toLocaleDateString("zh-CN")}
              </time>
              {replyCount !== undefined && replyCount > 0 && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {replyCount}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
