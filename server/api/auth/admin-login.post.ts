type AdminLoginPayload = {
  email?: string
  password?: string
}

type AdminPermissions = {
  manage_banners: boolean
  manage_admins: boolean
  view_dashboard: boolean
}

const FALLBACK_ADMINS = [
  {
    email: 'admin@sunshine.com',
    password: 'Sunshinetelecom',
    role: 'admin',
    permissions: {
      manage_banners: true,
      manage_admins: false,
      view_dashboard: true
    }
  },
  {
    email: 'sst-it@sunshine.com',
    password: 'sunshinetelecom',
    role: 'super_admin',
    permissions: {
      manage_banners: true,
      manage_admins: true,
      view_dashboard: true
    }
  }
] as const

const DEFAULT_ADMIN_PERMISSIONS: AdminPermissions = {
  manage_banners: true,
  manage_admins: false,
  view_dashboard: true
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as AdminLoginPayload
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')

  if (!email || !password.trim()) {
    return { ok: false as const, errorKey: 'auth.requiredPassword' }
  }

  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    const fallback = FALLBACK_ADMINS.find((item) => item.email === email && item.password === password)
    return fallback
      ? { ok: true as const, email, role: fallback.role, permissions: fallback.permissions }
      : { ok: false as const, errorKey: 'auth.invalidAdminCredential' }
  }

  const row = await db
    .prepare(
      `SELECT a.email,
              COALESCE(p.role, 'admin') AS role,
              COALESCE(p.permissions_json, '{"manage_banners":true,"manage_admins":false,"view_dashboard":true}') AS permissions_json,
              COALESCE(p.is_active, 1) AS is_active
       FROM admins a
       LEFT JOIN admin_profiles p ON p.email = a.email
       WHERE a.email = ? AND a.password = ?
       LIMIT 1`
    )
    .bind(email, password)
    .first<{ email: string; role: string; permissions_json: string; is_active: number }>()

  if (!row?.email || Number(row.is_active) !== 1) {
    return { ok: false as const, errorKey: 'auth.invalidAdminCredential' }
  }

  let permissions: AdminPermissions = DEFAULT_ADMIN_PERMISSIONS
  try {
    permissions = {
      ...DEFAULT_ADMIN_PERMISSIONS,
      ...(JSON.parse(row.permissions_json || '{}') as Partial<AdminPermissions>)
    }
  } catch {
    permissions = DEFAULT_ADMIN_PERMISSIONS
  }

  return { ok: true as const, email: row.email, role: row.role, permissions }
})