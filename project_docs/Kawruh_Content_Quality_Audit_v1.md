# Kawruh — Python Content Quality Audit v1.0

Sumber: `docs.zip` yang dikirim pengguna dan kode `sidebars.ts` di percakapan. Ini audit statis konten, **bukan** uji browser atau build di komputer pengguna.

## Hasil penting

- 22 dokumen Python ada dan seluruh 22 ID di sidebar ditemukan.
- 63 pemakaian `PythonPlayground`, 21 `QuizCard`, 21 latihan dengan `expectedOutput`.
- 19 dokumen memakai tujuan pembelajaran generik dan ringkasan penutup generik.
- `operators.mdx` dan `strings.mdx` sudah lebih mendalam daripada sebagian besar halaman lain.
- `getting-started` masih `.md`, bukan `.mdx`; ini **valid** untuk Docusaurus dan bukan error, tetapi berbeda dari preferensi nama format proyek.
- `input-output.mdx` belum menyediakan latihan `Check Answer` dan `input()` belum didukung oleh Playground; dijelaskan dengan benar dalam materi.
- `file-handling.mdx` belum menyediakan Playground atau latihan `Check Answer`; materinya sudah menandai penggunaan Python lokal.
- `classes-objects.mdx` dan `python-for-data-science.mdx` belum memiliki latihan `Check Answer`.

## Tabel inventaris

| File | Kata (perkiraan) | Playground | Check Answer | Quiz | Prioritas editorial |
|---|---:|---:|---:|---:|---|
| `booleans.mdx` | 230 | 2 | 1 | 1 | Tinggi |
| `classes-objects.mdx` | 236 | 1 | 0 | 1 | Tinggi |
| `comprehensions.mdx` | 257 | 2 | 1 | 1 | Tinggi |
| `conditions.mdx` | 262 | 2 | 1 | 1 | Tinggi |
| `dictionaries.mdx` | 239 | 2 | 1 | 1 | Tinggi |
| `exceptions.mdx` | 245 | 2 | 1 | 1 | Tinggi |
| `file-handling.mdx` | 259 | 0 | 0 | 1 | Tinggi |
| `functions.mdx` | 248 | 2 | 1 | 1 | Tinggi |
| `input-output.mdx` | 219 | 1 | 0 | 1 | Tinggi |
| `lists.mdx` | 241 | 2 | 1 | 1 | Tinggi |
| `loops.mdx` | 252 | 2 | 1 | 1 | Tinggi |
| `modules.mdx` | 253 | 2 | 1 | 1 | Tinggi |
| `numbers.mdx` | 245 | 3 | 1 | 1 | Tinggi |
| `python-for-data-science.mdx` | 346 | 1 | 0 | 1 | Tinggi |
| `sets.mdx` | 241 | 2 | 1 | 1 | Tinggi |
| `tuples.mdx` | 241 | 2 | 1 | 1 | Tinggi |
| `data-types.mdx` | 343 | 2 | 1 | 1 | Sedang |
| `getting-started.md` | 377 | 0 | 0 | 0 | Sedang |
| `introduction.mdx` | 305 | 2 | 1 | 1 | Sedang |
| `variables.mdx` | 313 | 2 | 1 | 1 | Sedang |
| `operators.mdx` | 1747 | 13 | 3 | 1 | Review minor / uji manual |
| `strings.mdx` | 1698 | 16 | 3 | 1 | Review minor / uji manual |

## Temuan dan rekomendasi

### A. Akurasi dan operasional — prioritas P0/P1
1. Validasi interaksi semua Playground di browser; penghitungan komponen pada dokumen tidak membuktikan runtime berfungsi.
2. Periksa latihan `Check Answer`: saat ini berbasis satu output yang diharapkan, sehingga jawaban hardcoded dapat dianggap benar. Untuk latihan penting gunakan beberapa test case dan validasi sesuai tujuan pembelajaran.
3. `input-output.mdx`: beri latihan yang dapat dikerjakan tanpa `input()` pada worker saat ini, atau berikan instruksi jelas menjalankan di terminal.
4. `file-handling.mdx`: demonstrasikan file virtual dengan catatan isolasi Pyodide jika runtime mendukung, atau berikan prosedur uji lokal yang rinci.

### B. Desain pembelajaran — prioritas P1
1. Ganti 19 tujuan pembelajaran generik dengan target operasional yang spesifik: "mampu menulis...", "mampu menjelaskan...", dan seterusnya.
2. Ganti 19 ringkasan penutup generik dengan 3–5 poin konsep, contoh, dan tautan prasyarat/materi berikutnya.
3. Tambahkan penjelasan per baris, output yang diharapkan, contoh kesalahan, dan latihan bervariasi pada halaman ringkas.
4. Urutkan perbaikan mulai dari `loops.mdx`, `functions.mdx`, `lists.mdx`, `conditions.mdx`, lalu halaman lanjut lainnya.

### C. Konsistensi — prioritas P2
1. Samakan format judul, Level, Learning Objectives, contoh, Common Mistakes, Exercises, Quick Quiz, Summary.
2. Standarkan label visual ke Title Case; ID slug tetap menggunakan tanda hubung.
3. Evaluasi apakah materi `getting-started.md` perlu diganti ekstensi menjadi `.mdx` agar sesuai konvensi, tetapi perubahan itu **tidak diperlukan** untuk menjalankan Docusaurus. Jangan menyimpan dua file dengan ID sama.
4. Pertimbangkan mengarsipkan folder `tutorial-basics` dan `tutorial-extras` bawaan starter Docusaurus setelah memastikan tidak lagi dipakai.

## Batasan audit

- Belum mengecek `src/components/PythonPlayground`, `src/components/QuizCard`, konfigurasi Docusaurus, atau hasil build terbaru.
- Akurasi semua contoh Python belum diuji secara otomatis; pengecekan terperinci dapat dilakukan setelah komponen dan test environment tersedia.
- Prioritas editorial bersifat triase berbasis panjang, cakupan, dan fitur; **bukan skor mutu objektif atau pengukuran keberhasilan belajar**.

## Rencana perbaikan

1. **Batch 1 (fundamental)**: Variables, Data Types, Numbers, Booleans, Lists, Conditions, Loops, Functions.
2. **Batch 2 (collections dan I/O)**: Tuples, Sets, Dictionaries, Input And Output, File Handling, Exceptions.
3. **Batch 3 (lanjutan)**: Modules, Comprehensions, Classes And Objects, Python For Data Science.
4. **Final QA**: halaman awal dan 2 halaman mendalam (Operators/Strings), pengujian sistem quiz/playground, mobile, dan build.
