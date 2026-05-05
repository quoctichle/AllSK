// GET /api/banners  →  list all banners from D1
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB

  if (!db) {
    // Fallback for local dev without wrangler bindings
    return [
      { id: 'bn-default-1', title: 'Su Kien Sunshine Telecom', subtitle: 'Bung no uu dai, rinh ngay qua khung cung Sunshine', imageUrl: '/logo.png' },
      { id: 'bn-default-2', title: 'Trai Nghiem Vien Thong Tai Nhat Ban', subtitle: 'Khuyen mai doc quyen danh cho thanh vien su kien', imageUrl: '/logo.png' }
    ]
  }

  const { results } = await db
    .prepare('SELECT id, title, subtitle, image_url AS imageUrl FROM banners ORDER BY created_at ASC')
    .all()

  return results
})
