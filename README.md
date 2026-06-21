# React CMS v1

React CMS adalah aplikasi content management system berbasis Laravel dan React.
Proyek ini menyediakan autentikasi API, pengelolaan pengguna, role dan permission,
menu dinamis, pengaturan perusahaan, dashboard ringkas, serta dokumentasi OpenAPI.

## Fitur Utama

- Autentikasi token menggunakan Laravel Sanctum
- Users dan roles CRUD
- Menu bertingkat dan role-based navigation
- Pengaturan identitas perusahaan, logo, dan favicon
- Dashboard summary
- Respons API yang konsisten
- Dokumentasi Swagger/OpenAPI
- Penanganan error dan validasi terpusat di frontend

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Backend | Laravel 12, PHP 8.2+, Laravel Sanctum |
| Frontend | React 19, Vite 7, Redux, CoreUI |
| API Docs | L5 Swagger / OpenAPI |
| Database | MySQL, MariaDB, atau SQLite |

## Struktur Proyek

```text
react-cms/
├── backend/    Laravel REST API dan Swagger
├── frontend/   React CMS application
└── README.md
```

## Persyaratan

- PHP 8.2 atau lebih baru
- Composer 2
- Node.js 20 atau lebih baru
- npm
- Database yang didukung Laravel

## Instalasi

### 1. Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Atur koneksi database dan akun administrator di `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react_cms
DB_USERNAME=root
DB_PASSWORD=

ADMIN_NAME=Administrator
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
```

Password admin minimal 12 karakter. Setelah konfigurasi selesai:

```bash
php artisan migrate --seed
php artisan l5-swagger:generate
php artisan serve
```

Backend tersedia di `http://127.0.0.1:8000`.

### 2. Frontend

Buka terminal lain:

```bash
cd frontend
npm ci
npm start
```

Frontend tersedia di `http://localhost:3000`.

Konfigurasi alamat API frontend saat ini berada di
`frontend/src/services/api.js`. Pastikan nilainya mengarah ke backend yang aktif.

## URL Pengembangan

| Layanan | URL |
| --- | --- |
| Frontend | `http://localhost:3000` |
| Backend | `http://127.0.0.1:8000` |
| Swagger UI | `http://127.0.0.1:8000` |
| Swagger UI alternatif | `http://127.0.0.1:8000/api/documentation` |
| API base URL | `http://127.0.0.1:8000/api` |

Di Swagger, jalankan endpoint login, salin token yang diterima, lalu gunakan
tombol **Authorize** dengan bearer token tersebut untuk menguji endpoint
terproteksi.

## Verifikasi

Backend:

```bash
cd backend
php artisan test
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Dokumentasi

- [Panduan backend](backend/README.md)
- [Panduan frontend](frontend/README.md)
- [Panduan deployment production](backend/docs/production-deployment.md)

## Production

Jangan gunakan nilai `.env` development di server production. Gunakan
`backend/.env.production.example` sebagai acuan, nonaktifkan debug, batasi CORS,
gunakan HTTPS, dan simpan secret di luar version control.

Build frontend production dibuat dengan:

```bash
cd frontend
npm ci
npm run build
```

Hasil build berada di `frontend/dist`.

