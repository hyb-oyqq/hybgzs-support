"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { updateTicketStatus } from "@/actions/admin.actions"
import { STATUS_LABELS } from "@/lib/constants"
import { toast } from "sonner"
import type { TicketStatus } from "@/generated/prisma/enums"

export function StatusSelect({ ticketId, currentStatus }: { ticketId: string; currentStatus: TicketStatus }) {
  const [confirm, setConfirm] = useState<TicketStatus | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!confirm) return
    setLoading(true)
    try {
      await updateTicketStatus(ticketId, confirm)
      toast.success("状态已更新")
    } catch {
      toast.error("更新失败")
    } finally {
      setLoading(false)
      setConfirm(null)
    }
  }

  return (
    <>
      <Select
        value={currentStatus}
        onValueChange={(v) => {
          if (v && v !== currentStatus) setConfirm(v as TicketStatus)
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(STATUS_LABELS) as TicketStatus[]).map((s) => (
            <SelectItem key={s} value={s}>
              {STATUS_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ConfirmDialog
        open={!!confirm}
        onOpenChange={() => setConfirm(null)}
        title="确认修改状态"
        description={`确定要将工单状态修改为「${confirm ? STATUS_LABELS[confirm] : ""}」吗？`}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </>
  )
}
