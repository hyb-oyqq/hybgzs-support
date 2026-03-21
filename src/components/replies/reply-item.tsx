import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ReplyItemProps {
  reply: {
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
  isCurrentUser: boolean
}

export function ReplyItem({ reply, isCurrentUser }: ReplyItemProps) {
  return (
    <div className={cn("flex gap-3", isCurrentUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8 shrink-0 border border-primary/10">
        <AvatarImage src={reply.user.image || undefined} />
        <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{(reply.user.name || "U")[0]}</AvatarFallback>
      </Avatar>
      <div className={cn("max-w-[90%] sm:max-w-[80%] space-y-1", isCurrentUser && "items-end")}>
        <div className={cn("flex items-center gap-2", isCurrentUser && "flex-row-reverse")}>
          <span className="text-xs font-semibold">{reply.user.name}</span>
          {reply.isAdminReply && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary font-semibold">
              客服
            </Badge>
          )}
          <time className="text-[11px] text-muted-foreground">
            {new Date(reply.createdAt).toLocaleString("zh-CN")}
          </time>
        </div>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed",
            reply.isAdminReply
              ? "bg-primary/10 border border-primary/15"
              : isCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          )}
        >
          {reply.content}
        </div>
      </div>
    </div>
  )
}
