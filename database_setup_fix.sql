-- SCRIPT PERBAIKAN DATABASE --

-- 1. Hapus tabel lama jika ada (untuk memastikan kita mulai dari awal yang bersih)
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS categories;

-- 2. Buat ulang tabel untuk kategori menu
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- 3. Buat ulang tabel untuk item menu
CREATE TABLE menus (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  category_id BIGINT REFERENCES categories(id)
);

-- 4. Masukkan beberapa data kategori contoh
INSERT INTO categories (name, slug)
VALUES
  ('Pempek', 'pempek'),
  ('Kuah', 'kuah');

-- 5. Masukkan beberapa data menu contoh
INSERT INTO menus (name, price, description, category_id, image_url)
VALUES
  ('Pempek Kapal Selam', 25000, 'Pempek besar dengan isian telur utuh.', 1, '/images/kapal-selam.jpg'),
  ('Pempek Lenjer', 22000, 'Pempek lonjong klasik dengan rasa ikan premium.', 1, '/images/lenjer.jpg'),
  ('Pempek Kulit Krispi', 18000, 'Pempek kulit ikan yang digoreng renyah.', 1, '/images/kulit.jpg'),
  ('Tekwan', 20000, 'Sup bola ikan khas Palembang dengan kuah udang.', 2, '/images/tekwan.jpg');

-- 6. Aktifkan Row Level Security (PENTING UNTUK KEAMANAN)
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 7. Buat "policy" agar semua orang bisa MEMBACA data menu dan kategori
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read menus" ON menus FOR SELECT USING (true);
