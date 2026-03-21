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
      <div>
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2.5">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          管理仪表盘
        </h1>
        <p className="text-sm text-muted-foreground mt-1 ml-4">工单概览与系统统计</p>
      </div>
      <StatsCards stats={stats} />
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">最近工单</h2>
        <TicketTable tickets={recentTickets} />
      </div>
    </div>
  )
}
