// @ts-nocheck
import { PrismaClient } from "../src/generated/prisma/client"

const prisma = new PrismaClient()

const categories = [
  { name: "一般咨询", description: "一般问题和咨询", sortOrder: 0 },
  { name: "技术问题", description: "技术相关的问题和故障", sortOrder: 1 },
  { name: "功能建议", description: "功能需求和改进建议", sortOrder: 2 },
  { name: "Bug 反馈", description: "程序错误和异常报告", sortOrder: 3 },
  { name: "账户问题", description: "账户、登录和权限相关", sortOrder: 4 },
]

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    })
  }
  console.log("种子数据已创建")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
