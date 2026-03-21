import type { TicketStatus, Priority } from "@/generated/prisma/enums"

export const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "待处理",
  IN_PROGRESS: "处理中",
  RESOLVED: "已解决",
  CLOSED: "已关闭",
}

export const STATUS_COLORS: Record<TicketStatus, { light: string; dark: string; bg: string }> = {
  OPEN: { light: "#D97706", dark: "#F59E0B", bg: "bg-amber-100/80 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300" },
  IN_PROGRESS: { light: "#3A9E95", dark: "#5CC4BA", bg: "bg-teal-100/80 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300" },
  RESOLVED: { light: "#4CAF82", dark: "#6FCF9F", bg: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" },
  CLOSED: { light: "#8B7E74", dark: "#A89E96", bg: "bg-stone-100/80 text-stone-700 dark:bg-stone-500/15 dark:text-stone-400" },
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "低",
  MEDIUM: "中",
  HIGH: "高",
  URGENT: "紧急",
}

export const PRIORITY_COLORS: Record<Priority, { light: string; dark: string; bg: string }> = {
  LOW: { light: "#8B7E74", dark: "#A89E96", bg: "bg-stone-100/80 text-stone-700 dark:bg-stone-500/15 dark:text-stone-400" },
  MEDIUM: { light: "#D4990F", dark: "#E8B54A", bg: "bg-amber-100/80 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300" },
  HIGH: { light: "#E08850", dark: "#F0A070", bg: "bg-orange-100/80 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300" },
  URGENT: { light: "#DC4545", dark: "#F06060", bg: "bg-red-100/80 text-red-800 dark:bg-red-500/15 dark:text-red-300" },
}

export const ROLE_LABELS: Record<string, string> = {
  USER: "用户",
  ADMIN: "管理员",
}
