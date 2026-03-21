"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createReply } from "@/actions/reply.actions"
import { toast } from "sonner"
import { Send } from "lucide-react"

export function ReplyForm({ ticketId }: { ticketId: string }) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await createReply({ ticketId, content: content.trim() })
      setContent("")
      toast.success("回复发送成功")
    } catch {
      toast.error("发送失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        placeholder="输入回复内容..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="rounded-xl focus:border-primary"
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" className="rounded-lg" disabled={loading || !content.trim()}>
          <Send className="mr-2 h-3.5 w-3.5" />
          {loading ? "发送中..." : "发送回复"}
        </Button>
      </div>
    </form>
  )
}
