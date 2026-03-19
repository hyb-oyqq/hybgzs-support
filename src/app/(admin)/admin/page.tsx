import { getDashboardStats, getRecentAdminTickets } from "@/actions/admin.actions"
import { StatsCards } from "@/components/admin/stats-cards"
import { TicketTable } from "@/components/admin/ticket-table"

export default async function AdminDashboardPage() {
  const [stats, recentTickets] = await Promise.all([
    getDashboardStats(),
    getRecentAdminTickets(),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">管理仪表盘</h1>
      <StatsCards stats={stats} />
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">最近工单</h2>
        <TicketTable tickets={recentTickets} />
      </div>
    </div>
  )
}
