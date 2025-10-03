"use client";
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const SetupCardModal = dynamic(() => import('@/components/SetupCardModal'), { ssr: false })
const PaymentModal = dynamic(() => import('@/components/AdminPaymentModal'), { ssr: false })

export default function ManageBilling() {
  const [open, setOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const [payOpen, setPayOpen] = useState(false)
  const [payClientSecret, setPayClientSecret] = useState<string | null>(null)
  const [pastDue, setPastDue] = useState<any[]>([])

  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        const res = await fetch('/api/proxy/subscriptions/mine', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (!ignore) setPastDue((data.items || []).filter((s: any) => s.isPastDue))
      } catch {}
    })()
    return () => { ignore = true }
  }, [])

  async function start() {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch('/api/proxy/payments/setup-intent', { method: 'POST' })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setClientSecret(data.clientSecret)
      setOpen(true)
    } catch (e: any) {
      setMsg('Failed: ' + (e?.message || ''))
    } finally { setBusy(false) }
  }

  async function payNow(subscriptionId: string) {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch('/api/proxy/payments/renewal-intent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscriptionId }) })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setPayClientSecret(data.clientSecret)
      setPayOpen(true)
    } catch (e: any) {
      setMsg('Failed: ' + (e?.message || ''))
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Payment method</h2>
        <button onClick={start} disabled={busy} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">{busy ? 'Please wait…' : 'Update payment method'}</button>
      </div>

      {pastDue.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Past‑due subscriptions</h2>
          <ul className="space-y-2">
            {pastDue.map(s => (
              <li key={s.id} className="flex items-center justify-between border rounded p-3">
                <div className="text-sm">
                  <div><strong>{s.planVariant?.family}/{s.planVariant?.serving}/{s.planVariant?.diet}</strong></div>
                  <div className="text-gray-600">Attempts: {s.dunningAttempts || 0}</div>
                </div>
                <button onClick={()=> payNow(s.id)} className="px-3 py-1.5 rounded bg-purple-600 text-white">Pay now</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {msg && <p className="text-sm text-gray-700">{msg}</p>}

      {/* Modals */}
      {/* @ts-ignore */}
      <SetupCardModal open={open} clientSecret={clientSecret} onClose={()=>{ setOpen(false); setClientSecret(null) }} onSuccess={()=> { setMsg('Payment method updated'); setOpen(false); setClientSecret(null) }} />
      {/* @ts-ignore */}
      <PaymentModal open={payOpen} clientSecret={payClientSecret} onClose={()=>{ setPayOpen(false); setPayClientSecret(null) }} onSuccess={()=> { setMsg('Payment completed'); setPayOpen(false); setPayClientSecret(null) }} />
    </div>
  )
}
