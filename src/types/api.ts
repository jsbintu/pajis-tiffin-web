// User and Auth Types
export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  role: "customer" | "admin"
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Subscription Types
export type SubscriptionStatus =
  | "active"
  | "paused"
  | "cancelled"
  | "pending"
  | "past_due"
  | "expired"

export type BillingCycle = "weekly" | "monthly"

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: SubscriptionStatus
  billingCycle: BillingCycle
  startDate: string
  nextBillingDate: string | null
  cancelledAt: string | null
  pausedAt: string | null
  resumeDate: string | null
  braintreeSubscriptionId: string | null
  amount: string
  createdAt: string
  updatedAt: string
  plan?: SubscriptionPlan
  addOns?: SubscriptionAddOn[]
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string | null
  weeklyPrice: string
  monthlyPrice: string
  mealsPerWeek: number
  features?: string[]
  isActive: boolean
  active?: boolean // Keep for backwards compatibility
  createdAt: string
  updatedAt: string
}

export interface AddOn {
  id: string
  name: string
  description: string | null
  weeklyPrice: string
  monthlyPrice: string
  isActive: boolean
  active?: boolean // Keep for backwards compatibility
  createdAt: string
  updatedAt: string
}

export interface SubscriptionAddOn {
  id: string
  subscriptionId: string
  addOnId: string
  quantity: number
  addOn?: AddOn
}

export interface CreateSubscriptionRequest {
  planId: string
  billingCycle: BillingCycle
  startDate: string
  paymentMethodNonce: string
  addOns?: Array<{
    addOnId: string
    quantity: number
  }>
}

export interface UpdateSubscriptionRequest {
  planId?: string
  billingCycle?: BillingCycle
  addOns?: Array<{
    addOnId: string
    quantity: number
  }>
}

// Payment Types
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"

export interface Payment {
  id: string
  userId: string
  subscriptionId: string | null
  amount: string
  status: PaymentStatus
  braintreeTransactionId: string | null
  paymentMethodToken: string | null
  failureReason: string | null
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  token: string
  cardType: string
  last4: string
  expirationMonth: string
  expirationYear: string
  isDefault: boolean
  createdAt: string
}

export interface ClientTokenResponse {
  clientToken: string
}

export interface ProcessPaymentRequest {
  paymentMethodNonce: string
  amount: number
  subscriptionId?: string
}

export interface ProcessPaymentResponse {
  success: boolean
  transactionId?: string
  message?: string
}

// Delivery Types
export type DeliveryStatus = "pending" | "in_transit" | "delivered" | "cancelled"

export interface Delivery {
  id: string
  subscriptionId: string
  scheduledDate: string
  deliveryAddress: string
  status: DeliveryStatus
  deliveredAt: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

// Address Types
export interface Address {
  id: string
  userId: string
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAddressRequest {
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault?: boolean
}

// Notification Types
export interface NotificationPreferences {
  id: string
  userId: string
  emailNotifications: boolean
  smsNotifications: boolean
  deliveryReminders: boolean
  paymentReminders: boolean
  promotionalEmails: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateNotificationPreferencesRequest {
  emailNotifications?: boolean
  smsNotifications?: boolean
  deliveryReminders?: boolean
  paymentReminders?: boolean
  promotionalEmails?: boolean
}

// API Response Types
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

// Filter and Sort Types
export interface SubscriptionFilters {
  status?: SubscriptionStatus
  billingCycle?: BillingCycle
  search?: string
}

export interface PaymentFilters {
  status?: PaymentStatus
  dateFrom?: string
  dateTo?: string
  subscriptionId?: string
}

export interface DeliveryFilters {
  status?: DeliveryStatus
  dateFrom?: string
  dateTo?: string
  subscriptionId?: string
}
