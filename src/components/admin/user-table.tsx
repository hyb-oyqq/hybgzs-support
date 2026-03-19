"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { updateUserRole } from "@/actions/user.actions"
import { ROLE_LABELS } from "@/lib/constants"
import { toast } from "sonner"
import type { Role } from "@/generated/prisma/enums"

interface UserRow {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: Role
  createdAt: Date
  _count: { tickets: number }
}

export function UserTable({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  const [confirm, setConfirm] = useState<{ userId: string; role: Role } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!confirm) return
    setLoading(true)
    try {
      await updateUserRole(confirm.userId, confirm.role)
      toast.success("角色已更新")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "操作失败")
    } finally {
      setLoading(false)
      setConfirm(null)
    }
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">用户</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">邮箱</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">角色</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">工单数</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">注册时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.image || undefined} />
                      <AvatarFallback className="text-[10px]">{(user.name || "U")[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.email || "-"}</TableCell>
                <TableCell>
                  {user.id === currentUserId ? (
                    <Badge variant="secondary">{ROLE_LABELS[user.role]}</Badge>
                  ) : (
                    <Select
                      value={user.role}
                      onValueChange={(role) => role && setConfirm({ userId: user.id, role: role as Role })}
                    >
                      <SelectTrigger className="w-24 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">用户</SelectItem>
                        <SelectItem value="ADMIN">管理员</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className="text-sm font-mono">{user._count.tickets}</TableCell>
                <TableCell className="text-sm text-muted-foreground text-right">
                  {new Date(user.createdAt).toLocaleDateString("zh-CN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        open={!!confirm}
        onOpenChange={() => setConfirm(null)}
        title="确认修改角色"
        description={`确定要将此用户的角色修改为「${confirm ? ROLE_LABELS[confirm.role] : ""}」吗？`}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </>
  )
}
