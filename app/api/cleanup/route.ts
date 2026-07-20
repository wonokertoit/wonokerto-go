import { NextRequest, NextResponse } from "next/server";
import { cleanupOldData } from "@/app/lib/cleanup";
import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/app/lib/email";

export async function GET(request: NextRequest) {
  // Protect endpoint with CRON_SECRET header
  const cronSecret = request.headers.get("x-cron-secret");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (cronSecret !== expectedSecret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await cleanupOldData();

    // Kirim email ke semua admin
    const adminUsers = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.role, "admin"));

    const totalDeleted =
      result.deleted.applications +
      result.deleted.notifications +
      result.deleted.aduan;

    if (totalDeleted > 0 && adminUsers.length > 0) {
      const htmlBody = `
        <h2>Laporan Pembersihan Data Otomatis - SIDEWO</h2>
        <p>Halo Admin,</p>
        <p>Sistem telah melakukan pembersihan data otomatis pada <strong>${new Date().toLocaleString("id-ID")}</strong>.</p>

        <h3>Ringkasan Penghapusan</h3>
        <ul>
          <li><strong>Pengajuan Surat</strong>: ${result.deleted.applications} data dihapus</li>
          <li><strong>Notifikasi</strong>: ${result.deleted.notifications} data dihapus</li>
          <li><strong>Aduan</strong>: ${result.deleted.aduan} data dihapus</li>
        </ul>

        <p>Data yang dihapus adalah data berumur lebih dari 60 hari.</p>

        <p><em>Catatan: Backup CSV tersedia di dashboard admin untuk keperluan arsip.</em></p>

        <br/>
        <p>Terima kasih,</p>
        <p>SIDEWO - Sistem Informasi Desa Wonokerto</p>
      `;

      for (const admin of adminUsers) {
        await sendEmail({
          to: admin.email,
          subject: `Laporan Pembersihan Data - SIDEWO (${new Date().toLocaleDateString("id-ID")})`,
          html: htmlBody,
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        deleted: result.deleted,
        emailsSent: totalDeleted > 0 ? adminUsers.length : 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cleanup failed:", error);
    return NextResponse.json(
      { error: "Cleanup failed", details: String(error) },
      { status: 500 }
    );
  }
}
