export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 dark:from-primary/5 dark:via-background dark:to-accent/5 p-4">
      {children}
    </div>
  )
}
