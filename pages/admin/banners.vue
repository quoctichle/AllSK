<template>
  <section class="dashboard">
    <div class="dashboard-head">
      <h1>Quan ly banner</h1>
      <p>Them, xem va xoa banner hien thi o trang user.</p>
    </div>

    <section class="dashboard-panel banner-admin">
      <form class="banner-form" @submit.prevent="onAddBanner">
        <label>
          <span>Tieu de banner</span>
          <input v-model="form.title" type="text" placeholder="Su Kien Sunshine Telecom" required />
        </label>

        <label>
          <span>Mo ta ngan</span>
          <input
            v-model="form.subtitle"
            type="text"
            placeholder="Bung no uu dai, rinh ngay qua khung"
            required
          />
        </label>

        <label>
          <span>Tai anh banner</span>
          <input type="file" accept="image/*" @change="onFileChange" required />
        </label>

        <button type="submit" class="banner-add-btn" :disabled="uploading">Them banner</button>
      </form>

      <p v-if="uploading" class="info-text">Dang tai anh len...</p>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <div class="banner-list">
        <article v-for="item in banners" :key="item.id" class="banner-item">
          <img :src="item.imageUrl" :alt="item.title" />
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.subtitle }}</p>
          </div>
          <button class="banner-delete-btn" @click="removeBanner(item.id)">Xoa</button>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['admin-auth'],
  layout: 'admin'
})

const { banners, addBanner, removeBanner } = useBanners()

const form = reactive({
  title: '',
  subtitle: ''
})

const pickedFile = ref<File | null>(null)
const pickedPreview = ref('')
const uploading = ref(false)
const errorMessage = ref('')

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    pickedFile.value = null
    pickedPreview.value = ''
    return
  }

  if (!file.type.startsWith('image/')) {
    pickedFile.value = null
    pickedPreview.value = ''
    errorMessage.value = 'Vui long chon file anh hop le.'
    return
  }

  errorMessage.value = ''
  pickedFile.value = file

  // Local preview
  const reader = new FileReader()
  reader.onload = () => { pickedPreview.value = String(reader.result ?? '') }
  reader.readAsDataURL(file)
}

const onAddBanner = async () => {
  if (!pickedFile.value) {
    errorMessage.value = 'Ban can tai anh banner truoc khi them.'
    return
  }

  uploading.value = true
  errorMessage.value = ''

  try {
    // 1. Upload image to R2
    const fd = new FormData()
    fd.append('image', pickedFile.value)

    const { key, imageUrl } = await $fetch<{ key: string; imageUrl: string }>(
      '/api/banners/upload',
      { method: 'POST', body: fd }
    )

    // 2. Save metadata to D1
    await addBanner({
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      imageUrl,
      imageKey: key
    })

    form.title = ''
    form.subtitle = ''
    pickedFile.value = null
    pickedPreview.value = ''
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Loi khong xac dinh'
    errorMessage.value = `Them banner that bai: ${msg}`
  } finally {
    uploading.value = false
  }
}
</script>
