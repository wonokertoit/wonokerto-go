import { db } from "@/app/lib/db";
import { applications, notifications, aduan } from "@/app/lib/schema";
import { sql, lte } from "drizzle-orm";

/**
 * Convert rows to CSV string
 */
function rowsToCsv(headers: string[], rows: Record<string, string | number | Date | null>[]): string {
  const escapeCsv = (value: unknown): string => {
    const str = value === null || value === undefined ? "" : String(value);
    if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = rows.map((row) => headers.map((h) => escapeCsv(row[h])).join(","));
  return [headers.join(","), ...lines].join("\n");
}

/**
 * Auto-delete applications, notifications, and aduan older than 60 days.
 * Returns deleted data as CSV strings.
 */
export async function cleanupOldData() {
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  // 1. Fetch old applications
  const oldApplications = await db
    .select()
    .from(applications)
    .where(lte(applications.createdAt, sixtyDaysAgo));

  // 2. Fetch old notifications
  const oldNotifications = await db
    .select()
    .from(notifications)
    .where(lte(notifications.createdAt, sixtyDaysAgo));

  // 3. Fetch old aduan
  const oldAduan = await db
    .select()
    .from(aduan)
    .where(lte(aduan.createdAt, sixtyDaysAgo));

  // 4. Generate CSV
  const applicationsCsv =
    oldApplications.length > 0
      ? rowsToCsv(
          ["id", "type", "nama", "nik", "kk", "keperluan", "status", "tanggalPengajuan", "createdAt"],
          oldApplications.map((a) => ({
            id: a.id,
            type: a.type,
            nama: a.nama,
            nik: a.nik,
            kk: a.kk,
            keperluan: a.keperluan,
            status: a.status,
            tanggalPengajuan: a.tanggalPengajuan.toISOString(),
            createdAt: a.createdAt.toISOString(),
          }))
        )
      : "";

  const notificationsCsv =
    oldNotifications.length > 0
      ? rowsToCsv(
          ["id", "userId", "applicationId", "title", "message", "read", "createdAt"],
          oldNotifications.map((n) => ({
            id: n.id,
            userId: n.userId,
            applicationId: n.applicationId || "",
            title: n.title,
            message: n.message,
            read: n.read,
            createdAt: n.createdAt.toISOString(),
          }))
        )
      : "";

  const aduanCsv =
    oldAduan.length > 0
      ? rowsToCsv(
          ["id", "userId", "nama", "kategori", "subjek", "pesan", "createdAt"],
          oldAduan.map((a) => ({
            id: a.id,
            userId: a.userId || "",
            nama: a.nama || "",
            kategori: a.kategori,
            subjek: a.subjek,
            pesan: a.pesan,
            createdAt: a.createdAt.toISOString(),
          }))
        )
      : "";

  // 5. Delete data
  let deletedApplications = 0;
  let deletedNotifications = 0;
  let deletedAduan = 0;

  if (oldApplications.length > 0) {
    const result = await db
      .delete(applications)
      .where(lte(applications.createdAt, sixtyDaysAgo));
    deletedApplications = oldApplications.length;
  }

  if (oldNotifications.length > 0) {
    const result = await db
      .delete(notifications)
      .where(lte(notifications.createdAt, sixtyDaysAgo));
    deletedNotifications = oldNotifications.length;
  }

  if (oldAduan.length > 0) {
    const result = await db
      .delete(aduan)
      .where(lte(aduan.createdAt, sixtyDaysAgo));
    deletedAduan = oldAduan.length;
  }

  return {
    deleted: {
      applications: deletedApplications,
      notifications: deletedNotifications,
      aduan: deletedAduan,
    },
    csv: {
      applications: applicationsCsv,
      notifications: notificationsCsv,
      aduan: aduanCsv,
    },
  };
}
