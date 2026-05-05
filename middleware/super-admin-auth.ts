export default defineNuxtRouteMiddleware(() => {
  const adminEmail = useCookie('admin_email')
  const adminAuth = useCookie<boolean>('admin_authenticated')
  const adminRole = useCookie('admin_role')

  if (!adminAuth.value || !adminEmail.value || adminRole.value !== 'super_admin') {
    return navigateTo('/admin')
  }
})