"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-auth"
import { Skeleton } from "@/components/ui/skeleton"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter()
  const { data: user, isLoading, isError } = useCurrentUser()

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.push("/login")
    }

    if (!isLoading && user && requireAdmin && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, isLoading, isError, requireAdmin, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-64 w-96" />
        </div>
      </div>
    )
  }

  if (!user || (requireAdmin && user.role !== "admin")) {
    return null
  }

  return <>{children}</>
}
