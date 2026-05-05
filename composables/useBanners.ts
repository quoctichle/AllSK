export type BannerItem = {
  id: string
  title: string
  subtitle: string
  imageUrl: string
}

const STORAGE_KEY = 'event_banners_storage'

const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: 'bn-1',
    title: 'Su Kien Sunshine Telecom',
    subtitle: 'Bung no uu dai, rinh ngay qua khung cung Sunshine',
    imageUrl: '/logo.png'
  },
  {
    id: 'bn-2',
    title: 'Trai Nghiem Vien Thong Tai Nhat Ban',
    subtitle: 'Khuyen mai doc quyen danh cho thanh vien su kien',
    imageUrl: '/logo.png'
  }
]

function normalizeBanners(source: BannerItem[] | undefined): BannerItem[] {
  if (!Array.isArray(source) || source.length === 0) {
    return DEFAULT_BANNERS
  }

  return source.filter((item) => item?.title && item?.subtitle && item?.imageUrl)
}

export function useBanners() {
  const banners = useState<BannerItem[]>('event_banners_state', () => DEFAULT_BANNERS)

  if (import.meta.client) {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw) {
      try {
        banners.value = normalizeBanners(JSON.parse(raw) as BannerItem[])
      } catch {
        banners.value = DEFAULT_BANNERS
      }
    }
  }

  watch(
    banners,
    (next) => {
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      }
    },
    { deep: true }
  )

  const addBanner = (payload: Omit<BannerItem, 'id'>) => {
    banners.value = [
      ...banners.value,
      {
        id: `bn-${Date.now()}`,
        ...payload
      }
    ]
  }

  const removeBanner = (id: string) => {
    const next = banners.value.filter((item) => item.id !== id)
    banners.value = next.length > 0 ? next : DEFAULT_BANNERS
  }

  return {
    banners,
    addBanner,
    removeBanner
  }
}
