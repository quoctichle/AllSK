<template>
  <section class="auth-card">
    <header>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </header>

    <form class="auth-form" @submit.prevent="onSubmitForm">
      <label>
        <span>{{ emailLabel }}</span>
        <input v-model="email" type="email" :placeholder="emailPlaceholder" required />
      </label>

      <label v-if="requirePassword">
        <span>{{ passwordLabel }}</span>
        <input
          v-model="password"
          type="password"
          :placeholder="passwordPlaceholder"
          autocomplete="current-password"
          required
        />
      </label>

      <button type="submit">{{ submitLabel }}</button>
    </form>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel?: string
  passwordPlaceholder?: string
  submitLabel: string
  requirePassword?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  submit: [payload: { email: string; password: string }]
}>()

const email = ref('')
const password = ref('')

const onSubmitForm = () => {
  emit('submit', {
    email: email.value,
    password: password.value
  })
}
</script>
