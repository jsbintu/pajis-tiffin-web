"use client";
import { useSession, signIn, signOut } from 'next-auth/react'

export default function UserNav() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <span className="text-gray-500">…</span>
  if (!session?.user) return (
    <button onClick={() => signIn()} className="px-2 py-1 border rounded">Sign in</button>
  )
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-700">{session.user.name || session.user.email}</span>
      <button onClick={() => signOut()} className="px-2 py-1 border rounded">Sign out</button>
    </div>
  )
}
