const ADMIN_EMAIL = 'admin@sunshine.com'

function isValidGmail(email: string): boolean {
  return /^[^\s@]+@gmail\.com$/i.test(email.trim())
}

export function useAuth() {
  const userEmailCookie = useCookie<string>('user_email', {
    default: () => '',
    sameSite: 'lax'
  })

  const adminEmailCookie = useCookie<string>('admin_email', {
    default: () => '',
    sameSite: 'lax'
  })

  const adminAuthCookie = useCookie<boolean>('admin_authenticated', {
    default: () => false,
    sameSite: 'lax'
  })

  const userEmail = useState<string>('user_email_state', () => userEmailCookie.value || '')
  const adminEmail = useState<string>('admin_email_state', () => adminEmailCookie.value || '')
  const adminAuthenticated = useState<boolean>('admin_auth_state', () => !!adminAuthCookie.value)

  watch(userEmail, (nextValue) => {
    userEmailCookie.value = nextValue
  })

  watch(adminEmail, (nextValue) => {
    adminEmailCookie.value = nextValue
  })

  watch(adminAuthenticated, (nextValue) => {
    adminAuthCookie.value = nextValue
  })

  const isUserAuthenticated = computed(() => !!userEmail.value)
  const isAdminAuthenticated = computed(() => adminAuthenticated.value && !!adminEmail.value)

  const loginUser = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!isValidGmail(normalizedEmail)) {
      return { ok: false as const, errorKey: 'auth.invalidEmail' }
    }

    try {
      const result = await $fetch<{ ok: boolean; errorKey?: string; email?: string }>('/api/auth/user-login', {
        method: 'POST',
        body: { email: normalizedEmail }
      })

      if (!result.ok || !result.email) {
        return { ok: false as const, errorKey: (result.errorKey || 'auth.invalidEmail') as string }
      }

      userEmail.value = result.email
      return { ok: true as const }
    } catch {
      return { ok: false as const, errorKey: 'auth.invalidEmail' }
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!password.trim()) {
      return { ok: false as const, errorKey: 'auth.requiredPassword' }
    }

    try {
      const result = await $fetch<{ ok: boolean; errorKey?: string; email?: string }>('/api/auth/admin-login', {
        method: 'POST',
        body: {
          email: normalizedEmail,
          password
        }
      })

      if (!result.ok || !result.email) {
        adminAuthenticated.value = false
        adminEmail.value = ''
        return { ok: false as const, errorKey: (result.errorKey || 'auth.invalidAdminCredential') as string }
      }

      adminAuthenticated.value = true
      adminEmail.value = result.email
      return { ok: true as const }
    } catch {
      adminAuthenticated.value = false
      adminEmail.value = ''
      return { ok: false as const, errorKey: 'auth.invalidAdminCredential' }
    }
  }

  const logoutUser = () => {
    userEmail.value = ''
  }

  const logoutAdmin = () => {
    adminAuthenticated.value = false
    adminEmail.value = ''
  }

  return {
    userEmail,
    adminEmail,
    isUserAuthenticated,
    isAdminAuthenticated,
    loginUser,
    loginAdmin,
    logoutUser,
    logoutAdmin,
    adminCredentialHint: {
      email: ADMIN_EMAIL,
      password: 'Managed in D1'
    }
  }
}
