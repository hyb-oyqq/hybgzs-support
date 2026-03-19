import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { authConfig } from "@/lib/auth.config"
import type { Role } from "@/generated/prisma/client"

function processLinuxDoProfile(profile: Record<string, unknown>) {
  let avatarUrl = (profile.avatar_url || profile.avatar_template) as string | undefined
  if (avatarUrl && avatarUrl.includes("{size}")) {
    avatarUrl = avatarUrl.replace("{size}", "120")
  }
  if (avatarUrl && avatarUrl.startsWith("/")) {
    avatarUrl = "https://connect.linux.do" + avatarUrl
  }
  return {
    id: String(profile.id),
    name: (profile.username || profile.name || "LinuxDo用户") as string,
    email: profile.email as string | undefined,
    image: avatarUrl,
  }
}

const HYBProvider = {
  id: "hyb",
  name: "黑与白通行证",
  type: "oauth" as const,
  authorization: {
    url: "https://account.hybgzs.com/oauth/authorize",
    params: {
      scope: "read:user read:email read:profile read:qq read:avatar read:level",
      response_type: "code",
    },
  },
  token: "https://account.hybgzs.com/oauth/token",
  userinfo: "https://account.hybgzs.com/oauth/userinfo",
  clientId: process.env.HYB_CLIENT_ID,
  clientSecret: process.env.HYB_CLIENT_SECRET,
  profile(profile: Record<string, unknown>) {
    return {
      id: String(profile.sub),
      name: (profile.preferred_username || profile.name) as string,
      email: profile.email as string | undefined,
      image: profile.avatar as string | undefined,
    }
  },
}

const LinuxDoProvider = {
  id: "linuxdo",
  name: "LinuxDo",
  type: "oauth" as const,
  authorization: {
    url: "https://connect.linux.do/oauth2/authorize",
    params: {
      scope: "read",
      response_type: "code",
    },
  },
  token: "https://connect.linuxdo.org/oauth2/token",
  userinfo: "https://connect.linuxdo.org/api/user",
  clientId: process.env.LINUXDO_CLIENT_ID,
  clientSecret: process.env.LINUXDO_CLIENT_SECRET,
  profile: processLinuxDoProfile,
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as never,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [HYBProvider as never, LinuxDoProvider as never],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      if (!user?.email) return true
      const adminEmails = (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
      if (adminEmails.includes(user.email.toLowerCase())) {
        await prisma.user.update({
          where: { email: user.email },
          data: { role: "ADMIN" },
        }).catch(() => {})
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!
        token.role = (user as { role: Role }).role ?? "USER"
      }
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        })
        if (dbUser) token.role = dbUser.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
      }
      return session
    },
  },
})
