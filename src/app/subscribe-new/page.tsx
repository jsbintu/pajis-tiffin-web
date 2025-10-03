"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, ChevronRight, Info, Star, Calendar, Users, Utensils, ChefHat, Plus, Minus, Clock, ArrowLeft } from "lucide-react"
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
  const searchParams = useSearchParams()
  const { data: plans, isLoading: isLoadingPlans } = useSubscriptionPlans()
  const { data: addOns, isLoading: isLoadingAddOns } = useAddOns()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string>("") 
  const [billingCycle, setBillingCycle] = useState<"weekly" | "monthly">("monthly")
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({})
  const [menuItems, setMenuItems] = useState<Record<string, { quantity: number; frequency: 'daily' | 'specific' }>>({})
  
  const steps = [
    { number: 1, title: "Choose Plan", description: "Select your meal plan" },
    { number: 2, title: "Menu Items", description: "Add extra dishes" },
    { number: 3, title: "Review & Subscribe", description: "Complete your order" },
  ]

  // Auto-select first plan
  useEffect(() => {
    if (!selectedPlan && Array.isArray(plans) && plans.length > 0) {
      setSelectedPlan(plans[0].id)
    }
  }, [plans, selectedPlan])

  const selectedPlanData = plans?.find(p => p.id === selectedPlan)
  
  // Comprehensive menu items
  const mockMenuItems = [
    // Main Courses
    { id: 'butter-chicken', name: 'Butter Chicken', price: 280, emoji: '🍛', category: 'Main Course' },
    { id: 'dal-makhani', name: 'Dal Makhani', price: 180, emoji: '🍲', category: 'Main Course' },
    { id: 'biryani', name: 'Chicken Biryani', price: 250, emoji: '🍚', category: 'Main Course' },
    { id: 'palak-paneer', name: 'Palak Paneer', price: 220, emoji: '🥬', category: 'Main Course' },
    { id: 'chicken-curry', name: 'Chicken Curry', price: 260, emoji: '🍛', category: 'Main Course' },
    { id: 'mutton-curry', name: 'Mutton Curry', price: 320, emoji: '🍖', category: 'Main Course' },
    { id: 'fish-curry', name: 'Fish Curry', price: 290, emoji: '🐟', category: 'Main Course' },
    { id: 'aloo-gobi', name: 'Aloo Gobi', price: 160, emoji: '🥔', category: 'Main Course' },
    { id: 'chana-masala', name: 'Chana Masala', price: 170, emoji: '🫘', category: 'Main Course' },
    
    // Appetizers
    { id: 'paneer-tikka', name: 'Paneer Tikka', price: 220, emoji: '🧆', category: 'Appetizer' },
    { id: 'chicken-tikka', name: 'Chicken Tikka', price: 240, emoji: '🍗', category: 'Appetizer' },
    { id: 'seekh-kebab', name: 'Seekh Kebab', price: 260, emoji: '🍢', category: 'Appetizer' },
    { id: 'samosa', name: 'Samosa (2 pcs)', price: 60, emoji: '🥟', category: 'Appetizer' },
    { id: 'pakora', name: 'Mixed Pakora', price: 80, emoji: '🧄', category: 'Appetizer' },
    
    // Breads
    { id: 'butter-naan', name: 'Butter Naan', price: 40, emoji: '🥖', category: 'Bread' },
    { id: 'garlic-naan', name: 'Garlic Naan', price: 50, emoji: '🧄', category: 'Bread' },
    { id: 'tandoori-roti', name: 'Tandoori Roti', price: 30, emoji: '🫓', category: 'Bread' },
    { id: 'kulcha', name: 'Kulcha', price: 45, emoji: '🥖', category: 'Bread' },
    { id: 'paratha', name: 'Paratha', price: 35, emoji: '🥞', category: 'Bread' },
    
    // Rice
    { id: 'steamed-rice', name: 'Steamed Rice', price: 80, emoji: '🍚', category: 'Rice' },
    { id: 'jeera-rice', name: 'Jeera Rice', price: 100, emoji: '🍚', category: 'Rice' },
    { id: 'pulao', name: 'Veg Pulao', price: 140, emoji: '🍚', category: 'Rice' },
    
    // Desserts
    { id: 'gulab-jamun', name: 'Gulab Jamun', price: 120, emoji: '🍡', category: 'Dessert' },
    { id: 'kheer', name: 'Rice Kheer', price: 100, emoji: '🍮', category: 'Dessert' },
    { id: 'rasmalai', name: 'Rasmalai', price: 140, emoji: '🧈', category: 'Dessert' },
    { id: 'kulfi', name: 'Kulfi', price: 80, emoji: '🍦', category: 'Dessert' },
    
    // Beverages
    { id: 'masala-chai', name: 'Masala Chai', price: 30, emoji: '☕', category: 'Beverage' },
    { id: 'mango-lassi', name: 'Mango Lassi', price: 60, emoji: '🥭', category: 'Beverage' },
    { id: 'sweet-lassi', name: 'Sweet Lassi', price: 50, emoji: '🥛', category: 'Beverage' },
    { id: 'fresh-lime', name: 'Fresh Lime Water', price: 40, emoji: '🍋', category: 'Beverage' },
  ]
  
  const calculateTotal = () => {
    let total = 0
    if (selectedPlanData) {
      total += parseFloat(billingCycle === "weekly" ? selectedPlanData.weeklyPrice : selectedPlanData.monthlyPrice)
    }
    // Add-ons
    Object.entries(selectedAddOns).forEach(([addOnId, quantity]) => {
      const addOn = addOns?.find(a => a.id === addOnId)
      if (addOn && quantity > 0) {
        total += parseFloat(billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice) * quantity
      }
    })
    // Menu items
    Object.entries(menuItems).forEach(([itemId, { quantity, frequency }]) => {
      const item = mockMenuItems.find(i => i.id === itemId)
      if (item && quantity > 0) {
        const multiplier = frequency === 'daily' ? (billingCycle === 'weekly' ? 7 : 30) : 1
        const itemTotal = item.price * quantity * multiplier
        total += billingCycle === 'weekly' ? itemTotal / 4.33 : itemTotal // Convert to weekly/monthly
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
  
  const handleMenuItemChange = (itemId: string, delta: number, frequency: 'daily' | 'specific' = 'daily') => {
    setMenuItems(prev => {
      const current = prev[itemId]?.quantity || 0
      const newValue = Math.max(0, Math.min(10, current + delta))
      if (newValue === 0) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: { quantity: newValue, frequency } }
    })
  }

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - create subscription
      router.push('/manage-subscription?new=true')
    }
  }
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/')
    }
  }
  
  const canContinue = () => {
    if (currentStep === 1) return selectedPlan !== ""
    return true // Allow continuing from other steps
  }
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPlanSelection()
      case 2:
        return renderMenuSelection()
      case 3:
        return renderReviewAndSubscribe()
      default:
        return renderPlanSelection()
    }
  }
  
  const renderPlanSelection = () => (
    <div className="space-y-8">
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
                "relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group",
                isSelected
                  ? "border-2 border-primary ring-2 ring-primary/30 shadow-lg scale-[1.02]"
                  : "border hover:border-primary/50 hover:shadow-md",
                isPremium && "border-primary/50"
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
                <div className={cn(
                  "mx-auto mb-4 h-14 w-14 rounded-full flex items-center justify-center transition-colors duration-300",
                  isSelected 
                    ? "bg-gradient-to-br from-green-500 to-green-600 shadow-lg" 
                    : "bg-gradient-to-br from-green-400 to-green-500 group-hover:from-green-500 group-hover:to-green-600"
                )}>
                  <Utensils className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{plan.description}</CardDescription>
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
      
      {/* Add-ons Section - Keep with plan selection */}
      {addOns && addOns.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Popular Add-ons
            </CardTitle>
            <CardDescription>
              Enhance your meals with delicious extras (these are recurring with your subscription)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {addOns.map((addOn) => {
              const quantity = selectedAddOns[addOn.id] || 0
              const price = billingCycle === "weekly" ? addOn.weeklyPrice : addOn.monthlyPrice

              return (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{addOn.name}</h4>
                    <p className="text-xs text-muted-foreground">{addOn.description}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {formatCurrency(price)}
                      <span className="text-xs font-normal text-muted-foreground">
                        {" "}/ {billingCycle === "weekly" ? "week" : "month"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAddOnChange(addOn.id, -1)}
                      disabled={quantity === 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAddOnChange(addOn.id, 1)}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
  
  const renderMenuSelection = () => {
    const categories = ['Main Course', 'Appetizer', 'Bread', 'Rice', 'Dessert', 'Beverage']
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Add from Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose additional items from our delicious menu to customize your subscription
          </p>
        </div>
        
        {categories.map(category => {
          const categoryItems = mockMenuItems.filter(item => item.category === category)
          return (
            <Card key={category} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-green-500" />
                  {category}
                </CardTitle>
                <CardDescription>
                  {categoryItems.length} items available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item) => {
                    const menuItem = menuItems[item.id]
                    const quantity = menuItem?.quantity || 0
                    const frequency = menuItem?.frequency || 'daily'

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-2xl">{item.emoji}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm font-semibold text-primary">
                              ₹{item.price}
                            </p>
                            {quantity > 0 && (
                              <div className="mt-1 flex items-center gap-1">
                                <Button
                                  variant={frequency === 'daily' ? 'default' : 'outline'}
                                  size="sm"
                                  className="h-5 px-2 text-xs"
                                  onClick={() => handleMenuItemChange(item.id, 0, 'daily')}
                                >
                                  Daily
                                </Button>
                                <Button
                                  variant={frequency === 'specific' ? 'default' : 'outline'}
                                  size="sm"
                                  className="h-5 px-2 text-xs"
                                  onClick={() => handleMenuItemChange(item.id, 0, 'specific')}
                                >
                                  Specific
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleMenuItemChange(item.id, -1, frequency)}
                            disabled={quantity === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleMenuItemChange(item.id, 1, frequency)}
                            disabled={quantity >= 10}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }
  
  const renderReviewAndSubscribe = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Review Your Subscription
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Review your selections before creating your subscription
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Plan Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Plan</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPlanData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedPlanData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {billingCycle === "weekly" ? "Weekly" : "Monthly"} Plan • {selectedPlanData.mealsPerWeek} meals/week
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(billingCycle === "weekly" ? selectedPlanData.weeklyPrice : selectedPlanData.monthlyPrice)}
                  </p>
                </div>
                
                {Object.keys(selectedAddOns).length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Add-ons:</h4>
                    <div className="space-y-2">
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
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Menu Items Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Extra Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(menuItems).length === 0 ? (
              <p className="text-muted-foreground text-sm">No extra menu items selected</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(menuItems).map(([itemId, { quantity, frequency }]) => {
                  const item = mockMenuItems.find(i => i.id === itemId)
                  return item ? (
                    <div key={itemId} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.emoji}</span>
                        <div>
                          <p className="text-sm font-medium">{item.name} × {quantity}</p>
                          <p className="text-xs text-muted-foreground">
                            {frequency === 'daily' ? 'Added daily' : 'For specific days'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        ₹{item.price * quantity * (frequency === 'daily' ? (billingCycle === 'weekly' ? 7 : 30) : 1)}
                      </p>
                    </div>
                  ) : null
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Final Summary */}
      <Card className="border-primary bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Total Subscription Cost</h3>
              <p className="text-sm text-muted-foreground">
                Billed {billingCycle === "weekly" ? "weekly" : "monthly"}
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
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              ✨ Use code <span className="font-semibold text-primary">WELCOME25</span> for 25% off your first order
            </p>
            <p className="text-xs text-muted-foreground">
              Cancel anytime • No commitment • Free delivery
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

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
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300",
                    currentStep > step.number
                      ? "bg-green-600 text-white"
                      : currentStep === step.number
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-4 transition-colors duration-300",
                    currentStep > step.number ? "bg-green-600" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        {renderStepContent()}
        
        {/* Navigation Footer */}
        <div className="mt-12 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === 1 ? "Back to Home" : "Previous"}
          </Button>
          
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(calculateTotal())}
              </p>
              <p className="text-sm text-muted-foreground">
                per {billingCycle === "weekly" ? "week" : "month"}
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleContinue}
            disabled={!canContinue()}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            {currentStep === steps.length ? "Create Subscription" : "Continue"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>


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
