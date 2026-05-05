-- D1 schema for Sunshine Telecom Event banners
-- Run: npx wrangler d1 execute sunshine_banners --file=server/database/schema.sql

CREATE TABLE IF NOT EXISTS banners (
  id          TEXT    PRIMARY KEY,
  title       TEXT    NOT NULL,
  subtitle    TEXT    NOT NULL,
  image_url   TEXT    NOT NULL,
  image_key   TEXT,                           -- R2 key; NULL for built-in images
  created_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Default banners (use public /logo.png, no R2 key)
INSERT OR IGNORE INTO banners (id, title, subtitle, image_url, image_key, created_at) VALUES
  ('bn-default-1', 'Su Kien Sunshine Telecom', 'Bung no uu dai, rinh ngay qua khung cung Sunshine', '/logo.png', NULL, 0),
  ('bn-default-2', 'Trai Nghiem Vien Thong Tai Nhat Ban', 'Khuyen mai doc quyen danh cho thanh vien su kien', '/logo.png', NULL, 1);
