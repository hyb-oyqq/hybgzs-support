import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Headset,
  TicketCheck,
  MessageCircle,
  Bot,
  Zap,
  Shield,
  ArrowRight,
  Mail,
  Globe,
  Smartphone,
} from "lucide-react"

export default async function HomePage() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 导航 */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Headset className="h-4 w-4 text-primary-foreground" />
            </div>
            黑与白支持
          </div>
          <Link href="/login">
            <Button size="sm" className="rounded-full px-5">
              登录
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-accent/15 rounded-full blur-[80px]" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-24 md:pt-28 md:pb-32 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Zap className="h-3.5 w-3.5 text-primary" />
              更快速、更智能的工单支持体验
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
              让每一个问题
              <br />
              <span className="text-primary">都被认真对待</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              提交工单、实时追踪进度、与客服团队无缝对话。
              简洁高效的支持系统，让你的问题不再被遗忘。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
                  立即开始
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section id="features" className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">强大而贴心的功能</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              从提交到解决，每个环节都精心设计
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: TicketCheck,
                title: "工单管理",
                desc: "创建、追踪、管理你的所有支持工单，实时查看处理进度和状态变更",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: MessageCircle,
                title: "实时对话",
                desc: "与支持团队直接对话，消息实时同步，问题沟通更高效",
                color: "bg-accent/20 text-accent-foreground",
              },
              {
                icon: Bot,
                title: "AI 智能辅助",
                desc: "AI 自动分类工单优先级，智能推荐解决方案，加速问题处理",
                color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
              },
              {
                icon: Shield,
                title: "安全认证",
                desc: "通过黑与白通行证或 LinuxDo 账号安全登录，数据全程加密保护",
                color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
              },
              {
                icon: Zap,
                title: "高效处理",
                desc: "智能分配、优先级排序、分类管理，确保每个工单都能快速响应",
                color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
              },
              {
                icon: Globe,
                title: "全渠道接入",
                desc: "支持网页、移动端多渠道接入，随时随地提交和管理工单",
                color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-card rounded-2xl border p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 全渠道展示 */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                全渠道统一管理
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                无论你的用户从哪个渠道发起请求，所有工单都会汇聚到同一个平台。
                统一查看、统一回复、统一追踪。
              </p>
              <div className="space-y-4">
                {[
                  { icon: Globe, label: "网页端工单提交", desc: "浏览器直接访问，随时提交" },
                  { icon: Smartphone, label: "移动端响应式", desc: "手机平板完美适配" },
                  { icon: Mail, label: "消息通知", desc: "状态变更实时提醒" },
                ].map((ch) => (
                  <div key={ch.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ch.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{ch.label}</p>
                      <p className="text-xs text-muted-foreground">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 工单预览卡片 */}
            <div className="bg-card rounded-2xl border shadow-lg shadow-primary/5 p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold">工单预览</h3>
                <span className="text-xs text-muted-foreground">最近更新</span>
              </div>
              {[
                { title: "无法正常登录账户", status: "待处理", statusColor: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300", time: "2 分钟前" },
                { title: "订单支付异常", status: "处理中", statusColor: "bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300", time: "15 分钟前" },
                { title: "功能建议：增加导出功能", status: "已解决", statusColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300", time: "1 小时前" },
              ].map((t) => (
                <div key={t.title} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.time}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 ${t.statusColor}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/60 p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
            <div className="relative z-10 space-y-5 max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                准备好开始了吗？
              </h2>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                只需一个账号，即可享受完整的工单支持服务
              </p>
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 h-12 bg-white text-primary hover:bg-white/90 font-bold shadow-lg mt-2">
                  免费开始使用
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <Headset className="h-3 w-3 text-primary-foreground" />
            </div>
            黑与白支持
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 黑与白 &middot; 保留所有权利
          </p>
        </div>
      </footer>
    </div>
  )
}
