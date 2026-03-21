import { Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-primary/5 rounded-2xl p-5 mb-4">
        <div className="text-primary/40">
          {icon ?? <Inbox className="h-10 w-10" />}
        </div>
      </div>
      <h3 className="text-base font-bold mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>}
      {action}
    </div>
  )
}
