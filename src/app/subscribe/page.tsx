"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BraintreeDropin } from "@/components/payments/braintree-dropin"
import { useSubscriptionPlans, useAddOns, useCreateSubscription } from "@/hooks/use-subscriptions"
import { useToast } from "@/hooks/use-toast"
import { createSubscriptionSchema, addressSchema } from "@/lib/validations"
import type { CreateSubscriptionInput, AddressInput } from "@/lib/validations"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "Choose Plan" },
  { id: 2, name: "Add-ons" },
  { id: 3, name: "Delivery Details" },
  { id: 4, name: "Payment" },
]

function formatCurrency(amount: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(parseFloat(amount))
}

export default function SubscribePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [billingCycle, setBillingCycle] = useState<"weekly" | "monthly">("monthly")
  const [selectedAddOns, setSelectedAddOns] = useState<Array<{ addOnId: string; quantity: number }>>([])
  const [address, setAddress] = useState<AddressInput | null>(null)
  const [paymentNonce, setPaymentNonce] = useState<string>("")

  const { data: plans, isLoading: isLoadingPlans } = useSubscriptionPlans()
  const { data: addOns, isLoading: isLoadingAddOns } = useAddOns()
  const createSubscription = useCreateSubscription()

  // Auto-select the first plan when plans are loaded so the user can continue
  useEffect(() => {
    if (!selectedPlan && Array.isArray(plans) && plans.length > 0) {
      setSelectedPlan(plans[0].id)
    }
  }, [plans, selectedPlan])

  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      streetAddress: "",
      city: "",
      province: "ON",
      postalCode: "",
      country: "Canada",
      isDefault: true,
    },
  })

  const getPlanPrice = (planId: string) => {
    const plan = plans?.find((p) => p.id === planId)
    if (!plan) return "0"
    return billingCycle === "weekly" ? plan.weeklyPrice : plan.monthlyPrice
  }

  const getAddOnPrice = (addOnId: string) => {
    const addOn = addOns?.find((a) => a.id === addOnId)
    if (!addOn) return "0"
    return billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice
  }

  const calculateTotal = () => {
    let total = parseFloat(getPlanPrice(selectedPlan))
    selectedAddOns.forEach((item) => {
      total += parseFloat(getAddOnPrice(item.addOnId)) * item.quantity
    })
    return total.toFixed(2)
  }

  const handleAddOnQuantityChange = (addOnId: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.addOnId !== addOnId))
    } else {
      const existing = selectedAddOns.find((item) => item.addOnId === addOnId)
      if (existing) {
        setSelectedAddOns(
          selectedAddOns.map((item) =>
            item.addOnId === addOnId ? { ...item, quantity } : item
          )
        )
      } else {
        setSelectedAddOns([...selectedAddOns, { addOnId, quantity }])
      }
    }
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedPlan) {
      toast({
        title: "Please select a plan",
        variant: "destructive",
      })
      return
    }

    if (currentStep === 3) {
      addressForm.handleSubmit((data) => {
        setAddress(data)
        setCurrentStep(4)
      })()
      return
    }

    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePaymentReceived = async (nonce: string) => {
    setPaymentNonce(nonce)

    try {
      await createSubscription.mutateAsync({
        planId: selectedPlan,
        billingCycle,
        startDate: new Date().toISOString().split("T")[0],
        paymentMethodNonce: nonce,
        addOns: selectedAddOns.length > 0 ? selectedAddOns : undefined,
      })

      toast({
        title: "Success!",
        description: "Your subscription has been created successfully.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      })
    }
  }

  if (isLoadingPlans || isLoadingAddOns) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    currentStep >= step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="mt-2 text-sm font-medium">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-[2px] w-24",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Plan Selection */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Plan</CardTitle>
            <CardDescription>Select a meal plan that fits your needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 mb-4">
              <Button
                variant={billingCycle === "weekly" ? "default" : "outline"}
                onClick={() => setBillingCycle("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={billingCycle === "monthly" ? "default" : "outline"}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
                <Badge variant="secondary" className="ml-2">Save 15%</Badge>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Array.isArray(plans) && plans.length > 0 ? (
                plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedPlan === plan.id
                        ? "border-primary ring-2 ring-primary"
                        : "hover:border-primary/50"
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedPlan(plan.id)
                    }}
                    aria-pressed={selectedPlan === plan.id}
                  >
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {formatCurrency(
                          billingCycle === "weekly" ? plan.weeklyPrice : plan.monthlyPrice
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        per {billingCycle === "weekly" ? "week" : "month"}
                      </p>
                      <div className="mt-4">
                        <p className="text-sm">
                          <strong>{plan.mealsPerWeek}</strong> meals per week
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>No plans available</CardTitle>
                    <CardDescription>
                      We couldn’t load subscription plans. Please try again later.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" onClick={() => window.location.reload()}>Reload</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNextStep} disabled={!selectedPlan}>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Add-ons */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Add-ons (Optional)</CardTitle>
            <CardDescription>Customize your subscription with extras</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {addOns?.map((addOn) => {
              const selected = selectedAddOns.find((item) => item.addOnId === addOn.id)
              const quantity = selected?.quantity || 0

              return (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{addOn.name}</h4>
                    <p className="text-sm text-muted-foreground">{addOn.description}</p>
                    <p className="mt-1 font-semibold">
                      {formatCurrency(
                        billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice
                      )}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}/ {billingCycle === "weekly" ? "week" : "month"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOnQuantityChange(addOn.id, Math.max(0, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOnQuantityChange(addOn.id, Math.min(10, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNextStep}>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Delivery Address */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
            <CardDescription>Where should we deliver your meals?</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...addressForm}>
              <form className="space-y-4">
                <FormField
                  control={addressForm.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={addressForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Toronto" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input placeholder="ON" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={addressForm.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="A1A 1A1" {...field} />
                      </FormControl>
                      <FormDescription>Format: A1A 1A1</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNextStep}>
              Continue to Payment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 4: Payment */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Complete your subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-4 font-semibold">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{plans?.find((p) => p.id === selectedPlan)?.name}</span>
                  <span>{formatCurrency(getPlanPrice(selectedPlan))}</span>
                </div>
                {selectedAddOns.map((item) => {
                  const addOn = addOns?.find((a) => a.id === item.addOnId)
                  return (
                    <div key={item.addOnId} className="flex justify-between text-sm">
                      <span>
                        {addOn?.name} x {item.quantity}
                      </span>
                      <span>
                        {formatCurrency(
                          (parseFloat(getAddOnPrice(item.addOnId)) * item.quantity).toFixed(2)
                        )}
                      </span>
                    </div>
                  )
                })}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Billed {billingCycle}
                  </p>
                </div>
              </div>
            </div>

            {/* Braintree Drop-in */}
            <BraintreeDropin
              amount={formatCurrency(calculateTotal())}
              onPaymentMethodReceived={handlePaymentReceived}
              onError={(error) => {
                toast({
                  title: "Payment Error",
                  description: error.message,
                  variant: "destructive",
                })
              }}
              disabled={createSubscription.isPending}
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handlePrevStep} disabled={createSubscription.isPending}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
