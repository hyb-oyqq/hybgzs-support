"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import type { TicketStatus } from "@/generated/prisma/client"

async function requireAdmin() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")
  return session
}

export async function getDashboardStats() {
  await requireAdmin()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    totalTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    closedTickets,
    totalUsers,
    todayTickets,
  ] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: "OPEN" } }),
    prisma.ticket.count({ where: { status: "IN_PROGRESS" } }),
    prisma.ticket.count({ where: { status: "RESOLVED" } }),
    prisma.ticket.count({ where: { status: "CLOSED" } }),
    prisma.user.count(),
    prisma.ticket.count({ where: { createdAt: { gte: today } } }),
  ])

  return {
    totalTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    closedTickets,
    totalUsers,
    todayTickets,
  }
}

export async function getAllTickets(params?: {
  page?: number
  pageSize?: number
  status?: TicketStatus
  search?: string
}) {
  await requireAdmin()

  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10

  const where = {
    ...(params?.status && { status: params.status }),
    ...(params?.search && {
      OR: [
        { title: { contains: params.search, mode: "insensitive" as const } },
        { description: { contains: params.search, mode: "insensitive" as const } },
      ],
    }),
  }

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      include: {
        category: true,
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { replies: true } },
      },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.ticket.count({ where }),
  ])

  return { tickets, total, totalPages: Math.ceil(total / pageSize) }
}

export async function updateTicketStatus(ticketId: string, status: TicketStatus) {
  await requireAdmin()

  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
  })

  revalidatePath(`/admin/tickets/${ticketId}`)
  revalidatePath(`/tickets/${ticketId}`)
  revalidatePath("/admin/tickets")
  revalidatePath("/admin")
  return ticket
}

export async function getRecentAdminTickets() {
  await requireAdmin()

  return prisma.ticket.findMany({
    include: {
      category: true,
      user: { select: { id: true, name: true, image: true } },
      _count: { select: { replies: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 10,
  })
}
