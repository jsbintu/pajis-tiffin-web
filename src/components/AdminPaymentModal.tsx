"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminPaymentModal({ open, clientSecret, onClose, onSuccess }: { open: boolean; clientSecret: string | null; onClose: () => void; onSuccess: () => void }) {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [amount, setAmount] = useState('')

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amount) {
      setError('Please enter an amount')
      return
    }
    
    setProcessing(true)
    setError(null)
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      onSuccess()
      onClose()
    } catch (err) {
      setError('Payment processing failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Manual Payment Collection</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Process a manual payment for this subscription
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Payment reason or reference"
            />
          </div>
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          <div className="flex items-center gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Processing...' : 'Process Payment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
