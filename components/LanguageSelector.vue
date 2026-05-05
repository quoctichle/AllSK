<template>
  <div class="lang-flag-menu" @click.stop>
    <button class="lang-flag-btn" @click="open = !open" :title="current.label">
      <img :src="current.flag" :alt="current.label" class="flag-img" />
      <svg class="chevron" :class="{ open }" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div v-if="open" class="lang-dropdown">
      <button
        v-for="item in localeOptions"
        :key="item.value"
        class="lang-option"
        :class="{ active: locale === item.value }"
        @click="select(item.value)"
      >
        <img :src="item.flag" :alt="item.label" class="flag-img" />
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, localeOptions, setLocale } = useI18nText()

const open = ref(false)

const current = computed(() => localeOptions.find(o => o.value === locale.value) ?? localeOptions[0])

const select = (val: 'ja' | 'en' | 'vi') => {
  setLocale(val)
  open.value = false
}

if (import.meta.client) {
  document.addEventListener('click', () => { open.value = false })
}
</script>
