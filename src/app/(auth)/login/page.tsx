"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Headset, Globe } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm relative">
      <div className="absolute -top-16 right-0">
        <ThemeToggle />
      </div>

      <Card className="border shadow-xl shadow-primary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-accent" />
        <CardHeader className="text-center space-y-2 pb-4 pt-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-2 shadow-lg shadow-primary/20">
            <Headset className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">黑与白支持</CardTitle>
          <CardDescription className="text-sm">选择登录方式以提交和管理工单</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pb-8">
          <Button
            className="w-full h-12 font-semibold rounded-xl text-base"
            onClick={() => signIn("hyb", { callbackUrl: "/dashboard" })}
          >
            <Headset className="mr-2 h-4 w-4" />
            黑与白通行证登录
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 font-semibold rounded-xl text-base"
            onClick={() => signIn("linuxdo", { callbackUrl: "/dashboard" })}
          >
            <Globe className="mr-2 h-4 w-4" />
            LinuxDo 登录
          </Button>
          <p className="text-xs text-muted-foreground text-center pt-3">
            &copy; {new Date().getFullYear()} 黑与白 &middot; 保留所有权利
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
