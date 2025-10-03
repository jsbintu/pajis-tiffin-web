"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Plus, Edit, Trash2, ChefHat, Check, Save, X, TrendingUp, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Mock current subscription
const mockSubscription = {
  id: "sub-123",
  plan: "Premium Plan",
  status: "active",
  billingCycle: "monthly",
  price: 4999,
  mealsPerWeek: 14,
  nextBillingDate: "2025-01-15",
  preferences: {
    dietary: "Non-Vegetarian",
    spiceLevel: "Medium",
    allergies: ["Peanuts"]
  }
}

// Mock menu items
const menuItems = [
  { id: "1", name: "Butter Chicken", price: 280, image: "🍛", category: "Main Course" },
  { id: "2", name: "Dal Makhani", price: 180, image: "🍲", category: "Main Course" },
  { id: "3", name: "Chicken Biryani", price: 250, image: "🍚", category: "Main Course" },
  { id: "4", name: "Palak Paneer", price: 220, image: "🥬", category: "Main Course" },
  { id: "5", name: "Paneer Tikka", price: 220, image: "🧆", category: "Appetizer" },
  { id: "6", name: "Butter Naan", price: 40, image: "🥖", category: "Bread" },
  { id: "7", name: "Garlic Naan", price: 50, image: "🧄", category: "Bread" },
  { id: "8", name: "Gulab Jamun", price: 120, image: "🍡", category: "Dessert" },
]

// Generate next 14 days
const generateUpcomingDays = () => {
  const days = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    })
  }
  return days
}

