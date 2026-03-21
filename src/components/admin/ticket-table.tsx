"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/tickets/status-badge"
import { PriorityBadge } from "@/components/tickets/priority-badge"
import { MessageSquare } from "lucide-react"
import type { TicketStatus, Priority } from "@/generated/prisma/enums"

interface TicketRow {
  id: string
  title: string
  status: TicketStatus
  priority: Priority
  updatedAt: Date
  category?: { name: string } | null
  user: { id: string; name: string | null; image: string | null }
  _count: { replies: number }
}

export function TicketTable({ tickets }: { tickets: TicketRow[] }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">工单</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">提交者</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">状态</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">优先级</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">分类</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">更新时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} className="hover:bg-primary/[0.03] transition-colors">
              <TableCell>
                <Link href={`/admin/tickets/${ticket.id}`} className="hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{ticket.title}</span>
                    {ticket._count.replies > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {ticket._count.replies}
                      </span>
                    )}
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border border-primary/10">
                    <AvatarImage src={ticket.user.image || undefined} />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">{(ticket.user.name || "U")[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{ticket.user.name}</span>
                </div>
              </TableCell>
              <TableCell><StatusBadge status={ticket.status} /></TableCell>
              <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
              <TableCell className="text-sm text-muted-foreground">{ticket.category?.name || "-"}</TableCell>
              <TableCell className="text-sm text-muted-foreground text-right">
                {new Date(ticket.updatedAt).toLocaleDateString("zh-CN")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
