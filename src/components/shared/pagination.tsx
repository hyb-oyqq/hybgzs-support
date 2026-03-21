"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm px-3 py-1.5 rounded-lg bg-secondary">
        <span className="text-primary font-bold">{currentPage}</span>
        <span className="text-muted-foreground"> / {totalPages}</span>
      </span>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
