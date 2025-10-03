const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export async function fetchPlans(params: { duration: 'WEEKLY' | 'MONTHLY'; diet?: 'VEG' | 'NON_VEG' }) {
  const q = new URLSearchParams()
  q.set('duration', params.duration)
  if (params.diet) q.set('diet', params.diet)
  const res = await fetch(`${API_URL}/plans?${q.toString()}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch plans')
  return res.json()
}

export async function createSubscription(body: any) {
  const res = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to create subscription')
  return res.json()
}
