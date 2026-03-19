import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-4">
        <p className="text-6xl font-semibold font-mono text-muted-foreground">404</p>
        <h1 className="text-xl font-semibold">页面未找到</h1>
        <p className="text-sm text-muted-foreground">你访问的页面不存在或已被移除</p>
        <Link href="/">
          <Button variant="outline">返回首页</Button>
        </Link>
      </div>
    </div>
  )
}
