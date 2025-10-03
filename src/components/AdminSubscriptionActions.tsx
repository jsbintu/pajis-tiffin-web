"use client";
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const AdminPaymentPortal = dynamic(() => import('@/components/AdminPaymentModal'), { ssr: false })

export default function AdminSubscriptionActions({ id, initial }: { id: string; initial: { isPaused: boolean; isActive: boolean; pausedUntil?: string | null } }) {
  const router = useRouter()
  const [isPaused, setPaused] = useState(initial.isPaused)
  const [isActive, setActive] = useState(initial.isActive)
  const [pausedUntil, setPausedUntil] = useState(initial.pausedUntil ? initial.pausedUntil.slice(0,10) : '')
  const [variantId, setVariantId] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  async function saveStatus() {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${id}/patch`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPaused, isActive, pausedUntil: pausedUntil ? new Date(pausedUntil).toISOString() : undefined }) })
      if (!res.ok) throw new Error(await res.text())
      setMsg('Status updated')
    } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setBusy(false) }
  }

  async function changeVariant() {
    if (!variantId) { setMsg('Enter new Plan Variant ID'); return }
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${id}/change-variant`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPlanVariantId: variantId }) })
      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data))
      setMsg(`Variant changed. Proration delta: $${(data?.prorationDeltaCad ?? 0).toFixed?.(2) || data?.prorationDeltaCad}`)
      if (data?.payment?.clientSecret) { setClientSecret(data.payment.clientSecret); setOpen(true) }
    } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setBusy(false) }
  }

  async function scheduleVariant() {
    if (!variantId) { setMsg('Enter new Plan Variant ID'); return }
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/proxy/subscriptions/${id}/schedule-change-variant`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPlanVariantId: variantId }) })
      if (!res.ok) throw new Error(await res.text())
      await res.json().catch(()=>null)
      setMsg('Variant change scheduled for next billing')
    } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setBusy(false) }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Payment modal */}
      {/* Dynamically import to avoid SSR */}
      {/* @ts-ignore */}
      <AdminPaymentPortal clientSecret={clientSecret} open={open} onClose={()=> { setOpen(false); setClientSecret(null) }} onSuccess={()=> { setMsg('Proration payment completed'); setOpen(false); setClientSecret(null); router.refresh() }} />
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Status</h3>
        <div className="flex items-center gap-4 mb-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={isActive} onChange={e=>setActive(e.target.checked)} /> Active</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={isPaused} onChange={e=>setPaused(e.target.checked)} /> Paused</label>
        </div>
        <div className="mb-2">
          <label className="block text-sm mb-1">Paused Until</label>
          <input type="date" value={pausedUntil} onChange={e=>setPausedUntil(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <button onClick={saveStatus} disabled={busy} className="px-3 py-1.5 rounded bg-blue-600 text-white disabled:opacity-50">{busy ? 'Saving…' : 'Save Status'}</button>
      </div>
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Change Plan Variant</h3>
        <div className="mb-2">
          <label className="block text-sm mb-1">New Plan Variant ID</label>
          <input type="text" value={variantId} onChange={e=>setVariantId(e.target.value)} placeholder="pv_..." className="border rounded px-2 py-1 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={changeVariant} disabled={busy} className="px-3 py-1.5 rounded bg-purple-600 text-white disabled:opacity-50">{busy ? 'Processing…' : 'Change Variant Now'}</button>
          <button onClick={scheduleVariant} disabled={busy} className="px-3 py-1.5 rounded border">{busy ? 'Processing…' : 'Schedule at Next Billing'}</button>
        </div>
      </div>
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Billing</h3>
        <div className="flex items-center gap-2">
          <button onClick={async()=>{
            setBusy(true); setMsg(null)
            try {
              const r = await fetch('/api/proxy/renewals/trigger', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscriptionId: id }) })
              if (!r.ok) throw new Error(await r.text())
              setMsg('Renewal retry scheduled')
            } catch (e: any) { setMsg('Failed: ' + (e?.message||'')) } finally { setBusy(false) }
          }} disabled={busy} className="px-3 py-1.5 rounded border">Retry Renewal Now</button>
          <button onClick={async()=>{
            setBusy(true); setMsg(null)
            try {
              const r = await fetch('/api/proxy/renewals/clear', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscriptionId: id }) })
              if (!r.ok) throw new Error(await r.text())
              setMsg('Past-due cleared')
            } catch (e: any) { setMsg('Failed: ' + (e?.message||'')) } finally { setBusy(false) }
          }} disabled={busy} className="px-3 py-1.5 rounded border">Clear Past‑Due</button>
        </div>
      </div>
      {msg && <div className="col-span-2 text-sm text-gray-700">{msg}</div>}
    </div>
  )
}
