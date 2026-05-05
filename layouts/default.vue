<template>
  <div class="site-shell">
    <div class="bg-orb bg-orb-one" />
    <div class="bg-orb bg-orb-two" />

    <NuxtLoadingIndicator color="var(--accent-2)" />
    <AppHeader />

    <main class="site-main">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
