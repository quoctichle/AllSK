-- D1 schema for Sunshine Telecom Event app data
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

-- Admin accounts (can add more later)
CREATE TABLE IF NOT EXISTS admins (
  email       TEXT PRIMARY KEY,
  password    TEXT NOT NULL,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

-- End users (gmail only)
CREATE TABLE IF NOT EXISTS users (
  email          TEXT PRIMARY KEY,
  created_at     INTEGER NOT NULL DEFAULT (unixepoch()),
  last_login_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Default admin account
INSERT OR IGNORE INTO admins (email, password) VALUES
  ('admin@sunshine.com', 'Sunshinetelecom'),
  ('sst-it@sunshine.com', 'sunshinetelecom');

-- Admin profile for role + fine-grained permissions
CREATE TABLE IF NOT EXISTS admin_profiles (
  email            TEXT PRIMARY KEY,
  role             TEXT NOT NULL DEFAULT 'admin',
  permissions_json TEXT NOT NULL DEFAULT '{"manage_banners":true,"manage_admins":false,"view_dashboard":true}',
  is_active        INTEGER NOT NULL DEFAULT 1,
  updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (email) REFERENCES admins(email) ON DELETE CASCADE
);

INSERT OR IGNORE INTO admin_profiles (email, role, permissions_json, is_active) VALUES
  ('admin@sunshine.com', 'admin', '{"manage_banners":true,"manage_admins":false,"view_dashboard":true}', 1),
  ('sst-it@sunshine.com', 'super_admin', '{"manage_banners":true,"manage_admins":true,"view_dashboard":true}', 1);
