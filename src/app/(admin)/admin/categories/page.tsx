"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryForm } from "@/components/admin/category-form"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { getAllCategories, toggleCategoryActive } from "@/actions/category.actions"
import { toast } from "sonner"
import { Plus, Pencil } from "lucide-react"

interface CategoryItem {
  id: string
  name: string
  description: string | null
  color: string | null
  sortOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<CategoryItem | null>(null)
  const [toggleConfirm, setToggleConfirm] = useState<CategoryItem | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchCategories() {
    const cats = await getAllCategories()
    setCategories(cats)
  }

  useEffect(() => { fetchCategories() }, [])

  async function handleToggle() {
    if (!toggleConfirm) return
    setLoading(true)
    try {
      await toggleCategoryActive(toggleConfirm.id)
      toast.success(toggleConfirm.isActive ? "分类已停用" : "分类已启用")
      fetchCategories()
    } catch {
      toast.error("操作失败")
    } finally {
      setLoading(false)
      setToggleConfirm(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">分类管理</h1>
        <Button onClick={() => { setShowForm(true); setEditing(null) }}>
          <Plus className="mr-2 h-4 w-4" />
          新建分类
        </Button>
      </div>

      {(showForm || editing) && (
        <CategoryForm
          category={editing || undefined}
          onSuccess={() => { setShowForm(false); setEditing(null); fetchCategories() }}
        />
      )}

      {categories.length === 0 ? (
        <EmptyState title="还没有分类" description="点击按钮创建第一个分类" />
      ) : (
        <div className="grid gap-2">
          {categories.map((cat) => (
            <Card key={cat.id} className={cat.isActive ? "" : "opacity-60"}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {cat.color && (
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{cat.name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {cat.isActive ? "启用" : "停用"}
                      </Badge>
                    </div>
                    {cat.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => { setEditing(cat); setShowForm(false) }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setToggleConfirm(cat)}
                  >
                    {cat.isActive ? "停用" : "启用"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toggleConfirm}
        onOpenChange={() => setToggleConfirm(null)}
        title={toggleConfirm?.isActive ? "停用分类" : "启用分类"}
        description={`确定要${toggleConfirm?.isActive ? "停用" : "启用"}「${toggleConfirm?.name}」分类吗？`}
        onConfirm={handleToggle}
        loading={loading}
      />
    </div>
  )
}
