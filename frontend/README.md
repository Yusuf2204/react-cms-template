# React CMS Frontend

Frontend React CMS adalah single-page application untuk mengelola pengguna,
roles, menu dan permission, pengaturan perusahaan, serta dashboard operasional.
Antarmuka dibangun dengan React, Vite, Redux, dan CoreUI.

## Persyaratan

- Node.js 20 atau lebih baru
- npm
- Backend React CMS yang aktif

## Instalasi

```bash
npm ci
```

Jika `package-lock.json` belum tersedia, gunakan:

```bash
npm install
```

## Konfigurasi API

Alamat backend saat ini dikonfigurasi di:

```text
src/services/api.js
```

Untuk development lokal, pastikan base URL mengarah ke:

```text
http://localhost:8000/api
```

Sesuaikan alamat tersebut sebelum membuat build untuk staging atau production.
CORS backend juga harus mengizinkan origin frontend yang digunakan.

## Menjalankan Development Server

```bash
npm start
```

Aplikasi tersedia di `http://localhost:3000`.

## Perintah Tersedia

| Perintah | Fungsi |
| --- | --- |
| `npm start` | Menjalankan Vite development server |
| `npm run build` | Membuat production build |
| `npm run lint` | Menjalankan ESLint |
| `npm run preview` | Meninjau hasil production build |

## Struktur Utama

```text
src/
├── assets/       Aset dan styling aplikasi
├── components/   Komponen yang digunakan lintas halaman
├── layout/       App header, sidebar, footer, dan content layout
├── services/     API client, interceptor, dan service domain
├── store/        Redux store dan state global
├── views/
│   ├── dashboard/
│   ├── pages/
│   └── setup/
├── App.js
├── index.js
└── routes.js
```

## Autentikasi dan Bootstrap

Setelah login, token disimpan oleh frontend dan digunakan sebagai bearer token.
Data sesi dipulihkan melalui endpoint `/me`, yang menjadi sumber data user,
company, serta navigasi sesuai role.

API interceptor menangani respons umum:

- `401`: sesi dibersihkan dan user diarahkan ke login.
- `403`: user diarahkan ke halaman forbidden.
- `404`: halaman atau resource tidak ditemukan.
- `422`: error validasi ditampilkan pada field terkait.
- `500`: error ditampilkan melalui toast.

## Navigasi Dinamis

Sidebar dibentuk dari menu yang diberikan backend berdasarkan permission role.
Ikon menu dipetakan melalui allowlist di:

```text
src/services/sidebarService.js
```

Jika menambahkan nama ikon baru dari backend, pastikan ikon tersebut juga
tersedia pada allowlist frontend.

## UI dan Form

Frontend menyediakan:

- Toast notification global
- Loading state dan disabled submit
- Inline validation dari respons backend
- Protected routes
- Halaman forbidden dan not found
- Company branding untuk title, logo, dan favicon
- Upload gambar company dalam format Base64

## Build Production

```bash
npm ci
npm run lint
npm run build
```

Hasil build berada di folder:

```text
dist/
```

Deploy isi folder tersebut menggunakan web server yang mendukung SPA fallback
ke `index.html`. Pastikan konfigurasi API dan CORS sudah menggunakan domain
production sebelum build dibuat.

## Verifikasi Sebelum Release

```bash
npm run lint
npm run build
```

Setelah deploy, periksa login, pemulihan sesi, menu berdasarkan role, CRUD setup,
company branding, halaman error, dan logout.

Dokumentasi instalasi proyek lengkap tersedia di [README root](../README.md).
