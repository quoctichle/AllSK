import { assertSuperAdmin, DEFAULT_ADMIN_PERMISSIONS, type AdminPermissions } from '../../../utils/admin-auth'

type UpdateAdminPayload = {
  role?: string
  permissions?: Partial<AdminPermissions>
  isActive?: boolean
}

export default defineEventHandler(async (event) => {
  await assertSuperAdmin(event)

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({ statusCode: 503, message: 'Database is not available' })
  }

  const email = decodeURIComponent(String(getRouterParam(event, 'email') || '')).trim().toLowerCase()
  if (!email) {
    throw createError({ statusCode: 400, message: 'Missing admin email' })
  }

  const body = (await readBody(event)) as UpdateAdminPayload
  const role = body.role === 'super_admin' ? 'super_admin' : 'admin'

  const existing = await db
    .prepare('SELECT permissions_json, is_active FROM admin_profiles WHERE email = ? LIMIT 1')
    .bind(email)
    .first<{ permissions_json: string; is_active: number }>()

  let existingPermissions: AdminPermissions = DEFAULT_ADMIN_PERMISSIONS
  try {
    existingPermissions = {
      ...DEFAULT_ADMIN_PERMISSIONS,
      ...(JSON.parse(existing?.permissions_json || '{}') as Partial<AdminPermissions>)
    }
  } catch {
    existingPermissions = DEFAULT_ADMIN_PERMISSIONS
  }

  const permissions: AdminPermissions = {
    ...existingPermissions,
    ...(body.permissions || {}),
    manage_admins: role === 'super_admin' ? true : Boolean(body.permissions?.manage_admins ?? existingPermissions.manage_admins)
  }

  const isActive = typeof body.isActive === 'boolean' ? body.isActive : Number(existing?.is_active ?? 1) === 1

  await db
    .prepare('INSERT OR REPLACE INTO admin_profiles (email, role, permissions_json, is_active, updated_at) VALUES (?, ?, ?, ?, unixepoch())')
    .bind(email, role, JSON.stringify(permissions), isActive ? 1 : 0)
    .run()

  return { ok: true }
})