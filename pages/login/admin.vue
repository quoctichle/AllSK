<template>
  <section class="auth-page container">
    <AuthFormCard
      :title="t('auth.adminLoginTitle')"
      :description="t('auth.adminLoginDesc')"
      :email-label="t('common.email')"
      :password-label="t('common.password')"
      email-placeholder="admin@sunshine.com"
      password-placeholder="********"
      :submit-label="t('common.continue')"
      :require-password="true"
      :error-message="errorMessage"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18nText()
const { isAdminAuthenticated, loginAdmin } = useAuth()
const errorMessage = ref('')

if (isAdminAuthenticated.value) {
  await navigateTo('/admin')
}

const onSubmit = async (payload: { email: string; password: string }) => {
  errorMessage.value = ''

  const result = await loginAdmin(payload.email, payload.password)

  if (!result.ok) {
    errorMessage.value = t(result.errorKey)
    return
  }

  await navigateTo('/admin')
}
</script>
