import { assertSuperAdmin, DEFAULT_ADMIN_PERMISSIONS, type AdminPermissions } from '../../utils/admin-auth'

type CreateAdminPayload = {
  email?: string
  password?: string
  role?: string
  permissions?: Partial<AdminPermissions>
}

export default defineEventHandler(async (event) => {
  await assertSuperAdmin(event)

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({ statusCode: 503, message: 'Database is not available' })
  }

  const body = (await readBody(event)) as CreateAdminPayload
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const role = body.role === 'super_admin' ? 'super_admin' : 'admin'

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  const permissions: AdminPermissions = {
    ...DEFAULT_ADMIN_PERMISSIONS,
    ...(body.permissions || {}),
    manage_admins: role === 'super_admin' ? true : Boolean(body.permissions?.manage_admins)
  }

  await db
    .prepare('INSERT INTO admins (email, password) VALUES (?, ?)')
    .bind(email, password)
    .run()

  await db
    .prepare('INSERT OR REPLACE INTO admin_profiles (email, role, permissions_json, is_active, updated_at) VALUES (?, ?, ?, 1, unixepoch())')
    .bind(email, role, JSON.stringify(permissions))
    .run()

  return { ok: true }
})