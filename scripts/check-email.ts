import 'dotenv/config';
import { config } from "dotenv";
config({ path: ".env.local" });

/**
 * Quick diagnostic script to verify Resend email configuration
 * Run: bun run tsx scripts/check-email.ts
 */

async function checkEmailConfig() {
  console.log("=".repeat(50));
  console.log("SIDEWO - Email Configuration Check");
  console.log("=".repeat(50));
  console.log("");

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  console.log("📧 RESEND_API_KEY:", apiKey ? `✅ Set (${apiKey.slice(0, 6)}...${apiKey.slice(-4)})` : "❌ NOT SET");
  console.log("📧 RESEND_FROM_EMAIL:", fromEmail ? `✅ ${fromEmail}` : "⚠️  Using default (onboarding@resend.dev)");
  console.log("");

  if (!apiKey) {
    console.log("❌ RESEND_API_KEY tidak ditemukan. Email tidak akan terkirim.");
    console.log("   Tambahkan di Vercel Dashboard → Project Settings → Environment Variables");
    process.exit(1);
  }

  // Test send email
  console.log("🚀 Mengirim email test...");
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail || 'onboarding@resend.dev',
      to: 'admin@wonokerto.desa.id', // Ganti dengan email Anda untuk test
      subject: 'SIDEWO - Test Email Configuration',
      html: `<p>Jika email ini sampai, konfigurasi Resend berhasil! 🎉</p>
               <p>Waktu: ${new Date().toLocaleString('id-ID')}</p>`,
    });

    if (error) {
      console.error("❌ Gagal mengirim email:", error);
      process.exit(1);
    }

    console.log("✅ Email test berhasil dikirim!");
    console.log("   Email ID:", data?.id);
    console.log("");
    console.log("📮 Cek inbox email admin untuk verifikasi.");
  } catch (err) {
    console.error("❌ Error saat kirim email:", err);
    process.exit(1);
  }
}

checkEmailConfig();
