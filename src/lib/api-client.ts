import type { ApiError } from "@/types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ApiClientError"
  }
}

interface RequestOptions extends RequestInit {
  token?: string
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ApiError
    try {
      errorData = await response.json()
    } catch {
      throw new ApiClientError(
        response.statusText || "An error occurred",
        response.status
      )
    }

    throw new ApiClientError(
      errorData.message || "An error occurred",
      response.status,
      errorData.errors
    )
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T
  }

  try {
    return await response.json()
  } catch {
    throw new ApiClientError("Invalid JSON response", response.status)
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...restOptions } = options

  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  })

  return handleResponse<T>(response)
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
}

// Helper to get auth token from localStorage (client-side only)
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

// Helper to set auth token
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("auth_token", token)
}

// Helper to remove auth token
export function removeAuthToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
}

// Helper to create authenticated request options
export function withAuth(options: RequestOptions = {}): RequestOptions {
  const token = getAuthToken()
  return token ? { ...options, token } : options
}
