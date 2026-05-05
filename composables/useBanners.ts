export type BannerItem = {
  id: string
  title: string
  subtitle: string
  imageUrl: string
}

const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: 'bn-default-1',
    title: 'Su Kien Sunshine Telecom',
    subtitle: 'Bung no uu dai, rinh ngay qua khung cung Sunshine',
    imageUrl: '/logo.png'
  },
  {
    id: 'bn-default-2',
    title: 'Trai Nghiem Vien Thong Tai Nhat Ban',
    subtitle: 'Khuyen mai doc quyen danh cho thanh vien su kien',
    imageUrl: '/logo.png'
  }
]

export function useBanners() {
  const { data: banners, refresh } = useFetch<BannerItem[]>('/api/banners', {
    default: () => DEFAULT_BANNERS as BannerItem[],
    key: 'banners-list'
  })

  const addBanner = async (payload: Omit<BannerItem, 'id'> & { imageKey?: string | null }) => {
    await $fetch('/api/banners', {
      method: 'POST',
      body: payload
    })
    await refresh()
  }

  const removeBanner = async (id: string) => {
    await $fetch(`/api/banners/${id}`, { method: 'DELETE' })
    await refresh()
  }

  return {
    banners,
    addBanner,
    removeBanner,
    refresh
  }
}
