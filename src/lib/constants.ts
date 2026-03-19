import type { TicketStatus, Priority } from "@/generated/prisma/enums"

export const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "待处理",
  IN_PROGRESS: "处理中",
  RESOLVED: "已解决",
  CLOSED: "已关闭",
}

export const STATUS_COLORS: Record<TicketStatus, { light: string; dark: string; bg: string }> = {
  OPEN: { light: "#C2830A", dark: "#D4990F", bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  IN_PROGRESS: { light: "#2B7CC9", dark: "#4A9AE1", bg: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  RESOLVED: { light: "#1A8A5C", dark: "#22A870", bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  CLOSED: { light: "#6B6F76", dark: "#8A8B8E", bg: "bg-gray-500/10 text-gray-600 dark:text-gray-400" },
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "低",
  MEDIUM: "中",
  HIGH: "高",
  URGENT: "紧急",
}

export const PRIORITY_COLORS: Record<Priority, { light: string; dark: string; bg: string }> = {
  LOW: { light: "#6B6F76", dark: "#8A8B8E", bg: "bg-gray-500/10 text-gray-600 dark:text-gray-400" },
  MEDIUM: { light: "#C2830A", dark: "#D4990F", bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  HIGH: { light: "#D46422", dark: "#E57A35", bg: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  URGENT: { light: "#C93535", dark: "#E04545", bg: "bg-red-500/10 text-red-700 dark:text-red-400" },
}

export const ROLE_LABELS: Record<string, string> = {
  USER: "用户",
  ADMIN: "管理员",
}
