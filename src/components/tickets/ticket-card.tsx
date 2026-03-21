import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/tickets/status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { MessageSquare, ChevronRight } from "lucide-react"
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
      <Card className="group hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <StatusBadge status={status} />
                <PriorityBadge priority={priority} />
                {categoryName && (
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{categoryName}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end gap-1">
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
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
