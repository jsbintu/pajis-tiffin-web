"use client";
import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

const PaymentModal = dynamic(() => import('@/components/AdminPaymentModal'), { ssr: false })

type Variant = {
  id: string
  family: 'SINGLE' | 'COUPLE' | 'FAMILY'
  serving: 'REGULAR' | 'LARGE'
  diet: 'VEG' | 'NON_VEG'
  basePriceCad: string | number
}

const durations = ['WEEKLY','MONTHLY'] as const

type Duration = (typeof durations)[number]

export default function ManageSubscriptionClient({ sub }: { sub: any }) {
  const [variants, setVariants] = useState<Variant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [diet, setDiet] = useState<'VEG' | 'NON_VEG'>(sub.planVariant?.diet || 'VEG')
  const [family, setFamily] = useState<'SINGLE' | 'COUPLE' | 'FAMILY'>(sub.planVariant?.family || 'SINGLE')
  const [serving, setServing] = useState<'REGULAR' | 'LARGE'>(sub.planVariant?.serving || 'REGULAR')
  const [duration, setDuration] = useState<Duration>(sub.planVariant?.plan?.duration || 'WEEKLY')

  const [preview, setPreview] = useState<{ prorationDeltaCad: number; taxCad: number; totalCad: number } | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const cutoffHours = Number.parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_CUTOFF_HOURS || '24', 10) || 24
  const nextAt = sub.nextBillingAt ? new Date(sub.nextBillingAt) : null
  const withinCutoff = nextAt ? (nextAt.getTime() - Date.now()) <= cutoffHours*60*60*1000 : false

  const [payOpen, setPayOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    setLoading(true); setError(null)
    ;(async () => {
      try {
        const res = await fetch(`/api/proxy/plans?duration=${duration}`)
        if (!res.ok) throw new Error('Failed to fetch variants')
        const data = await res.json()
        if (!ignore) setVariants(data.variants || [])
      } catch (e: any) {
        if (!ignore) setError(e?.message || 'Failed')
      } finally { if (!ignore) setLoading(false) }
    })()
    return () => { ignore = true }
  }, [duration])

  useEffect(() => { setPreview(null) }, [diet, family, serving, duration])

  const variant = useMemo(() => variants.find(v => v.family === family && v.serving === serving && v.diet === diet) || null, [variants, family, serving, diet])

  async function onPreview() {
    if (!variant) return
    setBusy(true); setMsg(null); setPreview(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${sub.id}/proration-preview`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPlanVariantId: variant.id }) })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setPreview({ prorationDeltaCad: data.prorationDeltaCad, taxCad: data.taxCad, totalCad: data.totalCad })
    } catch (e: any) {
      setMsg('Failed: ' + (e?.message || ''))
    } finally { setBusy(false) }
  }

  async function onConfirm() {
    if (!variant) return
    if (withinCutoff) { setMsg(`Within ${cutoffHours}h of next billing — please schedule for next cycle.`); return }
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${sub.id}/change-variant-self`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPlanVariantId: variant.id }) })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      if (data?.payment?.clientSecret) {
        setClientSecret(data.payment.clientSecret)
        setPayOpen(true)
      } else {
        setMsg('Plan updated')
      }
    } catch (e: any) {
      setMsg('Failed: ' + (e?.message || ''))
    } finally { setBusy(false) }
  }

  async function onSchedule() {
    if (!variant) return
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${sub.id}/schedule-change-variant-self`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPlanVariantId: variant.id }) })
      if (!res.ok) throw new Error(await res.text())
      await res.json().catch(()=>null)
      setMsg('Plan change scheduled for next billing')
    } catch (e: any) {
      setMsg('Failed: ' + (e?.message || ''))
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Current plan</h2>
        <p className="text-gray-700">{sub.planVariant?.plan?.duration} / {sub.planVariant?.family} / {sub.planVariant?.serving} / {sub.planVariant?.diet}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Change plan</h2>
        {loading && <p className="text-gray-600">Loading options…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && (
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm mb-1">Duration</label>
              <select className="border rounded px-2 py-1 w-full" value={duration} onChange={e=> setDuration(e.target.value as Duration)}>
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Diet</label>
              <select className="border rounded px-2 py-1 w-full" value={diet} onChange={e=> setDiet(e.target.value as any)}>
                <option value="VEG">Vegetarian</option>
                <option value="NON_VEG">Non‑Vegetarian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Family size</label>
              <select className="border rounded px-2 py-1 w-full" value={family} onChange={e=> setFamily(e.target.value as any)}>
                <option value="SINGLE">SINGLE</option>
                <option value="COUPLE">COUPLE</option>
                <option value="FAMILY">FAMILY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Serving size</label>
              <select className="border rounded px-2 py-1 w-full" value={serving} onChange={e=> setServing(e.target.value as any)}>
                <option value="REGULAR">REGULAR</option>
                <option value="LARGE">LARGE</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {/* Price comparison */}
        <div className="text-sm text-gray-800">
          <p>Base price: ${Number(sub.planVariant?.basePriceCad || 0).toFixed(2)} → {variant ? `$${Number(variant.basePriceCad).toFixed(2)}` : '-'}</p>
          {variant && (
            <p>Difference: {(Number(variant.basePriceCad) - Number(sub.planVariant?.basePriceCad || 0) >= 0 ? '+' : '') + (Number(variant.basePriceCad) - Number(sub.planVariant?.basePriceCad || 0)).toFixed(2)}</p>
          )}
        </div>
        <button onClick={onPreview} disabled={!variant || busy} className="px-4 py-2 rounded border">{busy ? 'Please wait…' : 'Preview proration'}</button>
        {preview && (
          <div className="text-sm text-gray-800">
            <p>Proration difference: <strong>${preview.prorationDeltaCad.toFixed(2)}</strong></p>
            {preview.prorationDeltaCad > 0 && (
              <p>HST: ${preview.taxCad.toFixed(2)} — Total due now: <strong>${preview.totalCad.toFixed(2)}</strong></p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={onConfirm} disabled={!variant || busy || withinCutoff} className="px-4 py-2 rounded bg-purple-600 text-white disabled:opacity-50">{busy ? 'Please wait…' : (preview?.prorationDeltaCad || 0) > 0 ? 'Pay and switch' : 'Switch plan now'}</button>
          <button onClick={onSchedule} disabled={!variant || busy} className="px-4 py-2 rounded border">{busy ? 'Please wait…' : 'Schedule at next billing'}</button>
        </div>
        {withinCutoff && (
          <p className="text-xs text-gray-600">You are within the {cutoffHours}h cutoff of your next billing on {nextAt?.toISOString().slice(0,16).replace('T',' ')}. Immediate changes are disabled.</p>
        )}
        {msg && (
          <p className="text-sm text-gray-700">
            {msg} {msg?.toLowerCase().includes('updated') || msg?.toLowerCase().includes('completed') ? (<a className="text-blue-600 underline" href="/account/invoices">View invoices</a>) : null}
          </p>
        )}
      </div>

      {/* Payment Modal */}
      {/* @ts-ignore */}
      <PaymentModal open={payOpen} clientSecret={clientSecret} onClose={()=> { setPayOpen(false); setClientSecret(null) }} onSuccess={()=> { setMsg('Payment completed and plan updated'); setPayOpen(false); setClientSecret(null) }} />
    </div>
  )
}
