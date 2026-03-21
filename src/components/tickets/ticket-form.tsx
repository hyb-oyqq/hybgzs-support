"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PRIORITY_LABELS } from "@/lib/constants"
import { createTicket } from "@/actions/ticket.actions"
import { getActiveCategories } from "@/actions/category.actions"
import { toast } from "sonner"
import { Send } from "lucide-react"
import type { Priority } from "@/generated/prisma/enums"

interface CategoryItem {
  id: string
  name: string
}

export function TicketForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("MEDIUM")
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    getActiveCategories().then(setCategories)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error("请填写标题和描述")
      return
    }

    setLoading(true)
    try {
      const ticket = await createTicket({
        title: title.trim(),
        description: description.trim(),
        priority,
        categoryId: categoryId || undefined,
      })
      toast.success("工单创建成功")
      router.push(`/tickets/${ticket.id}`)
    } catch {
      toast.error("创建失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2.5">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          新建工单
        </CardTitle>
        <p className="text-sm text-muted-foreground">请详细描述你遇到的问题，以便我们快速为你解决</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              placeholder="简要描述你的问题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">详细描述</Label>
            <Textarea
              id="description"
              placeholder="请详细描述你遇到的问题..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="rounded-xl"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>优先级</Label>
              <Select value={priority} onValueChange={(v) => v && setPriority(v as Priority)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITY_LABELS[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>分类</Label>
              <Select value={categoryId} onValueChange={(v) => setCategoryId(v ?? "")}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="选择分类 (可选)" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => router.back()}>
              取消
            </Button>
            <Button type="submit" className="rounded-xl" disabled={loading}>
              <Send className="mr-2 h-4 w-4" />
              {loading ? "提交中..." : "提交工单"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
