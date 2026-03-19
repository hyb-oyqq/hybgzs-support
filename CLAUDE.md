# CLAUDE.md — 黑与白支持工单系统

## 项目概览

**项目名称：** hybgzs-support（黑与白支持）
**项目类型：** 支持工单系统
**技术栈：** Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS v4 + Prisma 6 + PostgreSQL + NextAuth.js 5

用户通过「黑与白通行证」或「LinuxDo」第三方登录后可提交工单、查看进度、与管理员对话；管理员可管理所有工单、用户和自定义分类。

---

## 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16 | 全栈框架 (App Router) |
| React | 19 | UI 框架 |
| TypeScript | 5.9 | 类型安全 |
| Tailwind CSS | v4 | 样式方案 |
| Prisma | 6 | ORM |
| PostgreSQL | - | 主数据库 |
| NextAuth.js | 5.0.0-beta.30 | 认证 (OAuth2) |
| next-themes | - | 深色/浅色模式 |
| Lucide React | - | 图标 |

---

## 目录结构

```
src/
├── app/
│   ├── layout.tsx             # 根布局
│   ├── page.tsx               # 首页 (品牌页/重定向)
│   ├── globals.css
│   ├── api/auth/[...nextauth]/route.ts
│   ├── (auth)/                # 认证路由组
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── (main)/                # 用户路由组 (需登录)
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── tickets/page.tsx
│   │   ├── tickets/new/page.tsx
│   │   └── tickets/[id]/page.tsx
│   └── (admin)/               # 管理后台 (需ADMIN)
│       ├── layout.tsx
│       └── admin/
│           ├── page.tsx
│           ├── tickets/page.tsx
│           ├── tickets/[id]/page.tsx
│           ├── users/page.tsx
│           └── categories/page.tsx
├── components/
│   ├── ui/                    # shadcn/ui 组件
│   ├── layout/                # 导航栏、侧边栏
│   ├── auth/                  # 登录相关
│   ├── tickets/               # 工单组件
│   ├── replies/               # 回复组件
│   ├── admin/                 # 管理组件
│   └── shared/                # 公共组件
├── lib/
│   ├── prisma.ts              # Prisma 客户端单例
│   ├── auth.ts                # Auth.js 完整配置
│   ├── auth.config.ts         # Auth.js Edge配置
│   ├── utils.ts               # cn() 工具函数
│   └── constants.ts           # 状态/优先级映射
├── actions/                   # Server Actions
├── types/
│   └── next-auth.d.ts
└── middleware.ts
```

---

## 关键文件速查表

| 功能 | 文件 |
|------|------|
| 认证配置 | `src/lib/auth.ts`, `src/lib/auth.config.ts` |
| 根布局 | `src/app/layout.tsx` |
| 用户布局 | `src/app/(main)/layout.tsx` |
| 管理布局 | `src/app/(admin)/layout.tsx` |
| 工单操作 | `src/actions/ticket.actions.ts` |
| 回复操作 | `src/actions/reply.actions.ts` |
| 数据库 | `prisma/schema.prisma`, `src/lib/prisma.ts` |
| 中间件 | `src/middleware.ts` |
| 主题 | `src/components/shared/theme-provider.tsx` |

---

## 编码规范

1. **路径别名** `@/*` → `./src/*`
2. **类名合并** 使用 `cn()` from `@/lib/utils`
3. **组件风格** shadcn/ui 风格
4. **优先使用** Server Components
5. **数据库操作** 使用 `@/lib/prisma` 的单例实例
6. **状态/优先级标签** 使用 `@/lib/constants` 的中文映射

---

## 数据库操作约定

- 使用 `src/lib/prisma.ts` 导出的单例
- Server Actions 中操作数据库
- 管理操作需验证 role===ADMIN

---

## Git 提交风格

遵循 Conventional Commits，使用中文描述：
```
type(scope): 标题行

正文
```

---

## 开发命令

```bash
npm run dev          # 开发模式
npm run build        # 生产构建
npx prisma migrate dev  # 数据库迁移
npx prisma studio    # Prisma Studio
npx prisma db seed   # 种子数据
```
