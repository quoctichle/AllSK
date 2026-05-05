import { assertSuperAdmin, DEFAULT_ADMIN_PERMISSIONS, type AdminPermissions } from '../../utils/admin-auth'

type AdminRow = {
  email: string
  role: string
  permissions_json: string
  is_active: number
  created_at: number
}

export default defineEventHandler(async (event) => {
  await assertSuperAdmin(event)

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    return []
  }

  const { results } = await db
    .prepare(
      `SELECT a.email,
              COALESCE(p.role, 'admin') AS role,
              COALESCE(p.permissions_json, '{"manage_banners":true,"manage_admins":false,"view_dashboard":true}') AS permissions_json,
              COALESCE(p.is_active, 1) AS is_active,
              a.created_at
       FROM admins a
       LEFT JOIN admin_profiles p ON p.email = a.email
       ORDER BY a.created_at ASC`
    )
    .all<AdminRow>()

  return (results || []).map((item) => {
    let permissions: AdminPermissions = DEFAULT_ADMIN_PERMISSIONS
    try {
      permissions = {
        ...DEFAULT_ADMIN_PERMISSIONS,
        ...(JSON.parse(item.permissions_json || '{}') as Partial<AdminPermissions>)
      }
    } catch {
      permissions = DEFAULT_ADMIN_PERMISSIONS
    }

    return {
      email: item.email,
      role: item.role,
      permissions,
      isActive: Number(item.is_active) === 1,
      createdAt: item.created_at
    }
  })
})