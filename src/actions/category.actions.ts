"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getActiveCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })
}

export async function getAllCategories() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")

  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } })
}

export async function createCategory(data: {
  name: string
  description?: string
  color?: string
  sortOrder?: number
}) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")

  const category = await prisma.category.create({ data })
  revalidatePath("/admin/categories")
  return category
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string; color?: string; sortOrder?: number }
) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")

  const category = await prisma.category.update({ where: { id }, data })
  revalidatePath("/admin/categories")
  return category
}

export async function toggleCategoryActive(id: string) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("无权操作")

  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) throw new Error("分类不存在")

  const updated = await prisma.category.update({
    where: { id },
    data: { isActive: !category.isActive },
  })

  revalidatePath("/admin/categories")
  return updated
}
