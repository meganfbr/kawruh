# Kawruh Mission 09 — Visual Edition

Paket ini memperbarui **lima** file MDX Mission 09 yang ada pada arsip `Kawruh_Mission09_Supervised_Learning.zip` sebelumnya. Materi, latihan, QuizCard, dan ID tidak diganti; masing-masing halaman memperoleh satu visual konsep dan penjelasan.

## Instalasi

1. Backup file MDX aktif dalam `G:\Kawruh\docs\machine-learning\`. Jika kamu pernah mengedit isi Mission 09 sesudah menyalin ZIP aslinya, **jangan overwrite langsung**: bandingkan isi terlebih dahulu.
2. Salin lima file `docs/machine-learning/*.mdx` dari paket ini ke `G:\Kawruh\docs\machine-learning\`.
3. Salin lima file PNG dari `static/img/machine-learning/` ke `G:\Kawruh\static\img\machine-learning\`.
4. `sidebars.ts` tidak perlu diganti.
5. Jalankan `npm run build`, kemudian `npm start` dan cek kelima halaman, gambar, Playground, dan QuizCard.

## Catatan

- Visual dibuat dari data/aturan sintetis untuk tujuan pedagogis; **bukan hasil training model** dalam cuplikan kode.
- Gambar PNG memakai path `/img/machine-learning/...`. Jika situs memakai `baseUrl` non-root saat deploy (contohnya GitHub Pages), gunakan URL gambar melalui `useBaseUrl` atau impor aset agar sesuai dengan konfigurasi deploy.
- Paket ini tidak menggantikan perubahan kustom pada file lokal yang tidak ada dalam ZIP Mission 09 asal.
