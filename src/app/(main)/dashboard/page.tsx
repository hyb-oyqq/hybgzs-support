import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getMyTicketStats, getRecentTickets } from "@/actions/ticket.actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketCard } from "@/components/tickets/ticket-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Plus, Ticket, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const [stats, recentTickets] = await Promise.all([
    getMyTicketStats(),
    getRecentTickets(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            你好，{session.user.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">欢迎回到黑与白支持</p>
        </div>
        <Link href="/tickets/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建工单
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <Ticket className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold font-mono">{stats.total}</p>
              <p className="text-xs text-muted-foreground">我的工单</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold font-mono">{stats.open}</p>
              <p className="text-xs text-muted-foreground">待处理</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold font-mono">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground">已解决</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">最近工单</h2>
        {recentTickets.length === 0 ? (
          <EmptyState
            title="还没有工单"
            description="点击右上角按钮创建你的第一个工单"
          />
        ) : (
          <div className="space-y-2">
            {recentTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                status={ticket.status}
                priority={ticket.priority}
                categoryName={ticket.category?.name}
                updatedAt={ticket.updatedAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
