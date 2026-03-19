"use client"

import { useState, useEffect, useCallback } from "react"
import { TicketTable } from "@/components/admin/ticket-table"
import { TicketFilters } from "@/components/tickets/ticket-filters"
import { Pagination } from "@/components/shared/pagination"
import { EmptyState } from "@/components/shared/empty-state"
import { getAllTickets } from "@/actions/admin.actions"
import type { TicketStatus, Priority } from "@/generated/prisma/enums"

interface AdminTicket {
  id: string
  title: string
  status: TicketStatus
  priority: Priority
  updatedAt: Date
  category: { name: string } | null
  user: { id: string; name: string | null; image: string | null }
  _count: { replies: number }
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<AdminTicket[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("ALL")
  const [loading, setLoading] = useState(true)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllTickets({
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
      <h1 className="text-xl font-semibold tracking-tight">工单管理</h1>

      <TicketFilters
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1) }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setPage(1) }}
      />

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 bg-secondary/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState title="没有找到工单" description="试试调整筛选条件" />
      ) : (
        <>
          <TicketTable tickets={tickets} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
