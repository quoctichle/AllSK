<template>
  <section class="auth-page container">
    <AuthFormCard
      :title="t('auth.userLoginTitle')"
      :description="t('auth.userLoginDesc')"
      :email-label="t('common.email')"
      email-placeholder="example@gmail.com"
      :submit-label="t('common.continue')"
      :error-message="errorMessage"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18nText()
const { isUserAuthenticated, loginUser } = useAuth()
const errorMessage = ref('')

if (isUserAuthenticated.value) {
  await navigateTo('/user')
}

const onSubmit = async (payload: { email: string }) => {
  errorMessage.value = ''

  const result = loginUser(payload.email)

  if (!result.ok) {
    errorMessage.value = t(result.errorKey)
    return
  }

  await navigateTo('/user')
}
</script>
