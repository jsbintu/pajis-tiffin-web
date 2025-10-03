import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type {
  Subscription,
  SubscriptionPlan,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  AddOn,
} from "@/types/api"
import { api, withAuth } from "@/lib/api-client"

// Query keys
export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  lists: () => [...subscriptionKeys.all, "list"] as const,
  list: (filters: string) => [...subscriptionKeys.lists(), { filters }] as const,
  details: () => [...subscriptionKeys.all, "detail"] as const,
  detail: (id: string) => [...subscriptionKeys.details(), id] as const,
  current: () => [...subscriptionKeys.all, "current"] as const,
  plans: () => ["subscription-plans"] as const,
  addOns: () => ["add-ons"] as const,
}

// API calls
async function getSubscriptions(): Promise<Subscription[]> {
  return api.get<Subscription[]>("/subscriptions", withAuth())
}

async function getSubscription(id: string): Promise<Subscription> {
  return api.get<Subscription>(`/subscriptions/${id}`, withAuth())
}

async function getCurrentSubscription(): Promise<Subscription | null> {
  return api.get<Subscription | null>("/subscriptions/current", withAuth())
}

async function createSubscription(
  data: CreateSubscriptionRequest
): Promise<Subscription> {
  return api.post<Subscription>("/subscriptions", data, withAuth())
}

async function updateSubscription(
  id: string,
  data: UpdateSubscriptionRequest
): Promise<Subscription> {
  return api.put<Subscription>(`/subscriptions/${id}`, data, withAuth())
}

async function pauseSubscription(id: string): Promise<Subscription> {
  return api.post<Subscription>(`/subscriptions/${id}/pause`, undefined, withAuth())
}

async function resumeSubscription(id: string): Promise<Subscription> {
  return api.post<Subscription>(`/subscriptions/${id}/resume`, undefined, withAuth())
}

async function cancelSubscription(id: string): Promise<Subscription> {
  return api.post<Subscription>(`/subscriptions/${id}/cancel`, undefined, withAuth())
}

import { mockSubscriptionPlans, mockAddOns } from "@/lib/mock-data"

async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    return await api.get<SubscriptionPlan[]>("/subscription-plans")
  } catch (error) {
    // Fallback to mock data for development
    console.warn("Using mock subscription plans data")
    return mockSubscriptionPlans
  }
}

async function getAddOns(): Promise<AddOn[]> {
  try {
    return await api.get<AddOn[]>("/add-ons")
  } catch (error) {
    // Fallback to mock data for development
    console.warn("Using mock add-ons data")
    return mockAddOns
  }
}

// Hooks
export function useSubscriptions() {
  return useQuery({
    queryKey: subscriptionKeys.lists(),
    queryFn: getSubscriptions,
  })
}

export function useSubscription(id: string) {
  return useQuery({
    queryKey: subscriptionKeys.detail(id),
    queryFn: () => getSubscription(id),
    enabled: !!id,
  })
}

export function useCurrentSubscription() {
  return useQuery({
    queryKey: subscriptionKeys.current(),
    queryFn: getCurrentSubscription,
  })
}

export function useCreateSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
    },
  })
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionRequest }) =>
      updateSubscription(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() })
    },
  })
}

export function usePauseSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: pauseSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
    },
  })
}

export function useResumeSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: resumeSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
    },
  })
}

export function useCancelSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
    },
  })
}

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: getSubscriptionPlans,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useAddOns() {
  return useQuery({
    queryKey: subscriptionKeys.addOns(),
    queryFn: getAddOns,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}
