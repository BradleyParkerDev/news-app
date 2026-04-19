-- =========================
-- Inspect database
-- =========================
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

SHOW TIMEZONE;


-- =========================
-- Select all rows
-- =========================
SELECT * FROM users;
SELECT * FROM sessions;
SELECT * FROM user_themes;
SELECT * FROM user_profile_images;
SELECT * FROM articles;
SELECT * FROM news_categories;
SELECT * FROM article_categories;
SELECT * FROM saved_articles;


-- =========================
-- Delete all rows
-- Child tables first, parent tables last
-- =========================
DELETE FROM saved_articles;
DELETE FROM article_categories;
DELETE FROM user_profile_images;
DELETE FROM user_themes;
DELETE FROM sessions;
DELETE FROM articles;
DELETE FROM news_categories;
DELETE FROM users;


-- =========================
-- Drop tables
-- Child tables first, parent tables last
-- =========================
DROP TABLE IF EXISTS saved_articles CASCADE;
DROP TABLE IF EXISTS article_categories CASCADE;
DROP TABLE IF EXISTS user_profile_images CASCADE;
DROP TABLE IF EXISTS user_themes CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS news_categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS theme;