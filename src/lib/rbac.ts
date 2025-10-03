export function isAdmin(email?: string | null) {
  if (!email) return false
  const list = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
  return list.includes(email.toLowerCase())
}
