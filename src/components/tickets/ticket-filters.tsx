"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STATUS_LABELS } from "@/lib/constants"
import { Search } from "lucide-react"
import type { TicketStatus } from "@/generated/prisma/enums"

interface TicketFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

export function TicketFilters({ search, onSearchChange, status, onStatusChange }: TicketFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索工单..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rounded-xl focus:border-primary"
        />
      </div>
      <Select value={status} onValueChange={(v) => onStatusChange(v ?? "ALL")}>
        <SelectTrigger className="w-full sm:w-40 rounded-xl">
          <SelectValue placeholder="全部状态" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="ALL">全部状态</SelectItem>
          {(Object.keys(STATUS_LABELS) as TicketStatus[]).map((s) => (
            <SelectItem key={s} value={s}>
              {STATUS_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
