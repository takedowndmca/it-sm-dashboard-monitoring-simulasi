
# 🚀 IT SM Add-On: Dashboard Monitoring (Simulasi Jaringan)

Dashboard monitoring berbasis web untuk memantau status server dan performa jaringan internal. Dibuat menggunakan **Node.js, Express, Sequelize**, dan **EJS** sebagai templating engine.

---

## 📌 Fitur Utama

✅ CRUD Server (nama, IP, lokasi, jenis layanan, status)  
✅ Dashboard Monitoring:
- KPI Ringkas (Total Server, UP/DOWN/MAINT)
- Grafik Response Time 24 jam (Line Chart)
- Pie Chart Status Server
- Tabel Recent Incidents  
✅ Tabel Logs/Checks: status, response time, waktu cek  
✅ Seeder data demo  
✅ Generate Sample Logs per Server  

---

## 🗃️ Struktur Database

### 1. `Servers`
| Kolom        | Tipe                      |
|--------------|---------------------------|
| id           | integer (PK)              |
| name         | string                    |
| ip           | string                    |
| location     | string                    |
| service_type | string                    |
| status       | enum ['UP', 'DOWN', 'MAINT'] |

### 2. `Checks`
| Kolom            | Tipe             |
|------------------|------------------|
| id               | integer (PK)     |
| server_id        | FK ke Servers    |
| status           | enum             |
| response_time_ms | integer (nullable) |
| checked_at       | datetime         |

### 3. `Incidents`
| Kolom       | Tipe               |
|-------------|--------------------|
| id          | integer (PK)       |
| server_id   | FK ke Servers      |
| started_at  | datetime           |
| ended_at    | datetime (nullable) |
| notes       | text               |

---

## ⚙️ Langkah Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/takedowndmca/it-sm-dashboard-monitoring-simulasi
cd it-sm-dashboard-monitoring-simulasi
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database (MySQL)

* Buat database `db_it_dev`
* Konfigurasi `config/config.json` sesuai environment lokal (XAMPP)

### 4. Jalankan Migrasi & Seeder

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 5. Jalankan Aplikasi

```bash
npm start
```

Buka di browser: `http://localhost:3000/servers/dashboard`

---

## 📷 Tampilan

| Halaman              | Deskripsi                      |
| -------------------- | ------------------------------ |
| `/servers`           | Tabel daftar server            |
| `/servers/create`    | Form tambah server             |
| `/servers/dashboard` | Dashboard monitoring real-time |

> Tambahkan screenshot nanti di GitHub untuk memperkuat dokumentasi.

---

## 📁 Struktur Folder

```bash
├── controllers/
├── models/
├── routes/
├── views/
│   ├── dashboard/
│   └── servers/
├── migrations/
├── seeders/
├── public/
├── config/
├── app.js
├── package.json
```

---

## 🎯 Kriteria Penilaian (Yang Diselesaikan)

| Kriteria                 | Status |
| ------------------------ | ------ |
| Portal (CRUD, Dashboard) | ✅      |
| Seeder / Demo Data       | ✅      |
| UX & Struktur Kode       | ✅      |
| Dokumentasi (README)     | ✅      |
| Auth, QR, IPK, Testing   | ❌      |

---

## 🙏 Penutup

Proyek ini dikembangkan untuk memenuhi tugas **IT Service Management Add-On** sebagai simulasi sistem monitoring server dan jaringan.

Dikembangkan oleh: **\[Muhammad Farid Jazir Fadhlurrahman - Universitas Islam Makassar]**

---
