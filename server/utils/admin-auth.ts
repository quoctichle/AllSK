import { createError, getCookie, type H3Event } from 'h3'

export type AdminPermissions = {
  manage_banners: boolean
  manage_admins: boolean
  view_dashboard: boolean
}

export const DEFAULT_ADMIN_PERMISSIONS: AdminPermissions = {
  manage_banners: true,
  manage_admins: false,
  view_dashboard: true
}

export async function getCurrentAdminContext(event: H3Event) {
  const isAuthenticated = getCookie(event, 'admin_authenticated')
  const adminEmail = String(getCookie(event, 'admin_email') || '').trim().toLowerCase()

  if (!isAuthenticated || !adminEmail) {
    return null
  }

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    return null
  }

  const row = await db
    .prepare(
      `SELECT a.email,
              COALESCE(p.role, 'admin') AS role,
              COALESCE(p.permissions_json, '{"manage_banners":true,"manage_admins":false,"view_dashboard":true}') AS permissions_json,
              COALESCE(p.is_active, 1) AS is_active
       FROM admins a
       LEFT JOIN admin_profiles p ON p.email = a.email
       WHERE a.email = ?
       LIMIT 1`
    )
    .bind(adminEmail)
    .first<{ email: string; role: string; permissions_json: string; is_active: number }>()

  if (!row?.email || Number(row.is_active) !== 1) {
    return null
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

  return {
    email: row.email,
    role: row.role,
    permissions
  }
}

export async function assertSuperAdmin(event: H3Event) {
  const current = await getCurrentAdminContext(event)

  if (!current || current.role !== 'super_admin') {
    throw createError({ statusCode: 403, message: 'Only super admin can perform this action' })
  }

  return current
}