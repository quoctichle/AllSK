export default defineNuxtRouteMiddleware(() => {
  const adminEmail = useCookie('admin_email')
  const adminAuth = useCookie<boolean>('admin_authenticated')

  if (!adminAuth.value || !adminEmail.value) {
    return navigateTo('/login/admin')
  }
})
