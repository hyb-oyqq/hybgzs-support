import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ThemeToggle } from "@/components/shared/theme-toggle"

export default async function HomePage() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">黑与白支持</h1>
          <p className="text-muted-foreground">
            提交工单、追踪进度、获取帮助
          </p>
        </div>
        <Link href="/login">
          <Button size="lg" className="px-8">
            登录以开始
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} 黑与白 &middot; 保留所有权利
        </p>
      </div>
    </div>
  )
}
