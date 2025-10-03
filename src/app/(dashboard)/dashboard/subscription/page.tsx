"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pause, Play, X, Edit } from "lucide-react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useCurrentSubscription,
  usePauseSubscription,
  useResumeSubscription,
  useCancelSubscription,
} from "@/hooks/use-subscriptions"
import { useToast } from "@/hooks/use-toast"

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

export default function SubscriptionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: subscription, isLoading } = useCurrentSubscription()
  const pauseSubscription = usePauseSubscription()
  const resumeSubscription = useResumeSubscription()
  const cancelSubscription = useCancelSubscription()

  const [pauseDialogOpen, setPauseDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
          <p className="text-muted-foreground">
            Manage your meal subscription
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>
              You don't have an active subscription. Start one now!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/subscribe")}>
              Start Subscription
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const handlePause = async () => {
    try {
      await pauseSubscription.mutateAsync(subscription.id)
      toast({
        title: "Success",
        description: "Your subscription has been paused.",
      })
      setPauseDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to pause subscription",
        variant: "destructive",
      })
    }
  }

  const handleResume = async () => {
    try {
      await resumeSubscription.mutateAsync(subscription.id)
      toast({
        title: "Success",
        description: "Your subscription has been resumed.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resume subscription",
        variant: "destructive",
      })
    }
  }

  const handleCancel = async () => {
    try {
      await cancelSubscription.mutateAsync(subscription.id)
      toast({
        title: "Success",
        description: "Your subscription has been cancelled.",
      })
      setCancelDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel subscription",
        variant: "destructive",
      })
    }
  }

  const isActive = subscription.status === "active"
  const isPaused = subscription.status === "paused"
  const isCancelled = subscription.status === "cancelled" || subscription.status === "expired"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your meal subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </div>
            <Badge variant={getStatusBadgeVariant(subscription.status)}>
              {subscription.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Plan Name</p>
              <p className="text-2xl font-bold">{subscription.plan?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Monthly Cost</p>
              <p className="text-2xl font-bold">{formatCurrency(subscription.amount)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Meals Per Week</p>
              <p className="text-lg">{subscription.plan?.mealsPerWeek || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Billing Cycle</p>
              <p className="text-lg capitalize">{subscription.billingCycle}</p>
            </div>
          </div>

          {subscription.addOns && subscription.addOns.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium">Add-ons</p>
              <div className="space-y-2">
                {subscription.addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{addOn.addOn?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {addOn.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 rounded-lg bg-muted p-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(subscription.startDate)}
              </p>
            </div>
            {subscription.nextBillingDate && (
              <div>
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(subscription.nextBillingDate)}
                </p>
              </div>
            )}
            {subscription.pausedAt && (
              <div>
                <p className="text-sm font-medium">Paused On</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(subscription.pausedAt)}
                </p>
              </div>
            )}
            {subscription.cancelledAt && (
              <div>
                <p className="text-sm font-medium">Cancelled On</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(subscription.cancelledAt)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {!isCancelled && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Subscription</CardTitle>
            <CardDescription>
              Update, pause, or cancel your subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/subscription/update")}
              >
                <Edit className="mr-2 h-4 w-4" />
                Update Plan
              </Button>
              
              {isActive && (
                <Button
                  variant="outline"
                  onClick={() => setPauseDialogOpen(true)}
                  disabled={pauseSubscription.isPending}
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Subscription
                </Button>
              )}

              {isPaused && (
                <Button
                  variant="outline"
                  onClick={handleResume}
                  disabled={resumeSubscription.isPending}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Resume Subscription
                </Button>
              )}
            </div>

            <div className="border-t pt-4">
              <Button
                variant="destructive"
                onClick={() => setCancelDialogOpen(true)}
                disabled={cancelSubscription.isPending}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pause Dialog */}
      <Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Subscription?</DialogTitle>
            <DialogDescription>
              Your subscription will be paused and you won't be charged until you
              resume it. You can resume anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPauseDialogOpen(false)}
              disabled={pauseSubscription.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePause}
              disabled={pauseSubscription.isPending}
            >
              {pauseSubscription.isPending ? "Pausing..." : "Pause Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You will lose
              access to your meal plan at the end of your current billing period.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              disabled={cancelSubscription.isPending}
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelSubscription.isPending}
            >
              {cancelSubscription.isPending ? "Cancelling..." : "Cancel Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
