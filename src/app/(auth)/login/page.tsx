"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Shield, Globe } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm relative">
      <div className="absolute -top-16 right-0">
        <ThemeToggle />
      </div>
      <Card className="border shadow-sm">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight">黑与白支持</CardTitle>
          <CardDescription className="text-sm">选择登录方式以提交和管理工单</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full h-11 font-medium"
            onClick={() => signIn("hyb", { callbackUrl: "/dashboard" })}
          >
            <Shield className="mr-2 h-4 w-4" />
            黑与白通行证登录
          </Button>
          <Button
            variant="outline"
            className="w-full h-11 font-medium"
            onClick={() => signIn("linuxdo", { callbackUrl: "/dashboard" })}
          >
            <Globe className="mr-2 h-4 w-4" />
            LinuxDo 登录
          </Button>
          <p className="text-xs text-muted-foreground text-center pt-2">
            &copy; {new Date().getFullYear()} 黑与白 &middot; 保留所有权利
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
