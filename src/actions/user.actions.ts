"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import type { Role } from "@/generated/prisma/client"

export async function getAllUsers(params?: {
  page?: number
  pageSize?: number
  role?: Role
  search?: string
}) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")

  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10

  const where = {
    ...(params?.role && { role: params.role }),
    ...(params?.search && {
      OR: [
        { name: { contains: params.search, mode: "insensitive" as const } },
        { email: { contains: params.search, mode: "insensitive" as const } },
      ],
    }),
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { _count: { select: { tickets: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count({ where }),
  ])

  return { users, total, totalPages: Math.ceil(total / pageSize) }
}

export async function updateUserRole(userId: string, role: Role) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")
  if (session.user.id === userId) throw new Error("不能修改自己的角色")

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  revalidatePath("/admin/users")
  return user
}
