const ADMIN_EMAIL = 'admin@sunshine.com'
const ADMIN_PASSWORD = 'Sunshinetelecom'

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

  const loginUser = (email: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!isValidGmail(normalizedEmail)) {
      return { ok: false as const, errorKey: 'auth.invalidEmail' }
    }

    userEmail.value = normalizedEmail
    return { ok: true as const }
  }

  const loginAdmin = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!password.trim()) {
      return { ok: false as const, errorKey: 'auth.requiredPassword' }
    }

    if (normalizedEmail !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      adminAuthenticated.value = false
      adminEmail.value = ''
      return { ok: false as const, errorKey: 'auth.invalidAdminCredential' }
    }

    adminAuthenticated.value = true
    adminEmail.value = normalizedEmail
    return { ok: true as const }
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
      password: ADMIN_PASSWORD
    }
  }
}
