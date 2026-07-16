import 'server-only';

const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set. Skipping email.');
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({ from: fromEmail, to, subject, html });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export async function sendNewApplicationEmail(params: {
  to: string;
  nama: string;
  type: string;
}) {
  const { to, nama, type } = params;
  await sendEmail({
    to,
    subject: `Pengajuan Surat ${type} Baru - Desa Wonokerto`,
    html: `
      <h2>Pengajuan Surat ${type} Baru</h2>
      <p>Halo Admin,</p>
      <p>Ada pengajuan surat ${type} baru dari warga dengan nama <strong>${nama}</strong>.</p>
      <p>Silakan login ke dashboard admin untuk memproses pengajuan tersebut.</p>
      <br/>
      <p>Terima kasih,</p>
      <p>Sistem Informasi Desa Wonokerto</p>
    `,
  });
}

export async function sendStatusUpdateEmail(params: {
  to: string;
  nama: string;
  type: string;
  status: string;
}) {
  const { to, nama, type, status } = params;
  let message = '';
  if (status === 'DISETUJUI') {
    message = `Pengajuan surat ${type} Anda telah <strong>DISETUJUI</strong>. Silakan datang ke Balai Desa Wonokerto untuk mengambil surat Anda.`;
  } else if (status === 'DITOLAK') {
    message = `Mohon maaf, pengajuan surat ${type} Anda <strong>DITOLAK</strong>. Silakan hubungi admin desa untuk informasi lebih lanjut.`;
  } else if (status === 'SELESAI') {
    message = `Pengajuan surat ${type} Anda telah <strong>SELESAI</strong>. Surat sudah siap untuk diambil di Balai Desa Wonokerto.`;
  }

  await sendEmail({
    to,
    subject: `Update Status Pengajuan Surat ${type} - Desa Wonokerto`,
    html: `
      <h2>Update Status Pengajuan</h2>
      <p>Halo ${nama},</p>
      <p>${message}</p>
      <br/>
      <p>Terima kasih,</p>
      <p>Sistem Informasi Desa Wonokerto</p>
    `,
  });
}
