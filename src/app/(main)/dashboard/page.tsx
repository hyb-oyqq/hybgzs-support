import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getMyTicketStats, getRecentTickets } from "@/actions/ticket.actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketCard } from "@/components/tickets/ticket-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Plus, Ticket, Clock, CheckCircle, Sparkles } from "lucide-react"
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
      {/* 欢迎区域 */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 p-6 md:p-8 shadow-lg shadow-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="text-primary-foreground">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary-foreground/70" />
              <span className="text-xs font-medium text-primary-foreground/70">欢迎回来</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              你好，{session.user.name}
            </h1>
            <p className="text-sm text-primary-foreground/70 mt-1">有什么可以帮助你的吗？</p>
          </div>
          <Link href="/tickets/new" className="shrink-0">
            <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold shadow-md rounded-xl h-11">
              <Plus className="mr-2 h-4 w-4" />
              新建工单
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">{stats.total}</p>
              <p className="text-xs text-muted-foreground font-medium">我的工单</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">{stats.open}</p>
              <p className="text-xs text-muted-foreground font-medium">待处理</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground font-medium">已解决</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">最近工单</h2>
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
