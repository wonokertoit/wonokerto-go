import 'dotenv/config';
import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { applications, notifications, aduan, users, settings } from "./schema";
import { sql } from "drizzle-orm";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("ERROR: DATABASE_URL tidak ditemukan di .env.local");
  process.exit(1);
}

const db = drizzle(neon(dbUrl), { schema: { applications, notifications, aduan, users, settings } });

async function clearData() {
  console.log("=".repeat(50));
  console.log("SIDEWO - Production Data Cleanup");
  console.log("=".repeat(50));
  console.log("Target database:", dbUrl.replace(/:.*@/, ":****@"));
  console.log("");

  // Cek data sebelum hapus
  console.log("📊 Data sebelum cleanup:");
  const appsBefore = await db.select({ count: sql<count>`count(*)` }).from(applications);
  const notifBefore = await db.select({ count: sql<count>`count(*)` }).from(notifications);
  const aduanBefore = await db.select({ count: sql<count>`count(*)` }).from(aduan);
  const usersBefore = await db.select({ count: sql<count>`count(*)` }).from(users);
  const settingsBefore = await db.select({ count: sql<count>`count(*)` }).from(settings);

  console.log(`   Applications : ${appsBefore[0]?.count ?? 0}`);
  console.log(`   Notifications: ${notifBefore[0]?.count ?? 0}`);
  console.log(`   Aduan        : ${aduanBefore[0]?.count ?? 0}`);
  console.log(`   Users        : ${usersBefore[0]?.count ?? 0} (TIDAK DIHAPUS)`);
  console.log(`   Settings     : ${settingsBefore[0]?.count ?? 0} (TIDAK DIHAPUS)`);
  console.log("");

  if (
    (appsBefore[0]?.count ?? 0) === 0 &&
    (notifBefore[0]?.count ?? 0) === 0 &&
    (aduanBefore[0]?.count ?? 0) === 0
  ) {
    console.log("✅ Tidak ada data yang perlu dihapus. Database sudah bersih.");
    process.exit(0);
  }

  // Hapus data
  console.log("🗑️  Menghapus data...");

  let deletedApps = 0;
  let deletedNotif = 0;
  let deletedAduan = 0;

  if ((appsBefore[0]?.count ?? 0) > 0) {
    const result = await db.delete(applications);
    deletedApps = Number(appsBefore[0]?.count ?? 0);
    console.log(`   ✅ Applications dihapus: ${deletedApps} rows`);
  }

  if ((notifBefore[0]?.count ?? 0) > 0) {
    const result = await db.delete(notifications);
    deletedNotif = Number(notifBefore[0]?.count ?? 0);
    console.log(`   ✅ Notifications dihapus: ${deletedNotif} rows`);
  }

  if ((aduanBefore[0]?.count ?? 0) > 0) {
    const result = await db.delete(aduan);
    deletedAduan = Number(aduanBefore[0]?.count ?? 0);
    console.log(`   ✅ Aduan dihapus: ${deletedAduan} rows`);
  }

  console.log("");

  // Verifikasi data setelah hapus
  console.log("📊 Data setelah cleanup:");
  const appsAfter = await db.select({ count: sql<count>`count(*)` }).from(applications);
  const notifAfter = await db.select({ count: sql<count>`count(*)` }).from(notifications);
  const aduanAfter = await db.select({ count: sql<count>`count(*)` }).from(aduan);
  const usersAfter = await db.select({ count: sql<count>`count(*)` }).from(users);
  const settingsAfter = await db.select({ count: sql<count>`count(*)` }).from(settings);

  console.log(`   Applications : ${appsAfter[0]?.count ?? 0}`);
  console.log(`   Notifications: ${notifAfter[0]?.count ?? 0}`);
  console.log(`   Aduan        : ${aduanAfter[0]?.count ?? 0}`);
  console.log(`   Users        : ${usersAfter[0]?.count ?? 0} (✅ TETAP AMAN)`);
  console.log(`   Settings     : ${settingsAfter[0]?.count ?? 0} (✅ TETAP AMAN)`);
  console.log("");
  console.log("=".repeat(50));
  console.log("✅ Cleanup selesai!");
  console.log("=".repeat(50));

  process.exit(0);
}

clearData().catch((err) => {
  console.error("❌ ERROR saat cleanup:", err);
  process.exit(1);
});
