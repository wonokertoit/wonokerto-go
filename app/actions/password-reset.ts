'use server';

import { db } from '@/app/lib/db';
import { users, passwordResetTokens } from '@/app/lib/schema';
import { ForgotPasswordSchema, ResetPasswordSchema, FormState } from '@/app/lib/definitions';
import { verifySession } from '@/app/lib/session';
import bcrypt from 'bcryptjs';
import { eq, gt } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { sendEmail } from '@/app/lib/email';

function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < 32; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

export async function requestPasswordReset(state: FormState, formData: FormData) {
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email } = validatedFields.data;

  const userData = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = userData[0];

  if (!user) {
    // Jangan beritahu kalau email tidak terdaftar demi keamanan
    return { message: 'Jika email terdaftar, tautan reset password telah dikirim.' };
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

  // Hapus token lama untuk user ini
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, user.id));

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    token,
    expiresAt,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Reset Password - SIDEWO Desa Wonokerto',
    html: `
      <h2>Reset Password SIDEWO</h2>
      <p>Halo,</p>
      <p>Anda telah meminta untuk mereset password akun SIDEWO Anda.</p>
      <p>Silakan klik tautan berikut untuk mengatur password baru:</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#57534e;color:#fff;text-decoration:none;border-radius:8px;">Reset Password</a></p>
      <p>Atau salin tautan ini ke browser:</p>
      <p>${resetUrl}</p>
      <p><strong>Tautan ini berlaku selama 1 jam.</strong> Jika Anda tidak meminta reset password, abaikan email ini.</p>
      <br/>
      <p>Terima kasih,</p>
      <p>SIDEWO - Sistem Informasi Desa Wonokerto</p>
    `,
  });

  return { success: true, message: 'Jika email terdaftar, tautan reset password telah dikirim.' };
}

export async function resetPassword(state: FormState, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { token, password } = validatedFields.data;

  const now = new Date();
  const tokenData = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.token, token))
    .limit(1);

  const resetToken = tokenData[0];

  if (!resetToken || resetToken.expiresAt < now) {
    return { message: 'Tautan reset password tidak valid atau sudah kadaluarsa.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, resetToken.userId));

  // Hapus token setelah digunakan
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, resetToken.id));

  redirect('/login');
}
