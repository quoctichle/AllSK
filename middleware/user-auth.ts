export default defineNuxtRouteMiddleware(() => {
  const userEmail = useCookie('user_email')

  if (!userEmail.value) {
    return navigateTo('/login/user')
  }
})
