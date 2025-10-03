"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClientToken } from "@/hooks/use-payments"

// Braintree types
declare global {
  interface Window {
    braintree: any
  }
}

interface BraintreeDropinProps {
  onPaymentMethodReceived: (nonce: string) => void
  onError?: (error: Error) => void
  amount?: string
  disabled?: boolean
}

export function BraintreeDropin({
  onPaymentMethodReceived,
  onError,
  amount,
  disabled = false,
}: BraintreeDropinProps) {
  const dropinContainerRef = useRef<HTMLDivElement>(null)
  const dropinInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const { data: clientTokenData, isLoading: isLoadingToken } = useClientToken()

  // Load Braintree script
  useEffect(() => {
    if (typeof window === "undefined" || window.braintree) {
      setScriptLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.min.js"
    script.async = true
    script.onload = () => setScriptLoaded(true)
    script.onerror = () => {
      setIsLoading(false)
      onError?.(new Error("Failed to load Braintree script"))
    }

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script)
      }
    }
  }, [onError])

  // Initialize Braintree Drop-in
  useEffect(() => {
    if (!scriptLoaded || !clientTokenData?.clientToken || !dropinContainerRef.current) {
      return
    }

    setIsLoading(true)

    window.braintree.dropin.create(
      {
        authorization: clientTokenData.clientToken,
        container: dropinContainerRef.current,
        card: {
          cardholderName: {
            required: true,
          },
        },
        paypal: {
          flow: "vault",
        },
      },
      (error: Error, instance: any) => {
        if (error) {
          setIsLoading(false)
          onError?.(error)
          return
        }

        dropinInstanceRef.current = instance
        setIsLoading(false)
      }
    )

    return () => {
      if (dropinInstanceRef.current) {
        dropinInstanceRef.current.teardown(() => {
          dropinInstanceRef.current = null
        })
      }
    }
  }, [scriptLoaded, clientTokenData, onError])

  const handleSubmit = async () => {
    if (!dropinInstanceRef.current || isProcessing) return

    setIsProcessing(true)

    try {
      const payload = await dropinInstanceRef.current.requestPaymentMethod()
      onPaymentMethodReceived(payload.nonce)
    } catch (error) {
      onError?.(error as Error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoadingToken) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        ref={dropinContainerRef}
        className={isLoading ? "opacity-50" : ""}
      />

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && (
        <div className="space-y-2">
          {amount && (
            <p className="text-center text-sm text-muted-foreground">
              Amount to be charged: <span className="font-semibold">{amount}</span>
            </p>
          )}
          <Button
            onClick={handleSubmit}
            disabled={disabled || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Payment"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
