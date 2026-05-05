// POST /api/banners/upload  →  upload banner image to R2, return key + imageUrl
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const bucket = cloudflare?.env?.R2_BUCKET

  const formData = await readFormData(event)
  const file = formData.get('image') as File | null

  if (!file || typeof file === 'string') {
    throw createError({ statusCode: 400, message: 'No image file provided' })
  }

  if (!file.type.startsWith('image/')) {
    throw createError({ statusCode: 400, message: 'File must be an image' })
  }

  const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
  const key = `banners/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  if (bucket) {
    const arrayBuffer = await file.arrayBuffer()
    await bucket.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type }
    })
  }

  return {
    key,
    imageUrl: `/api/banners/image/${key}`
  }
})
