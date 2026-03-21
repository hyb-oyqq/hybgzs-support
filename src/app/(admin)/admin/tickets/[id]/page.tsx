import { notFound } from "next/navigation"
import { getTicketById } from "@/actions/ticket.actions"
import { TicketDetail } from "@/components/tickets/ticket-detail"
import { ReplyList } from "@/components/replies/reply-list"
import { ReplyForm } from "@/components/replies/reply-form"
import { StatusSelect } from "@/components/admin/status-select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ticket = await getTicketById(id)
  if (!ticket) notFound()

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <Link href="/admin/tickets">
          <Button variant="ghost" size="sm" className="rounded-lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回工单列表
          </Button>
        </Link>
        <StatusSelect ticketId={ticket.id} currentStatus={ticket.status} />
      </div>

      <TicketDetail ticket={ticket} />

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2.5">
            <MessageCircle className="h-4 w-4 text-primary" />
            对话 ({ticket.replies.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReplyList replies={ticket.replies} />
          <ReplyForm ticketId={ticket.id} />
        </CardContent>
      </Card>
    </div>
  )
}
