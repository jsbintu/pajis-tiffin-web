"use client"

import Link from "next/link"
import { Calendar, CreditCard, Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/use-auth"
import { useCurrentSubscription } from "@/hooks/use-subscriptions"

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "active":
      return "success"
    case "paused":
      return "warning"
    case "cancelled":
    case "expired":
      return "destructive"
    case "past_due":
      return "destructive"
    default:
      return "secondary"
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatCurrency(amount: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(parseFloat(amount))
}

export default function DashboardPage() {
  const { data: user } = useCurrentUser()
  const { data: subscription, isLoading } = useCurrentSubscription()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your meal subscription
        </p>
      </div>

      {/* No Subscription State */}
      {!subscription && (
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>
              You don't have an active subscription yet. Start enjoying delicious
              home-cooked meals today!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/subscribe">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Start Subscription
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      {/* Subscription Overview */}
      {subscription && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Status Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscription Status
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant(subscription.status)}>
                    {subscription.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {subscription.plan?.name || "Plan"}
                </p>
              </CardContent>
            </Card>

            {/* Next Billing Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Billing Date
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subscription.nextBillingDate
                    ? formatDate(subscription.nextBillingDate)
                    : "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(subscription.amount)} / {subscription.billingCycle}
                </p>
              </CardContent>
            </Card>

            {/* Payment Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Amount
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(subscription.amount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Billed {subscription.billingCycle}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Manage your meal plan and delivery preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {subscription.plan?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Meals Per Week</p>
                  <p className="text-sm text-muted-foreground">
                    {subscription.plan?.mealsPerWeek || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(subscription.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Billing Cycle</p>
                  <p className="text-sm text-muted-foreground">
                    {subscription.billingCycle}
                  </p>
                </div>
              </div>

              {subscription.addOns && subscription.addOns.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Add-ons</p>
                  <div className="space-y-2">
                    {subscription.addOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {addOn.addOn?.name || "Add-on"} x {addOn.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Link href="/dashboard/subscription">
                <Button>Manage Subscription</Button>
              </Link>
              <Link href="/dashboard/deliveries">
                <Button variant="outline">View Deliveries</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/dashboard/subscription">
                <Button variant="outline" className="w-full">
                  Update Plan
                </Button>
              </Link>
              <Link href="/dashboard/payments">
                <Button variant="outline" className="w-full">
                  Payment History
                </Button>
              </Link>
              <Link href="/dashboard/addresses">
                <Button variant="outline" className="w-full">
                  Manage Addresses
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full">
                  Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
