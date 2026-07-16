<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Sistem Informasi Desa Wonokerto

## Tech Stack
- **Runtime & Package Manager**: Bun.js (v1.3.14+)
- **Framework**: Next.js 16.2.10 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **Auth**: Custom JWT session (jose) with httpOnly cookies
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF**: @react-pdf/renderer
- **Email**: Resend (async import to avoid build errors without API key)
- **Validation**: Zod

## Project Structure
```
app/
  actions/          # Server Actions (auth, applications, email)
  components/       # Reusable components (Sidebar, TopBar, StatCard, PdfDocument, ApplicationForm)
  lib/              # Utils (db, schema, session, definitions, email)
  (pages)/          # Route pages
  admin/            # Admin routes
  dashboard/        # Warga dashboard
  login/            # Login page
  register/         # Register page
  pengajuan/        # SKU & SKCK forms
  riwayat/          # History & detail
proxy.ts            # Next.js 16 proxy (replaces middleware)
drizzle.config.ts   # Drizzle ORM config
```

## Important Notes
- **Proxy convention**: Use `proxy.ts` instead of `middleware.ts` for route protection
- **Session**: JWT encrypted with `jose`, stored in `session` cookie (httpOnly, 7 days)
- **Database**: Use `date` column type for dates in schema (not `timestamp` for date-only fields)
- **Email**: Resend is lazily loaded — won't crash build if `RESEND_API_KEY` is missing
- **PDF**: Uses `@react-pdf/renderer` client component with PDFViewer + PDFDownloadLink
- **Bun commands**:
  - `bun install` — install deps
  - `bun run dev` — dev server
  - `bun run build` — production build
  - `bun run db:push` — push schema to Neon
  - `bun run db:seed` — seed default settings + admin user

## Environment Variables
Required in `.env.local`:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `SESSION_SECRET` — 32+ char random string for JWT signing
- `RESEND_API_KEY` — (optional) Resend API key for email notifications
- `RESEND_FROM_EMAIL` — (optional) Sender email address

## Default Admin Credentials
- Email: `admin@wonokerto.desa.id`
- Password: `admin123`
- Set via seed script: `bun run db:seed`

## Database Schema
### Tables
1. `users` — id, email, password, role (warga/admin)
2. `applications` — Full application data + status tracking
3. `settings` — Village config (head of village, letterhead, contact info)

### Status Flow
DIAJUKAN → DISETUJUI / DITOLAK → SELESAI

## Styling Conventions
- Use Tailwind v4 utility classes
- Cards: `bg-white rounded-2xl shadow-sm border border-gray-100`
- Buttons: `rounded-xl` with emerald/slate colors
- Inputs: `bg-gray-50 rounded-xl border-gray-200 focus:ring-emerald-500/20`
- Layout: Sidebar + TopBar for authenticated pages
- Animations: Framer Motion with staggered children, hover scale effects
