// POST /api/banners  →  insert a new banner record into D1
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB

  const body = await readBody(event) as {
    title: string
    subtitle: string
    imageUrl: string
    imageKey?: string | null
  }

  if (!body.title || !body.subtitle || !body.imageUrl) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const id = `bn-${Date.now()}`

  if (db) {
    await db
      .prepare('INSERT INTO banners (id, title, subtitle, image_url, image_key) VALUES (?, ?, ?, ?, ?)')
      .bind(id, body.title, body.subtitle, body.imageUrl, body.imageKey ?? null)
      .run()
  }

  return { id }
})
