// DELETE /api/banners/:id  →  remove banner from D1 and its image from R2
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing banner id' })
  }

  const db = cloudflare?.env?.DB
  const bucket = cloudflare?.env?.R2_BUCKET

  if (db) {
    // Fetch image_key so we can delete from R2
    const row = await db
      .prepare('SELECT image_key FROM banners WHERE id = ?')
      .bind(id)
      .first<{ image_key: string | null }>()

    if (row?.image_key && bucket) {
      await bucket.delete(row.image_key)
    }

    await db.prepare('DELETE FROM banners WHERE id = ?').bind(id).run()
  }

  return { ok: true }
})
