import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("warga"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 10 }).notNull(), // SKU or SKCK

  // Data diri
  nama: varchar("nama", { length: 255 }).notNull(),
  jenisKelamin: varchar("jenis_kelamin", { length: 20 }).notNull(),
  tempatLahir: varchar("tempat_lahir", { length: 100 }).notNull(),
  tanggalLahir: date("tanggal_lahir").notNull(),
  warganegaraan: varchar("warganegaraan", { length: 50 })
    .notNull()
    .default("Indonesia"),
  agama: varchar("agama", { length: 50 }).notNull(),
  pekerjaan: varchar("pekerjaan", { length: 100 }).notNull(),
  alamat: varchar("alamat", { length: 255 }).notNull(),
  rt: varchar("rt", { length: 10 }).notNull(),
  rw: varchar("rw", { length: 10 }).notNull(),
  desa: varchar("desa", { length: 100 }).notNull(),
  kecamatan: varchar("kecamatan", { length: 100 }).notNull(),
  kabupaten: varchar("kabupaten", { length: 100 }).notNull(),
  provinsi: varchar("provinsi", { length: 100 }).notNull(),
  nik: varchar("nik", { length: 30 }).notNull(),
  kk: varchar("kk", { length: 30 }).notNull(),

  // Keperluan & keterangan
  keperluan: text("keperluan").notNull(),
  detailUsaha: text("detail_usaha"), // hanya untuk SKU
  keteranganLain: text("keterangan_lain"),

  // Status & admin fields
  status: varchar("status", { length: 20 }).notNull().default("DIAJUKAN"),
  nomorSurat: varchar("nomor_surat", { length: 100 }),
  alasanPenolakan: text("alasan_penolakan"),

  // Tanggal
  tanggalPengajuan: timestamp("tanggal_pengajuan").defaultNow().notNull(),
  tanggalDisetujui: timestamp("tanggal_disetujui"),
  tanggalBerlakuMulai: timestamp("tanggal_berlaku_mulai"),
  tanggalBerlakuSampai: timestamp("tanggal_berlaku_sampai"),
  tanggalSelesai: timestamp("tanggal_selesai"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  applicationId: uuid("application_id")
    .references(() => applications.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: varchar("read", { length: 10 }).notNull().default("false"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aduan = pgTable("aduan", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  nama: varchar("nama", { length: 255 }),
  kategori: varchar("kategori", { length: 50 }).notNull(),
  subjek: varchar("subjek", { length: 255 }).notNull(),
  pesan: text("pesan").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  id: varchar("id", { length: 50 }).primaryKey().default("default"),
  namaKepalaDesa: varchar("nama_kepala_desa", { length: 255 }).notNull().default("SUYANTO"),
  kopSurat: varchar("kop_surat", { length: 255 }).notNull().default("KEPALA DESA WONOKERTO"),
  jabatan: varchar("jabatan", { length: 255 }).notNull().default("KEPALA DESA WONOKERTO"),
  kodeDesa: varchar("kode_desa", { length: 50 }).notNull().default("12122013"),
  namaDesa: varchar("nama_desa", { length: 100 }).notNull().default("Wonokerto"),
  alamat: varchar("alamat", { length: 255 }).notNull().default("JALAN RAYA TIMANG WETAN WONOGIRI KODE POS 57651"),
  telepon: varchar("telepon", { length: 50 }).notNull().default("--"),
  fax: varchar("fax", { length: 50 }).notNull().default("--"),
  email: varchar("email", { length: 255 }).notNull().default("wonokerto702@gmail.com"),
  website: varchar("website", { length: 255 }).notNull().default("https://wonokerto-wonogiri.desa.id"),
  kecamatan: varchar("kecamatan", { length: 100 }).notNull().default("Wonogiri"),
  kabupaten: varchar("kabupaten", { length: 100 }).notNull().default("Wonogiri"),
  provinsi: varchar("provinsi", { length: 100 }).notNull().default("Jawa Tengah"),
  kodePos: varchar("kode_pos", { length: 20 }).notNull().default("57651"),
  logoUrl: varchar("logo_url", { length: 500 }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
