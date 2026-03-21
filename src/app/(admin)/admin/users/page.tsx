"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserTable } from "@/components/admin/user-table"
import { Pagination } from "@/components/shared/pagination"
import { EmptyState } from "@/components/shared/empty-state"
import { getAllUsers } from "@/actions/user.actions"
import { ROLE_LABELS } from "@/lib/constants"
import { Search } from "lucide-react"
import type { Role } from "@/generated/prisma/enums"

interface UserItem {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: Role
  createdAt: Date
  _count: { tickets: number }
}

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<UserItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("ALL")
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllUsers({
        page,
        role: role === "ALL" ? undefined : (role as Role),
        search: search || undefined,
      })
      setUsers(res.users)
      setTotalPages(res.totalPages)
    } finally {
      setLoading(false)
    }
  }, [page, role, search])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2.5">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          用户管理
        </h1>
        <p className="text-sm text-muted-foreground mt-1 ml-4">管理系统用户和角色权限</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索用户..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9 rounded-xl"
          />
        </div>
        <Select value={role} onValueChange={(v) => { setRole(v ?? "ALL"); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-36 rounded-xl">
            <SelectValue placeholder="全部角色" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="ALL">全部角色</SelectItem>
            {Object.entries(ROLE_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 bg-muted/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyState title="没有找到用户" description="试试调整筛选条件" />
      ) : (
        <>
          <UserTable users={users} currentUserId={session?.user?.id || ""} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
