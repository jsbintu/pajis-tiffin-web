"use client";
import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

const PaymentModal = dynamic(() => import('@/components/AdminPaymentModal'), { ssr: false })

type PlanAddon = {
  addonTypeId: string
  priceCad: number
  addonType: { key: string; description?: string; unit: 'PER_MEAL' | 'PER_DELIVERY_DAY' | 'PER_WEEK' }
}

type SubAddon = { addonTypeId: string; quantity: number; addonType?: { key: string } }

export default function ManageAddonsClient({ sub }: { sub: any }) {
  const variantAddons: PlanAddon[] = (sub.planVariant?.addons || []).map((a: any) => ({ addonTypeId: a.addonTypeId, priceCad: Number(a.priceCad), addonType: a.addonType }))
  const currentMap = useMemo(() => {
    const m = new Map<string, number>()
    for (const a of sub.addons || []) m.set(a.addonTypeId, a.quantity || 0)
    return m
  }, [sub])

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const o: Record<string, number> = {}
    for (const a of variantAddons) o[a.addonTypeId] = currentMap.get(a.addonTypeId) || 0
    return o
  })
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState<{ prorationDeltaCad: number; taxCad: number; totalCad: number } | null>(null)
  const [payOpen, setPayOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const cutoffHours = Number.parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_CUTOFF_HOURS || '24', 10) || 24
  const nextAt = sub.nextBillingAt ? new Date(sub.nextBillingAt) : null
  const withinCutoff = nextAt ? (nextAt.getTime() - Date.now()) <= cutoffHours*60*60*1000 : false

  function payload() {
    return {
      addons: Object.entries(quantities).map(([addonTypeId, quantity]) => ({ addonTypeId, quantity: Math.max(0, parseInt(String(quantity||0)) || 0) })),
    }
  }

  async function previewProration() {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${sub.id}/addons/preview`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setPreview({ prorationDeltaCad: data.prorationDeltaCad, taxCad: data.taxCad, totalCad: data.totalCad })
    } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setBusy(false) }
  }

  async function changeNow() {
    if (withinCutoff) { setMsg(`Within ${cutoffHours}h of next billing — please schedule for next cycle.`); return }
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${sub.id}/addons/change-self-now`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      if (data?.payment?.clientSecret) {
        setClientSecret(data.payment.clientSecret)
        setPayOpen(true)
      } else {
        setMsg('Add-ons updated')
      }
    } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setBusy(false) }
  }

  async function scheduleChange() {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${sub.id}/addons/schedule-change-self`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) })
      if (!res.ok) throw new Error(await res.text())
      setMsg('Scheduled for next billing')
    } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setBusy(false) }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add-ons</h2>
      <div className="space-y-3">
        {variantAddons.map((a) => {
          const key = a.addonType?.key || a.addonTypeId
          const isWeekly = a.addonType?.unit === 'PER_WEEK'
          const isCheckbox = key === 'saturday_delivery' || isWeekly
          const q = quantities[a.addonTypeId] || 0
          return (
            <div key={a.addonTypeId} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{key}</div>
                <div className="text-xs text-gray-600">${a.priceCad.toFixed(2)} per {a.addonType?.unit?.toLowerCase()?.replace(/_/g,' ')}</div>
              </div>
              <div>
                {isCheckbox ? (
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-blue-600" checked={q>0} onChange={e=> setQuantities(prev=> ({ ...prev, [a.addonTypeId]: e.target.checked ? 1 : 0 }))} />
                    <span>{q>0 ? 'On' : 'Off'}</span>
                  </label>
                ) : (
                  <input type="number" min={0} className="w-24 border rounded px-2 py-1" value={q} onChange={e=> setQuantities(prev=> ({ ...prev, [a.addonTypeId]: Math.max(0, parseInt(e.target.value||'0')||0) }))} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={previewProration} disabled={busy} className="px-3 py-1.5 rounded border">{busy ? 'Please wait…' : 'Preview proration'}</button>
        <button onClick={changeNow} disabled={busy || withinCutoff} className="px-3 py-1.5 rounded bg-purple-600 text-white disabled:opacity-50">{busy ? 'Please wait…' : 'Change now'}</button>
        <button onClick={scheduleChange} disabled={busy} className="px-3 py-1.5 rounded border">{busy ? 'Please wait…' : 'Schedule at next billing'}</button>
      </div>
      {withinCutoff && (
        <p className="text-xs text-gray-600">You are within the {cutoffHours}h cutoff of your next billing on {nextAt?.toISOString().slice(0,16).replace('T',' ')}. Immediate changes are disabled.</p>
      )}

      {preview && (
        <div className="text-sm text-gray-800">
          <p>Proration difference: <strong>${preview.prorationDeltaCad.toFixed(2)}</strong></p>
          {preview.prorationDeltaCad > 0 && (
            <p>HST: ${preview.taxCad.toFixed(2)} — Total due now: <strong>${preview.totalCad.toFixed(2)}</strong></p>
          )}
        </div>
      )}

      {msg && <p className="text-sm text-gray-700">{msg}</p>}

      {/* Payment modal */}
      {/* @ts-ignore */}
      <PaymentModal open={payOpen} clientSecret={clientSecret} onClose={()=> { setPayOpen(false); setClientSecret(null) }} onSuccess={()=> { setMsg('Payment completed and add-ons updated'); setPayOpen(false); setClientSecret(null) }} />
    </div>
  )
}
