import type { D1Database, R2Bucket } from '@cloudflare/workers-types'

export {}

declare module 'h3' {
  interface H3EventContext {
    cloudflare?: {
      env: {
        DB: D1Database
        R2_BUCKET: R2Bucket
      }
    }
  }
}
