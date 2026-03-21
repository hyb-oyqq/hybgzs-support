import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Headset, ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-[60px]" />

      <div className="text-center space-y-5 relative z-10">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
          <Headset className="h-8 w-8 text-primary" />
        </div>
        <p className="text-7xl font-extrabold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </p>
        <h1 className="text-xl font-bold">页面未找到</h1>
        <p className="text-sm text-muted-foreground max-w-sm">你访问的页面不存在或已被移除</p>
        <Link href="/">
          <Button className="rounded-full px-6 mt-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  )
}
