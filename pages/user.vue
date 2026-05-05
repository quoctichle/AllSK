<template>
  <section class="dashboard">
    <section class="user-banner" aria-label="Event banners">
      <div class="banner-track" :style="trackStyle" @transitionend="onTrackTransitionEnd">
        <article
          v-for="banner in sliderBanners"
          :key="banner.id"
          class="banner-slide"
          :style="{ backgroundImage: `linear-gradient(102deg, rgba(222, 242, 255, 0.88), rgba(203, 243, 236, 0.76)), url(${banner.imageUrl})` }"
        >
          <div class="banner-content">
            <h2>{{ banner.title }}</h2>
            <p>{{ banner.subtitle }}</p>
          </div>
        </article>
      </div>
      <div v-if="banners.length > 1" class="banner-dots">
        <button
          v-for="(_, idx) in banners"
          :key="`dot-${idx}`"
          class="dot"
          :class="{ active: idx === displayIndex }"
          @click="goToSlide(idx)"
        />
      </div>
    </section>

    <section class="dashboard-body container">
      <div class="dashboard-head">
        <h1>{{ t('userPage.title') }}</h1>
        <p>{{ t('auth.userWelcome', { email: userEmail }) }}</p>
      </div>

      <p class="dashboard-description">{{ t('userPage.description') }}</p>

      <div class="panel-grid">
        <article class="dashboard-panel">
          <h2>{{ t('userPage.panelOneTitle') }}</h2>
          <p>{{ t('userPage.panelOneBody') }}</p>
        </article>
        <article class="dashboard-panel">
          <h2>{{ t('userPage.panelTwoTitle') }}</h2>
          <p>{{ t('userPage.panelTwoBody') }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['user-auth']
})

const { t } = useI18nText()
const { userEmail } = useAuth()
const { banners } = useBanners()

const activeIndex = ref(0)
const enableTransition = ref(true)
let timer: ReturnType<typeof setInterval> | null = null

const runNextFrame = (cb: () => void) => {
  if (import.meta.client && typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(cb)
    return
  }

  cb()
}

const sliderBanners = computed(() => {
  if (banners.value.length <= 1) {
    return banners.value
  }

  return [...banners.value, banners.value[0]]
})

const displayIndex = computed(() => {
  if (banners.value.length === 0) {
    return 0
  }

  return activeIndex.value >= banners.value.length ? 0 : activeIndex.value
})

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * 100}%)`,
  transition: enableTransition.value ? 'transform 0.7s ease' : 'none'
}))

const nextSlide = () => {
  if (banners.value.length <= 1) {
    return
  }

  enableTransition.value = true
  activeIndex.value += 1
}

const goToSlide = (index: number) => {
  enableTransition.value = true
  activeIndex.value = index
  restartAutoSlide()
}

const onTrackTransitionEnd = () => {
  if (banners.value.length <= 1) {
    return
  }

  if (activeIndex.value === sliderBanners.value.length - 1) {
    enableTransition.value = false
    activeIndex.value = 0

    runNextFrame(() => {
      enableTransition.value = true
    })
  }
}

const restartAutoSlide = () => {
  if (!import.meta.client) {
    return
  }

  if (timer) {
    clearInterval(timer)
    timer = null
  }

  if (banners.value.length > 1) {
    timer = setInterval(nextSlide, 5000)
  }
}

watch(
  () => banners.value.length,
  () => {
    activeIndex.value = 0
    enableTransition.value = false
    runNextFrame(() => {
      enableTransition.value = true
    })
    restartAutoSlide()
  },
  { immediate: true }
)

onMounted(() => {
  restartAutoSlide()
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
