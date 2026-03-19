"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { TicketCard } from "@/components/tickets/ticket-card"
import { TicketFilters } from "@/components/tickets/ticket-filters"
import { Pagination } from "@/components/shared/pagination"
import { EmptyState } from "@/components/shared/empty-state"
import { getMyTickets } from "@/actions/ticket.actions"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { TicketStatus, Priority } from "@/generated/prisma/enums"

interface TicketItem {
  id: string
  title: string
  status: TicketStatus
  priority: Priority
  updatedAt: Date
  category: { name: string } | null
  _count: { replies: number }
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("ALL")
  const [loading, setLoading] = useState(true)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getMyTickets({
        page,
        status: status === "ALL" ? undefined : (status as TicketStatus),
        search: search || undefined,
      })
      setTickets(res.tickets)
      setTotalPages(res.totalPages)
    } finally {
      setLoading(false)
    }
  }, [page, status, search])

  useEffect(() => { fetchTickets() }, [fetchTickets])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">我的工单</h1>
        <Link href="/tickets/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建工单
          </Button>
        </Link>
      </div>

      <TicketFilters
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1) }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setPage(1) }}
      />

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-secondary/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState
          title="没有找到工单"
          description={search || status !== "ALL" ? "试试调整筛选条件" : "点击按钮创建你的第一个工单"}
        />
      ) : (
        <>
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                status={ticket.status}
                priority={ticket.priority}
                categoryName={ticket.category?.name}
                replyCount={ticket._count.replies}
                updatedAt={ticket.updatedAt}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