export default function ManageSubscriptionPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [dayAddons, setDayAddons] = useState<Record<string, string[]>>({})
  const [pausedDates, setPausedDates] = useState<Set<string>>(new Set())
  const [editingPreferences, setEditingPreferences] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

  const upcomingDays = generateUpcomingDays()

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSaveSuccess(true)
      setTimeout(() => setShowSaveSuccess(false), 3000)
    }, 1500)
  }

  const togglePauseDate = (date: string) => {
    setPausedDates(prev => {
      const newSet = new Set(prev)
      if (newSet.has(date)) {
        newSet.delete(date)
      } else {
        newSet.add(date)
      }
      return newSet
    })
  }

  const addItemToDate = (date: string, itemId: string) => {
    setDayAddons(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), itemId]
    }))
  }

  const removeItemFromDate = (date: string, itemId: string) => {
    setDayAddons(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(id => id !== itemId)
    }))
  }

  const calculateDayTotal = (date: string) => {
    const items = dayAddons[date] || []
    return items.reduce((total, itemId) => {
      const item = menuItems.find(i => i.id === itemId)
      return total + (item?.price || 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-background dark:via-background dark:to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ChefHat className="h-6 w-6" />
            Pajis Kitchen
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Manage Your Subscription
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Customize your meals, pause deliveries, and update preferences
              </p>
            </div>
            <Badge className="h-8 px-4 bg-green-600 text-white hover:bg-green-600">
              {mockSubscription.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Success Message */}
        {showSaveSuccess && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">Changes Saved Successfully!</p>
                    <p className="text-sm text-green-700 dark:text-green-200">Your subscription has been updated.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Upcoming Meals</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Current Plan */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Current Plan
                  </CardTitle>
                  <CardDescription>Your active subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="text-2xl font-bold">{mockSubscription.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-2xl font-bold text-primary">₹{mockSubscription.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meals Per Week</p>
                    <p className="text-lg">{mockSubscription.mealsPerWeek} meals</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing Date</p>
                    <p className="text-lg">{new Date(mockSubscription.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <Link href="/subscribe-new">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Change Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("calendar")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Add Items for Specific Days
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("calendar")}>
                    <X className="h-4 w-4 mr-2" />
                    Pause Specific Days
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("preferences")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Update Preferences
                  </Button>
                  <Link href="/order" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Order Extra Items (One-Time)
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Upcoming Deliveries</p>
                    <p className="text-2xl font-bold">
                      {upcomingDays.length - pausedDates.size} days
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Paused Days</p>
                    <p className="text-2xl font-bold">
                      {pausedDates.size} days
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Extra Items Added</p>
                    <p className="text-2xl font-bold">
                      {Object.values(dayAddons).flat().length} items
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Meals Calendar
                </CardTitle>
                <CardDescription>
                  Click on any day to add extra items or pause delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {upcomingDays.map((day) => {
                    const isPaused = pausedDates.has(day.date)
                    const addons = dayAddons[day.date] || []
                    const dayTotal = calculateDayTotal(day.date)
                    const isSelected = selectedDate === day.date

                    return (
                      <Card
                        key={day.date}
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                          isPaused && "opacity-50 bg-muted",
                          isSelected && "ring-2 ring-primary scale-105 shadow-lg"
                        )}
                        onClick={() => setSelectedDate(selectedDate === day.date ? null : day.date)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-xs text-muted-foreground">{day.dayName}</p>
                              <p className="text-2xl font-bold">{day.dayNumber}</p>
                              <p className="text-xs text-muted-foreground">{day.month}</p>
                            </div>
                            {isPaused && (
                              <Badge variant="destructive" className="text-xs">Paused</Badge>
                            )}
                          </div>

                          {addons.length > 0 && !isPaused && (
                            <div className="mt-3 space-y-1">
                              <p className="text-xs font-medium">Extra Items:</p>
                              <div className="flex flex-wrap gap-1">
                                {addons.slice(0, 3).map(itemId => {
                                  const item = menuItems.find(i => i.id === itemId)
                                  return item ? (
                                    <span key={itemId} className="text-lg">{item.image}</span>
                                  ) : null
                                })}
                                {addons.length > 3 && (
                                  <Badge variant="secondary" className="h-6 text-xs">+{addons.length - 3}</Badge>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-primary">+₹{dayTotal}</p>
                            </div>
                          )}

                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              variant={isPaused ? "default" : "outline"}
                              className="flex-1 h-8 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                togglePauseDate(day.date)
                              }}
                            >
                              {isPaused ? "Resume" : "Pause"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Add Items Panel */}
            {selectedDate && (
              <Card className="border-primary shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      Add Items for {upcomingDays.find(d => d.date === selectedDate)?.dayName}, {upcomingDays.find(d => d.date === selectedDate)?.month} {upcomingDays.find(d => d.date === selectedDate)?.dayNumber}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDate(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>Select extra items to add to this day's delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                    {menuItems.map(item => {
                      const isAdded = (dayAddons[selectedDate] || []).includes(item.id)

                      return (
                        <Card key={item.id} className={cn("cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1", isAdded && "ring-2 ring-primary")}>
                          <CardContent className="p-4">
                            <div className="text-4xl text-center mb-2">{item.image}</div>
                            <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                            <p className="text-lg font-bold text-primary mb-2">₹{item.price}</p>
                            <Button
                              size="sm"
                              variant={isAdded ? "default" : "outline"}
                              className="w-full"
                              onClick={() => {
                                if (isAdded) {
                                  removeItemFromDate(selectedDate, item.id)
                                } else {
                                  addItemToDate(selectedDate, item.id)
                                }
                              }}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {(dayAddons[selectedDate] || []).length > 0 && (
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-semibold mb-2">Added Items:</p>
                      <div className="space-y-2">
                        {(dayAddons[selectedDate] || []).map(itemId => {
                          const item = menuItems.find(i => i.id === itemId)
                          return item ? (
                            <div key={itemId} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{item.image}</span>
                                <span>{item.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">₹{item.price}</span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                  onClick={() => removeItemFromDate(selectedDate, item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : null
                        })}
                      </div>
                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <span className="font-semibold">Extra Cost for This Day:</span>
                        <span className="text-2xl font-bold text-primary">₹{calculateDayTotal(selectedDate)}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Save Changes */}
            {(pausedDates.size > 0 || Object.keys(dayAddons).length > 0) && (
              <Card className="sticky bottom-4 border-primary shadow-2xl bg-background animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Changes Made
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pausedDates.size} paused, {Object.values(dayAddons).flat().length} items added
                      </p>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300"
                      onClick={handleSaveChanges}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meal Preferences</CardTitle>
                    <CardDescription>Customize your meal preferences and dietary restrictions</CardDescription>
                  </div>
                  {!editingPreferences ? (
                    <Button onClick={() => setEditingPreferences(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditingPreferences(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setEditingPreferences(false)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Dietary Preference</Label>
                    <p className="text-muted-foreground mt-1">{mockSubscription.preferences.dietary}</p>
                  </div>
                  
                  <div>
                    <Label className="text-base font-semibold">Spice Level</Label>
                    <p className="text-muted-foreground mt-1">{mockSubscription.preferences.spiceLevel}</p>
                  </div>
                  
                  <div>
                    <Label className="text-base font-semibold">Allergies</Label>
                    <div className="flex gap-2 mt-1">
                      {mockSubscription.preferences.allergies.map(allergy => (
                        <Badge key={allergy} variant="secondary">{allergy}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Label htmlFor="autorenew" className="text-base font-semibold">Auto-Renewal</Label>
                      <p className="text-sm text-muted-foreground">Automatically renew your subscription</p>
                    </div>
                    <Switch id="autorenew" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
