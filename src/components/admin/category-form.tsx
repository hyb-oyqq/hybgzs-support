"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createCategory, updateCategory } from "@/actions/category.actions"
import { toast } from "sonner"

interface CategoryFormProps {
  category?: { id: string; name: string; description: string | null; color: string | null; sortOrder: number }
  onSuccess?: () => void
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "")
  const [description, setDescription] = useState(category?.description || "")
  const [color, setColor] = useState(category?.color || "")
  const [sortOrder, setSortOrder] = useState(category?.sortOrder ?? 0)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { toast.error("请输入分类名称"); return }

    setLoading(true)
    try {
      if (category) {
        await updateCategory(category.id, {
          name: name.trim(),
          description: description.trim() || undefined,
          color: color.trim() || undefined,
          sortOrder,
        })
        toast.success("分类已更新")
      } else {
        await createCategory({
          name: name.trim(),
          description: description.trim() || undefined,
          color: color.trim() || undefined,
          sortOrder,
        })
        toast.success("分类已创建")
        setName(""); setDescription(""); setColor(""); setSortOrder(0)
      }
      onSuccess?.()
    } catch {
      toast.error("操作失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{category ? "编辑分类" : "新建分类"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>名称</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="分类名称" required />
          </div>
          <div className="space-y-2">
            <Label>描述 (可选)</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="分类描述" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>颜色 (可选)</Label>
              <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="#000000" />
            </div>
            <div className="space-y-2">
              <Label>排序</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "保存中..." : category ? "更新分类" : "创建分类"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
