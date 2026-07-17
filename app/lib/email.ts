import 'server-only';

const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

interface SendEmailResult {
  success: boolean;
  error?: string;
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const msg = 'RESEND_API_KEY not set. Email skipped.';
    console.warn(`[EMAIL] ${msg}`);
    return { success: false, error: msg };
  }

  // Validate from email
  if (!fromEmail || !fromEmail.includes('@')) {
    const msg = `RESEND_FROM_EMAIL invalid: ${fromEmail}`;
    console.error(`[EMAIL] ${msg}`);
    return { success: false, error: msg };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('[EMAIL] Resend API error:', error);
      return { success: false, error: JSON.stringify(error) };
    }

    console.log(`[EMAIL] Sent to ${to}, id: ${data?.id}`);
    return { success: true };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('[EMAIL] Exception:', errMsg);
    return { success: false, error: errMsg };
  }
}

export async function sendNewApplicationEmail(params: {
  to: string;
  nama: string;
  type: string;
}): Promise<SendEmailResult> {
  const { to, nama, type } = params;
  return sendEmail({
    to,
    subject: `Pengajuan Surat ${type} Baru - Desa Wonokerto`,
    html: `
      <h2>Pengajuan Surat ${type} Baru</h2>
      <p>Halo Admin,</p>
      <p>Ada pengajuan surat ${type} baru dari warga dengan nama <strong>${nama}</strong>.</p>
      <p>Silakan login ke dashboard admin untuk memproses pengajuan tersebut.</p>
      <br/>
      <p>Terima kasih,</p>
      <p>SIDEWO - Sistem Informasi Desa Wonokerto</p>
    `,
  });
}

export async function sendStatusUpdateEmail(params: {
  to: string;
  nama: string;
  type: string;
  status: string;
}): Promise<SendEmailResult> {
  const { to, nama, type, status } = params;
  let message = '';
  if (status === 'DISETUJUI') {
    message = `Pengajuan surat ${type} Anda telah <strong>DISETUJUI</strong>. Silakan datang ke Balai Desa Wonokerto untuk mengambil surat Anda.`;
  } else if (status === 'DITOLAK') {
    message = `Mohon maaf, pengajuan surat ${type} Anda <strong>DITOLAK</strong>. Silakan hubungi admin desa untuk informasi lebih lanjut.`;
  } else if (status === 'SELESAI') {
    message = `Pengajuan surat ${type} Anda telah <strong>SELESAI</strong>. Surat sudah siap untuk diambil di Balai Desa Wonokerto.`;
  }

  return sendEmail({
    to,
    subject: `Update Status Pengajuan Surat ${type} - Desa Wonokerto`,
    html: `
      <h2>Update Status Pengajuan</h2>
      <p>Halo ${nama},</p>
      <p>${message}</p>
      <br/>
      <p>Terima kasih,</p>
      <p>SIDEWO - Sistem Informasi Desa Wonokerto</p>
    `,
  });
}
