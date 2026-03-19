import { notFound } from "next/navigation"
import { getTicketById } from "@/actions/ticket.actions"
import { TicketDetail } from "@/components/tickets/ticket-detail"
import { ReplyList } from "@/components/replies/reply-list"
import { ReplyForm } from "@/components/replies/reply-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ticket = await getTicketById(id)
  if (!ticket) notFound()

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link href="/tickets">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回工单列表
        </Button>
      </Link>

      <TicketDetail ticket={ticket} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">对话 ({ticket.replies.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReplyList replies={ticket.replies} />
          {ticket.status !== "CLOSED" && <ReplyForm ticketId={ticket.id} />}
        </CardContent>
      </Card>
    </div>
  )
}
