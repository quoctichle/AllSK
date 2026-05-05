<template>
  <section class="dashboard">
    <div class="dashboard-head">
      <h1>{{ t('adminPage.title') }}</h1>
      <p>{{ t('auth.adminWelcome', { email: adminEmail }) }}</p>
    </div>

    <p class="dashboard-description">{{ t('adminPage.description') }}</p>

    <div class="panel-grid">
      <article class="dashboard-panel">
        <h2>{{ t('adminPage.panelOneTitle') }}</h2>
        <p>{{ t('adminPage.panelOneBody') }}</p>
      </article>
      <article class="dashboard-panel">
        <h2>{{ t('adminPage.panelTwoTitle') }}</h2>
        <p>{{ t('adminPage.panelTwoBody') }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['admin-auth'],
  layout: 'admin'
})

const { t } = useI18nText()
const { adminEmail } = useAuth()
</script>
