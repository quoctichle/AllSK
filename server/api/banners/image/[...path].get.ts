// GET /api/banners/image/**  →  proxy an image from R2
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const bucket = cloudflare?.env?.R2_BUCKET

  // Catch-all param: captures everything after /api/banners/image/
  const pathParam = getRouterParam(event, 'path')
  if (!pathParam) {
    throw createError({ statusCode: 400, message: 'Missing image path' })
  }

  if (!bucket) {
    throw createError({ statusCode: 503, message: 'R2 not available' })
  }

  const obj = await bucket.get(pathParam)
  if (!obj) {
    throw createError({ statusCode: 404, message: 'Image not found' })
  }

  const contentType = obj.httpMetadata?.contentType ?? 'application/octet-stream'

  setResponseHeader(event, 'Content-Type', contentType)
  setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  setResponseHeader(event, 'ETag', obj.httpEtag)

  const arrayBuffer = await obj.arrayBuffer()
  return new Uint8Array(arrayBuffer)
})
