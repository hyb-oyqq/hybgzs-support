"use client"

import { ReplyItem } from "@/components/replies/reply-item"
import { useSession } from "next-auth/react"

interface Reply {
  id: string
  content: string
  isAdminReply: boolean
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
    role: string
  }
}

export function ReplyList({ replies }: { replies: Reply[] }) {
  const { data: session } = useSession()

  if (replies.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        暂无回复
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          isCurrentUser={reply.user.id === session?.user?.id}
        />
      ))}
    </div>
  )
}
