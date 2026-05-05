type AdminLoginPayload = {
  email?: string
  password?: string
}

const FALLBACK_ADMIN_EMAIL = 'admin@sunshine.com'
const FALLBACK_ADMIN_PASSWORD = 'Sunshinetelecom'

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as AdminLoginPayload
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')

  if (!email || !password.trim()) {
    return { ok: false as const, errorKey: 'auth.requiredPassword' }
  }

  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    const validFallback = email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD
    return validFallback
      ? { ok: true as const, email }
      : { ok: false as const, errorKey: 'auth.invalidAdminCredential' }
  }

  const row = await db
    .prepare('SELECT email FROM admins WHERE email = ? AND password = ? LIMIT 1')
    .bind(email, password)
    .first<{ email: string }>()

  if (!row?.email) {
    return { ok: false as const, errorKey: 'auth.invalidAdminCredential' }
  }

  return { ok: true as const, email: row.email }
})