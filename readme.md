<p align="center">
  <img src="https://img.shields.io/badge/ToDoList-Express%20%7C%20TypeScript%20%7C%20MySQL-blue?logo=todoist&logoColor=white&style=for-the-badge" alt="ToDoList Shield"/>
</p>

# ToDoList App

![ToDoList](https://img.shields.io/badge/ToDoList-Express%20%7C%20TypeScript%20%7C%20MySQL-blue?logo=todoist&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue?logo=typescript&logoColor=white&style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-black?logo=express&logoColor=white&style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-blue?logo=mysql&logoColor=white&style=flat-square)

Aplikasi ToDoList berbasis **Express.js**, **TypeScript**, dan **MySQL** dengan arsitektur MVC sederhana.

> **Projek ini dibuat untuk latihan dan meningkatkan skill saya menggunakan TS dan ExpressJS di bantu oleh Github Copilot.**

## Fitur
- CRUD ToDo (Tambah, Lihat, Edit, Hapus)
- Status selesai/belum dengan checkbox
- UI responsif berbasis HTML, CSS, dan JavaScript (tanpa template engine)
- Logging request dengan morgan
- Koneksi database menggunakan mysql2
- Konfigurasi environment dengan dotenv

## Struktur Folder
```
├── controllers/
├── models/
├── router/
├── view/
│   ├── index.html
│   ├── css/
│   └── js/
├── index.ts
├── .env
├── package.json
├── tsconfig.json
```

## Instalasi Dependency

Jalankan perintah berikut untuk meng-install semua dependency yang dibutuhkan:

```sh
npm install express mysql2 dotenv morgan
npm install --save-dev typescript ts-node-dev @types/express @types/morgan
```

Setelah itu, jalankan:

```sh
npm install
```

Aplikasi siap dijalankan di mode development dengan:

```sh
npm run dev
```

## Lisensi
MIT