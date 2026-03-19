"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import type { TicketStatus, Priority } from "@/generated/prisma/client"

export async function createTicket(data: {
  title: string
  description: string
  priority: Priority
  categoryId?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("未登录")

  const ticket = await prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      categoryId: data.categoryId || null,
      userId: session.user.id,
    },
  })

  revalidatePath("/tickets")
  revalidatePath("/dashboard")
  return ticket
}

export async function getMyTickets(params?: {
  page?: number
  pageSize?: number
  status?: TicketStatus
  search?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("未登录")

  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10

  const where = {
    userId: session.user.id,
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
      include: { category: true, _count: { select: { replies: true } } },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.ticket.count({ where }),
  ])

  return { tickets, total, totalPages: Math.ceil(total / pageSize) }
}

export async function getTicketById(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("未登录")

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      category: true,
      user: { select: { id: true, name: true, image: true } },
      replies: {
        include: { user: { select: { id: true, name: true, image: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  })

  if (!ticket) return null

  // 普通用户只能看自己的工单
  if (session.user.role !== "ADMIN" && ticket.userId !== session.user.id) {
    return null
  }

  return ticket
}

export async function getMyTicketStats() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("未登录")

  const [total, open, resolved] = await Promise.all([
    prisma.ticket.count({ where: { userId: session.user.id } }),
    prisma.ticket.count({ where: { userId: session.user.id, status: "OPEN" } }),
    prisma.ticket.count({ where: { userId: session.user.id, status: "RESOLVED" } }),
  ])

  return { total, open, resolved }
}

export async function getRecentTickets() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("未登录")

  return prisma.ticket.findMany({
    where: { userId: session.user.id },
    include: { category: true },
    orderBy: { updatedAt: "desc" },
    take: 5,
  })
}
