"use client";
import { Elements, useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '')

export default function SetupCardModal({ open, clientSecret, onClose, onSuccess }: { open: boolean; clientSecret: string | null; onClose: () => void; onSuccess: () => void }) {
  if (!open || !clientSecret) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow max-w-md w-full p-6 space-y-4">
        <h3 className="text-lg font-semibold">Update payment method</h3>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <SetupForm clientSecret={clientSecret} onClose={onClose} onSuccess={onSuccess} />
        </Elements>
      </div>
    </div>
  )
}

function SetupForm({ clientSecret, onClose, onSuccess }: { clientSecret: string; onClose: () => void; onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)
    setError(null)
    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: { card: elements.getElement(CardElement)! },
    })
    if (result.error) {
      setError(result.error.message || 'Failed to update')
    } else {
      onSuccess()
      onClose()
    }
    setProcessing(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex items-center gap-2 justify-end">
        <button type="button" onClick={onClose} className="px-3 py-1.5 border rounded">Cancel</button>
        <button disabled={!stripe || processing} className="px-3 py-1.5 rounded bg-purple-600 text-white disabled:opacity-50">
          {processing ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
