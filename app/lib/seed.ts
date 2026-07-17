import 'dotenv/config';
import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { settings, users } from "./schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { settings, users } });

async function seed() {
  console.log("Seeding...");

  await db
    .insert(settings)
    .values({
      id: "default",
      namaKepalaDesa: "SUYANTO",
      kopSurat: "KEPALA DESA WONOKERTO",
      jabatan: "KEPALA DESA WONOKERTO",
      kodeDesa: "12122013",
      namaDesa: "Wonokerto",
      alamat: "JALAN RAYA TIMANG WETAN WONOGIRI KODE POS 57651",
      telepon: "--",
      fax: "--",
      email: "wonokerto702@gmail.com",
      website: "https://wonokerto-wonogiri.desa.id",
      kecamatan: "Wonogiri",
      kabupaten: "Wonogiri",
      provinsi: "Jawa Tengah",
      kodePos: "57651",
    })
    .onConflictDoNothing({ target: settings.id });
  console.log("Settings seeded");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await db
    .insert(users)
    .values({
      email: "admin@wonokerto.desa.id",
      password: hashedPassword,
      role: "admin",
    })
    .onConflictDoNothing({ target: users.email });
  console.log("Admin user seeded (email: admin@wonokerto.desa.id, password: admin123)");

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
