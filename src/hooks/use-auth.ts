import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/api"
import {
  api,
  getAuthToken,
  removeAuthToken,
  setAuthToken,
  withAuth,
} from "@/lib/api-client"

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
}

// API calls
async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
  return api.post<AuthResponse>("/auth/login", credentials)
}

async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  return api.post<AuthResponse>("/auth/register", data)
}

async function getCurrentUser(): Promise<User> {
  return api.get<User>("/auth/me", withAuth())
}

async function logoutUser(): Promise<void> {
  await api.post<void>("/auth/logout", undefined, withAuth())
}

// Hooks
export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthToken(data.token)
      queryClient.setQueryData(authKeys.user(), data.user)
      router.push("/dashboard")
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuthToken(data.token)
      queryClient.setQueryData(authKeys.user(), data.user)
      router.push("/dashboard")
    },
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    enabled: !!getAuthToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      removeAuthToken()
      queryClient.clear()
      router.push("/login")
    },
    onError: () => {
      // Even if the API call fails, clear local state
      removeAuthToken()
      queryClient.clear()
      router.push("/login")
    },
  })
}

// Helper hook to check if user is authenticated
export function useIsAuthenticated(): boolean {
  const { data: user } = useCurrentUser()
  return !!user
}

// Helper hook to check if user is admin
export function useIsAdmin(): boolean {
  const { data: user } = useCurrentUser()
  return user?.role === "admin"
}
