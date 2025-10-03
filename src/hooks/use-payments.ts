import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type {
  Payment,
  PaymentMethod,
  ClientTokenResponse,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
} from "@/types/api"
import { api, withAuth } from "@/lib/api-client"

// Query keys
export const paymentKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentKeys.all, "list"] as const,
  detail: (id: string) => [...paymentKeys.all, id] as const,
  methods: () => ["payment-methods"] as const,
  clientToken: () => ["client-token"] as const,
}

// API calls
async function getPayments(): Promise<Payment[]> {
  return api.get<Payment[]>("/payments", withAuth())
}

async function getPayment(id: string): Promise<Payment> {
  return api.get<Payment>(`/payments/${id}`, withAuth())
}

async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return api.get<PaymentMethod[]>("/payments/methods", withAuth())
}

async function getClientToken(): Promise<ClientTokenResponse> {
  return api.get<ClientTokenResponse>("/payments/client-token", withAuth())
}

async function processPayment(
  data: ProcessPaymentRequest
): Promise<ProcessPaymentResponse> {
  return api.post<ProcessPaymentResponse>("/payments/process", data, withAuth())
}

async function addPaymentMethod(paymentMethodNonce: string): Promise<PaymentMethod> {
  return api.post<PaymentMethod>(
    "/payments/methods",
    { paymentMethodNonce },
    withAuth()
  )
}

async function removePaymentMethod(token: string): Promise<void> {
  return api.delete<void>(`/payments/methods/${token}`, withAuth())
}

async function setDefaultPaymentMethod(token: string): Promise<void> {
  return api.post<void>(
    `/payments/methods/${token}/set-default`,
    undefined,
    withAuth()
  )
}

// Hooks
export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.lists(),
    queryFn: getPayments,
  })
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: paymentKeys.detail(id),
    queryFn: () => getPayment(id),
    enabled: !!id,
  })
}

export function usePaymentMethods() {
  return useQuery({
    queryKey: paymentKeys.methods(),
    queryFn: getPaymentMethods,
  })
}

export function useClientToken() {
  return useQuery({
    queryKey: paymentKeys.clientToken(),
    queryFn: getClientToken,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useProcessPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: processPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all })
    },
  })
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.methods() })
    },
  })
}

export function useRemovePaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.methods() })
    },
  })
}

export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setDefaultPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.methods() })
    },
  })
}
