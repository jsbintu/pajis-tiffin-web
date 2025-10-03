import { z } from "zod"

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Address schema
export const addressSchema = z.object({
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  postalCode: z
    .string()
    .regex(/^[A-Z]\d[A-Z] \d[A-Z]\d$/, "Invalid postal code format (e.g., A1A 1A1)"),
  country: z.string().default("Canada"),
  isDefault: z.boolean().default(false),
})

// Subscription schema
export const createSubscriptionSchema = z.object({
  planId: z.string().min(1, "Please select a plan"),
  billingCycle: z.enum(["weekly", "monthly"]),
  startDate: z.string().min(1, "Start date is required"),
  addOns: z.array(z.object({
    addOnId: z.string(),
    quantity: z.number().min(1).max(10),
  })).optional(),
})

// Profile update schema
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
})

// Notification preferences schema
export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  deliveryReminders: z.boolean(),
  paymentReminders: z.boolean(),
  promotionalEmails: z.boolean(),
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type NotificationPreferencesInput = z.infer<typeof notificationPreferencesSchema>
