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

        <button type="submit" class="banner-add-btn">Them banner</button>
      </form>

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

const pickedImageData = ref('')
const errorMessage = ref('')

const onFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    pickedImageData.value = ''
    return
  }

  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    pickedImageData.value = ''
    errorMessage.value = 'Vui long chon file anh hop le.'
    return
  }

  errorMessage.value = ''
  pickedImageData.value = await readFileAsDataUrl(file)
}

const onAddBanner = () => {
  if (!pickedImageData.value) {
    errorMessage.value = 'Ban can tai anh banner truoc khi them.'
    return
  }

  addBanner({
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    imageUrl: pickedImageData.value
  })

  form.title = ''
  form.subtitle = ''
  pickedImageData.value = ''
  errorMessage.value = ''
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(String(reader.result || ''))
    }

    reader.onerror = () => {
      reject(new Error('Cannot read file'))
    }

    reader.readAsDataURL(file)
  })
}
</script>
