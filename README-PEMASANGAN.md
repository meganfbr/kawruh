# Kawruh — Mission 14: Computer Vision & CNN

## Pemasangan

1. Backup `G:\Kawruh\sidebars.ts` dan perubahan lokal sebelum replace.
2. Copy 6 file `docs/deep-learning/*.mdx` ke `G:\Kawruh\docs\deep-learning\`.
3. Copy 6 PNG `static/img/deep-learning/*.png` ke `G:\Kawruh\static\img\deep-learning\`.
4. Copy `sidebars.ts` ke root Kawruh **hanya jika sidebar sejak Mission 13 belum diubah**. ID lama dipertahankan.
5. Jalankan `npm run build`, lalu `npm start`. Cek `/docs/deep-learning/cnn-introduction`.

## Konten

- CNN Introduction (`cnn-introduction.mdx`)
- Convolution And Pooling (`convolution-pooling.mdx`)
- Image Preprocessing (`image-preprocessing.mdx`)
- Image Augmentation (`image-augmentation.mdx`)
- Transfer Learning (`transfer-learning.mdx`)
- Image Classification Mini Project (`image-classification-mini-project.mdx`)

## Catatan

- Contoh TensorFlow dan scikit-learn ditujukan untuk Google Colab/Jupyter, bukan PythonPlayground browser.
- PythonPlayground untuk kalkulasi Python standar, QuizCard untuk evaluasi pilihan ganda.
- PNG adalah ilustrasi sintetis; bukan hasil training Fashion MNIST.
- Gambar contoh augmented tidak boleh diasumsikan aman untuk setiap dataset.
- Dokumen menggunakan props JavaScript yang dikodekan dalam string satu baris sehingga menghindari error Acorn karena literal multiline.
- Jalankan build dan cek interaksi langsung pada project lokal.
