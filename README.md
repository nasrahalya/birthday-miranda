# 🏴‍☠️ Happy Birthday Kak Miranda!

Website ulang tahun interaktif bertema **One Piece** dengan animasi kue, tiup lilin, konfeti, dan lagu — siap deploy ke GitHub Pages.

---

## 🗂️ Struktur File

```
birthday-miranda/
├── index.html      ← Halaman utama (kue + lilin)
├── yes.html        ← Halaman pesan + konfeti
├── script.js       ← Logika tiup lilin & partikel
├── yes-script.js   ← Animasi konfeti & reveal pesan
├── style.css       ← Semua styling (One Piece theme)
└── README.md       ← Panduan ini
```

---

## 🎮 Alur Interaksi

1. **Buka `index.html`** → muncul kue ulang tahun bertema One Piece 🎂
2. **Klik kue 3x** → tiup lilin satu per satu, muncul asap + efek cincin 🕯️
3. **Tombol "Buka Pesannya 💌"** muncul setelah semua lilin padam ✨
4. **Klik tombol** → pindah ke `yes.html`
5. **Konfeti meledak** + Happy Birthday melody otomatis bermain 🎵
6. **Pesan muncul bertahap** saat scroll — Wanted Poster, surat, kartu doa 💛

---

## 🚀 Deploy ke GitHub Pages (Gratis!)

### Langkah 1 — Buat Repository
1. Buka [github.com](https://github.com) → login
2. Klik tombol **"New"** (repository baru)
3. Nama repo: `birthday-miranda` (atau apa saja)
4. Pilih **Public**
5. Klik **"Create repository"**

### Langkah 2 — Upload File
1. Di halaman repo yang baru dibuat, klik **"uploading an existing file"**
2. Drag & drop semua file berikut:
   - `index.html`
   - `yes.html`
   - `script.js`
   - `yes-script.js`
   - `style.css`
3. Scroll ke bawah → klik **"Commit changes"**

### Langkah 3 — Aktifkan GitHub Pages
1. Klik tab **Settings** di repo
2. Di sidebar kiri, klik **Pages**
3. Bagian **"Source"** → pilih **"Deploy from a branch"**
4. Branch: pilih **main**, folder: **/ (root)**
5. Klik **Save**

### Langkah 4 — Ambil Linknya
Tunggu 1-2 menit, lalu linknya muncul di halaman Settings > Pages:

```
https://USERNAME.github.io/birthday-miranda
```

Ganti `USERNAME` dengan username GitHub kamu. Share link ini ke Kak Miranda! 🎉

---

## ✨ Fitur

| Fitur | Keterangan |
|-------|-----------|
| 🎂 Kue interaktif | Klik 3x untuk tiup lilin |
| 🕯️ Animasi lilin | Efek nyala, asap, dan cincin |
| 🎵 Musik | Happy Birthday via Web Audio (tanpa file MP3) |
| 🎉 Konfeti | 180+ keping meledak otomatis |
| 📜 Pesan bertahap | Reveal saat scroll |
| ⭐ Bintang & ombak | Background animasi |
| ☠️ One Piece theme | Wanted poster, Jolly Roger, warna khas |
| 📱 Responsive | Tampil bagus di HP maupun desktop |

---

## 🛠️ Kustomisasi

- **Ganti nama**: Cari teks `Miranda` di semua file → ganti
- **Ganti pesan**: Edit bagian `scroll-body` di `yes.html`
- **Tambah doa**: Duplikat `<div class="doa-card">` di `yes.html`
- **Warna**: Edit variabel CSS di bagian `:root` di `style.css`

---

Made with 💛 for Kak Miranda — Happy Birthday! ⚓
