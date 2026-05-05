<template>
  <header class="app-header">
    <div class="header-content container">
      <NuxtLink to="/user" class="brand-block">
        <img src="/logo.png" alt="ALLSK logo" class="brand-logo" />
        <div>
          <strong>{{ t('app.name') }}</strong>
        </div>
      </NuxtLink>

      <div class="header-actions">
        <div v-if="showUserMenu" class="user-menu" @click.stop>
          <button class="user-chip" @click="userMenuOpen = !userMenuOpen">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            {{ userEmail }}
            <svg class="chevron" :class="{ open: userMenuOpen }" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div v-if="userMenuOpen" class="user-dropdown">
            <button class="dropdown-item logout" @click="handleLogoutUser">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              {{ t('common.logout') }}
            </button>
          </div>
        </div>

        <div v-if="showAdminMenu" class="user-menu" @click.stop>
          <button class="user-chip" @click="adminMenuOpen = !adminMenuOpen">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            {{ adminEmail }}
            <svg class="chevron" :class="{ open: adminMenuOpen }" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div v-if="adminMenuOpen" class="user-dropdown">
            <button class="dropdown-item logout" @click="handleLogoutAdmin">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              {{ t('common.logout') }}
            </button>
          </div>
        </div>

        <LanguageSelector v-if="showLanguageSelector" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18nText()
const { isUserAuthenticated, isAdminAuthenticated, userEmail, adminEmail, logoutUser, logoutAdmin } = useAuth()
const route = useRoute()

const userMenuOpen = ref(false)
const adminMenuOpen = ref(false)
const showAdminMenu = computed(() => route.path.startsWith('/admin') && isAdminAuthenticated.value)
const showUserMenu = computed(() => !route.path.startsWith('/admin') && isUserAuthenticated.value)
const showLanguageSelector = computed(() => !route.path.startsWith('/admin'))

const handleLogoutUser = () => {
  userMenuOpen.value = false
  logoutUser()
  navigateTo('/login/user')
}

const handleLogoutAdmin = () => {
  adminMenuOpen.value = false
  logoutAdmin()
  navigateTo('/login/admin')
}

if (import.meta.client) {
  document.addEventListener('click', () => {
    userMenuOpen.value = false
    adminMenuOpen.value = false
  })
}
</script>
