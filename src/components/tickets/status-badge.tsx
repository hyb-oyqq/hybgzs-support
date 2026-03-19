import { Badge } from "@/components/ui/badge"
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/constants"
import type { TicketStatus } from "@/generated/prisma/enums"

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge variant="secondary" className={STATUS_COLORS[status].bg}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
