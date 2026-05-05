<template>
  <section class="dashboard">
    <div class="dashboard-head">
      <h1>Quan ly tai khoan admin</h1>
      <p>Tao them admin moi va phan quyen truy cap.</p>
    </div>

    <section class="dashboard-panel admin-manager">
      <form class="admin-form" @submit.prevent="onCreateAdmin">
        <label>
          <span>Email</span>
          <input v-model="createForm.email" type="email" placeholder="new-admin@sunshine.com" required />
        </label>

        <label>
          <span>Mat khau</span>
          <input v-model="createForm.password" type="text" placeholder="Nhap mat khau" required />
        </label>

        <label>
          <span>Role</span>
          <select v-model="createForm.role">
            <option value="admin">admin</option>
            <option value="super_admin">super_admin</option>
          </select>
        </label>

        <div class="permission-grid">
          <label><input v-model="createForm.permissions.view_dashboard" type="checkbox" /> Xem dashboard</label>
          <label><input v-model="createForm.permissions.manage_banners" type="checkbox" /> Quan ly banner</label>
          <label><input v-model="createForm.permissions.manage_admins" type="checkbox" /> Quan ly admin</label>
        </div>

        <button type="submit" class="banner-add-btn" :disabled="submitting">Tao tai khoan admin</button>
      </form>

      <p v-if="submitting" class="info-text">Dang luu tai khoan...</p>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-text">{{ successMessage }}</p>

      <div class="admin-list">
        <article v-for="item in admins" :key="item.email" class="admin-item">
          <div>
            <h3>{{ item.email }}</h3>
            <p>Role: <strong>{{ item.role }}</strong></p>
            <p>
              Quyen: dashboard={{ item.permissions.view_dashboard ? 'Y' : 'N' }},
              banners={{ item.permissions.manage_banners ? 'Y' : 'N' }},
              admins={{ item.permissions.manage_admins ? 'Y' : 'N' }}
            </p>
          </div>

          <div class="admin-item-controls">
            <label>
              <span>Role</span>
              <select v-model="item.role">
                <option value="admin">admin</option>
                <option value="super_admin">super_admin</option>
              </select>
            </label>

            <label><input v-model="item.permissions.view_dashboard" type="checkbox" /> Dashboard</label>
            <label><input v-model="item.permissions.manage_banners" type="checkbox" /> Banner</label>
            <label><input v-model="item.permissions.manage_admins" type="checkbox" /> Admin</label>
            <label><input v-model="item.isActive" type="checkbox" /> Active</label>

            <button class="plain-btn" @click="onSaveAdmin(item)">Luu quyen</button>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
type AdminItem = {
  email: string
  role: 'admin' | 'super_admin'
  permissions: {
    manage_banners: boolean
    manage_admins: boolean
    view_dashboard: boolean
  }
  isActive: boolean
  createdAt: number
}

definePageMeta({
  middleware: ['admin-auth', 'super-admin-auth'],
  layout: 'admin'
})

const { data, refresh } = useFetch<AdminItem[]>('/api/admin/admins', {
  default: () => []
})

const admins = computed(() => data.value || [])
const submitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const createForm = reactive({
  email: '',
  password: '',
  role: 'admin' as 'admin' | 'super_admin',
  permissions: {
    manage_banners: true,
    manage_admins: false,
    view_dashboard: true
  }
})

watch(
  () => createForm.role,
  (role) => {
    if (role === 'super_admin') {
      createForm.permissions.manage_admins = true
    }
  }
)

const onCreateAdmin = async () => {
  submitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch('/api/admin/admins', {
      method: 'POST',
      body: {
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
        permissions: createForm.permissions
      }
    })

    createForm.email = ''
    createForm.password = ''
    createForm.role = 'admin'
    createForm.permissions.manage_banners = true
    createForm.permissions.manage_admins = false
    createForm.permissions.view_dashboard = true
    successMessage.value = 'Da tao tai khoan admin moi.'
    await refresh()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Khong the tao admin'
    errorMessage.value = `Tao admin that bai: ${message}`
  } finally {
    submitting.value = false
  }
}

const onSaveAdmin = async (item: AdminItem) => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch(`/api/admin/admins/${encodeURIComponent(item.email)}`, {
      method: 'PATCH',
      body: {
        role: item.role,
        permissions: item.permissions,
        isActive: item.isActive
      }
    })

    successMessage.value = `Da cap nhat quyen cho ${item.email}`
    await refresh()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Khong the cap nhat'
    errorMessage.value = `Cap nhat that bai: ${message}`
  }
}
</script>