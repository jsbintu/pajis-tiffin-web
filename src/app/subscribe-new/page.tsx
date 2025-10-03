"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, ChevronRight, Info, Star, Calendar, Users, Utensils, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useSubscriptionPlans, useAddOns } from "@/hooks/use-subscriptions"
import { cn } from "@/lib/utils"

function formatCurrency(amount: string) {
  return `₹${parseFloat(amount).toLocaleString("en-IN")}`
}

export default function SubscribeNewPage() {
  const router = useRouter()
  const { data: plans, isLoading: isLoadingPlans } = useSubscriptionPlans()
  const { data: addOns, isLoading: isLoadingAddOns } = useAddOns()
  
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [billingCycle, setBillingCycle] = useState<"weekly" | "monthly">("monthly")
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({})

  // Auto-select first plan
  useEffect(() => {
    if (!selectedPlan && Array.isArray(plans) && plans.length > 0) {
      setSelectedPlan(plans[0].id)
    }
  }, [plans, selectedPlan])

  const selectedPlanData = plans?.find(p => p.id === selectedPlan)
  
  const calculateTotal = () => {
    let total = 0
    if (selectedPlanData) {
      total += parseFloat(billingCycle === "weekly" ? selectedPlanData.weeklyPrice : selectedPlanData.monthlyPrice)
    }
    Object.entries(selectedAddOns).forEach(([addOnId, quantity]) => {
      const addOn = addOns?.find(a => a.id === addOnId)
      if (addOn && quantity > 0) {
        total += parseFloat(billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice) * quantity
      }
    })
    return total.toFixed(2)
  }

  const handleAddOnChange = (addOnId: string, delta: number) => {
    setSelectedAddOns(prev => {
      const current = prev[addOnId] || 0
      const newValue = Math.max(0, Math.min(10, current + delta))
      if (newValue === 0) {
        const { [addOnId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [addOnId]: newValue }
    })
  }

  const handleContinue = () => {
    // For now, just navigate to subscribe page with selected options
    router.push(`/subscribe?plan=${selectedPlan}&cycle=${billingCycle}`)
  }

  if (isLoadingPlans || isLoadingAddOns) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mx-auto mb-8" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 dark:from-background dark:via-background dark:to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ChefHat className="h-6 w-6" />
            Pajis Kitchen
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">Back to Home</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <Star className="mr-1 h-3 w-3 fill-current" />
            Join 10,000+ Happy Customers
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Choose Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-600">
              Meal Plan
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Authentic home-style Indian meals delivered fresh daily. No cooking, no hassle!
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-full">
            <Button
              variant={billingCycle === "weekly" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-full px-6", billingCycle === "weekly" && "shadow-sm")}
              onClick={() => setBillingCycle("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-full px-6 relative", billingCycle === "monthly" && "shadow-sm")}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
              <Badge className="ml-2 bg-green-600 text-white hover:bg-green-600 text-xs px-2 py-0">
                Save 15%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {plans?.map((plan) => {
            const isSelected = selectedPlan === plan.id
            const price = billingCycle === "weekly" ? plan.weeklyPrice : plan.monthlyPrice
            const isPremium = plan.name.toLowerCase().includes("premium")

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
                  isSelected
                    ? "border-2 border-primary ring-4 ring-primary/20 shadow-xl"
                    : "border-2 hover:border-primary/50",
                  isPremium && "border-primary"
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {isPremium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <Utensils className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {formatCurrency(price)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      per {billingCycle === "weekly" ? "week" : "month"}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{plan.mealsPerWeek} meals/week</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      "w-full",
                      isSelected
                        ? "bg-gradient-to-r from-green-600 to-green-700"
                        : "bg-muted hover:bg-muted/80"
                    )}
                    variant={isSelected ? "default" : "outline"}
                  >
                    {isSelected ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Selected
                      </>
                    ) : (
                      "Select Plan"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add-ons Section */}
        {addOns && addOns.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Customize with Add-ons
              </CardTitle>
              <CardDescription>
                Enhance your meals with delicious extras (optional)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {addOns.map((addOn) => {
                const quantity = selectedAddOns[addOn.id] || 0
                const price = billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice

                return (
                  <div
                    key={addOn.id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{addOn.name}</h4>
                      <p className="text-sm text-muted-foreground">{addOn.description}</p>
                      <p className="mt-2 font-semibold text-primary">
                        {formatCurrency(price)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}/ {billingCycle === "weekly" ? "week" : "month"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddOnChange(addOn.id, -1)}
                        disabled={quantity === 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddOnChange(addOn.id, 1)}
                        disabled={quantity >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        {/* Summary and Continue */}
        <Card className="sticky bottom-4 shadow-2xl border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPlanData?.name} • {billingCycle === "weekly" ? "Weekly" : "Monthly"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(calculateTotal())}
                </div>
                <p className="text-sm text-muted-foreground">
                  per {billingCycle === "weekly" ? "week" : "month"}
                </p>
              </div>
            </div>

            {Object.keys(selectedAddOns).length > 0 && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Add-ons:</p>
                <div className="space-y-1">
                  {Object.entries(selectedAddOns).map(([addOnId, quantity]) => {
                    const addOn = addOns?.find(a => a.id === addOnId)
                    return addOn ? (
                      <div key={addOnId} className="flex justify-between text-sm">
                        <span>{addOn.name} × {quantity}</span>
                        <span className="font-medium">
                          {formatCurrency(
                            (parseFloat(billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice) * quantity).toFixed(2)
                          )}
                        </span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            )}

            <Button
              className="w-full text-lg h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              size="lg"
              onClick={handleContinue}
              disabled={!selectedPlan}
            >
              Continue to Checkout
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              ✨ Use code <span className="font-bold text-primary">WELCOME25</span> for 25% off your first order
            </p>
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">Fresh Daily</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">10,000+ Customers</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-green-600 fill-current" />
            </div>
            <p className="text-sm font-medium">4.9/5 Rating</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">Cancel Anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}
