<template>
  <div class="site-shell">
    <div class="bg-orb bg-orb-one" />
    <div class="bg-orb bg-orb-two" />

    <NuxtLoadingIndicator color="var(--accent-2)" />
    <AppHeader />

    <main class="site-main">
      <div class="container admin-layout">
        <aside class="admin-sidebar">
          <NuxtLink to="/admin" class="admin-nav-link" :class="{ active: route.path === '/admin' }">
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/banners"
            class="admin-nav-link"
            :class="{ active: route.path.startsWith('/admin/banners') }"
          >
            Quan ly banner
          </NuxtLink>
          <NuxtLink
            v-if="isSuperAdmin"
            to="/admin/admins"
            class="admin-nav-link"
            :class="{ active: route.path.startsWith('/admin/admins') }"
          >
            Quan ly admin
          </NuxtLink>
        </aside>

        <section class="admin-content">
          <slot />
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18nText()
const { isSuperAdmin } = useAuth()
const route = useRoute()

if (locale.value !== 'vi') {
  setLocale('vi')
}
</script>
