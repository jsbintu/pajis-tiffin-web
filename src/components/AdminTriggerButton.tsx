"use client";
import { useState } from 'react'

export default function AdminTriggerButton({ subscriptionId, isPastDue }: { subscriptionId: string, isPastDue?: boolean }) {
  const [loading, setLoading] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function trigger() {
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch('/api/proxy/renewals/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId })
      })
      if (!res.ok) throw new Error(await res.text())
      setMsg('Scheduled')
    } catch (e: any) {
      setMsg('Failed: ' + (e?.message || ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={trigger} disabled={loading} className="px-2 py-1 border rounded text-sm">
        {loading ? 'Scheduling…' : 'Trigger Renewal'}
      </button>
      {isPastDue && (
        <button onClick={async()=>{
          setClearing(true); setMsg(null)
          try {
            const r = await fetch('/api/proxy/renewals/clear', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscriptionId }) })
            if (!r.ok) throw new Error(await r.text())
            setMsg('Past-due cleared')
          } catch (e: any) { setMsg('Failed: ' + (e?.message || '')) } finally { setClearing(false) }
        }} disabled={clearing} className="px-2 py-1 border rounded text-sm">
          {clearing ? 'Clearing…' : 'Clear Past‑Due'}
        </button>
      )}
      {msg && <span className="text-xs text-gray-600">{msg}</span>}
    </div>
  )
}
