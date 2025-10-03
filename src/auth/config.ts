import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional()
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    ...(process.env.ENABLE_DEV_CREDENTIALS === 'true'
      ? [Credentials({
          credentials: { email: { label: 'Email', type: 'email' }, name: { label: 'Name', type: 'text' } },
          authorize: async (creds) => {
            const parsed = credentialsSchema.safeParse(creds)
            if (!parsed.success) return null
            const email = parsed.data.email.toLowerCase()
            return { id: email, email, name: parsed.data.name ?? email.split('@')[0] }
          }
        })]
      : [])
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token?.id) (session.user as any).id = token.id
      return session
    }
  }
})
