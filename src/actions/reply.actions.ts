"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createReply(data: { ticketId: string; content: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("未登录")

  const ticket = await prisma.ticket.findUnique({ where: { id: data.ticketId } })
  if (!ticket) throw new Error("工单不存在")

  // 普通用户只能在自己的工单下回复
  if (session.user.role !== "ADMIN" && ticket.userId !== session.user.id) {
    throw new Error("无权操作")
  }

  const reply = await prisma.reply.create({
    data: {
      content: data.content,
      ticketId: data.ticketId,
      userId: session.user.id,
      isAdminReply: session.user.role === "ADMIN",
    },
  })

  // 更新工单的 updatedAt
  await prisma.ticket.update({
    where: { id: data.ticketId },
    data: { updatedAt: new Date() },
  })

  revalidatePath(`/tickets/${data.ticketId}`)
  revalidatePath(`/admin/tickets/${data.ticketId}`)
  return reply
}
