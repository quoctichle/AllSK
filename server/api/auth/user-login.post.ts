type UserLoginPayload = {
  email?: string
}

function isValidGmail(email: string): boolean {
  return /^[^\s@]+@gmail\.com$/i.test(email)
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as UserLoginPayload
  const email = String(body.email || '').trim().toLowerCase()

  if (!isValidGmail(email)) {
    return { ok: false as const, errorKey: 'auth.invalidEmail' }
  }

  const db = event.context.cloudflare?.env?.DB

  if (db) {
    await db
      .prepare(
        'INSERT INTO users (email, last_login_at) VALUES (?, unixepoch()) ON CONFLICT(email) DO UPDATE SET last_login_at = excluded.last_login_at'
      )
      .bind(email)
      .run()
  }

  return { ok: true as const, email }
})