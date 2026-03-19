import { Badge } from "@/components/ui/badge"
import { PRIORITY_LABELS, PRIORITY_COLORS } from "@/lib/constants"
import type { Priority } from "@/generated/prisma/enums"

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant="secondary" className={PRIORITY_COLORS[priority].bg}>
      {PRIORITY_LABELS[priority]}
    </Badge>
  )
}
