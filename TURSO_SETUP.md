# Turso Database Setup Guide

วิธีการตั้งค่า Turso SQLite สำหรับ Vercel Deployment

## ขั้นตอนที่ 1: ติดตั้ง Turso CLI

```bash
npm install -g @libsql/turso-cli
```

## ขั้นตอนที่ 2: Login ไป Turso

```bash
turso auth login
```

## ขั้นตอนที่ 3: สร้าง Database

```bash
turso db create job-boards
```

## ขั้นตอนที่ 4: ดู Connection URL

```bash
turso db show job-boards --url
```

**Output:**
```
libsql://job-boards-[hash].turso.io
```

## ขั้นตอนที่ 5: สร้าง Auth Token

```bash
turso db tokens create job-boards
```

**Output:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ขั้นตอนที่ 6: อัปเดต .env.local (Local Development)

```bash
cp .env.example .env.local
```

แก้ไฟล์ `.env.local`:

```env
DATABASE_URL="libsql://job-boards-[hash].turso.io"
DATABASE_AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
ADMIN_PASSWORD="admin1234"
```

## ขั้นตอนที่ 7: Run Migrations

```bash
npx prisma migrate dev
```

## ขั้นตอนที่ 8: Seed Data (Optional)

```bash
npm run db:seed
```

## ขั้นตอนที่ 9: Test Local

```bash
npm run dev
```

เข้า http://localhost:3000 เพื่อ test

---

## Vercel Deployment

### ขั้นตอนที่ 1: Push ไป GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment with Turso"
git push origin main
```

### ขั้นตอนที่ 2: Import GitHub Repo ใน Vercel

1. ไป https://vercel.com/new
2. Select GitHub repository
3. Vercel จะ auto-detect Next.js

### ขั้นตอนที่ 3: เพิ่ม Environment Variables

ใน Vercel Dashboard:
- Settings → Environment Variables → Add

เพิ่มตัวแปรเหล่านี้:

```env
DATABASE_URL = libsql://job-boards-[hash].turso.io
DATABASE_AUTH_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD = admin1234
```

**สำคัญ:** คัดลอกจาก Turso CLI output โดยตรงครับ!

### ขั้นตอนที่ 4: Deploy

- Click "Deploy"
- Vercel จะ run: `npm install` → `npm run build` → Deploy

---

## Turso Dashboard

Monitor database usage:
- https://turso.tech/dashboard

**Free Plan Limits:**
- Storage: 5 GB
- Rows Read: 500M/เดือน
- Rows Written: 10M/เดือน
- Databases: 100

---

## Troubleshooting

### Error: "Unable to connect to database"

ตรวจสอบ:
1. DATABASE_URL ถูกต้อง
2. DATABASE_AUTH_TOKEN ถูกต้อง
3. Database ถูกสร้างแล้ว

### Error: "Migration failed"

```bash
npx prisma migrate reset
npx prisma migrate dev
```

### เช็กสถานะ Storage

```bash
turso db show job-boards
```

---

## เปลี่ยนจาก Neon ไป Turso

Prisma schema **ไม่ต้องเปลี่ยน!** ✅

SQLite (Turso) และ PostgreSQL (Neon) ใช้ syntax เดียวกัน

เพียงแต่เปลี่ยน `DATABASE_URL` และเพิ่ม `DATABASE_AUTH_TOKEN` เท่านั้น

## References

- Turso Docs: https://turso.tech/docs
- Prisma Turso: https://www.prisma.io/docs/orm/prisma-client/setup
