'use server';

import { db } from '@/app/lib/db';
import { users } from '@/app/lib/schema';
import {
  CreateUserSchema,
  UpdateUserSchema,
  ResetUserPasswordSchema,
  UpdateMyPasswordSchema,
  FormState,
} from '@/app/lib/definitions';
import { verifySession } from '@/app/lib/session';
import bcrypt from 'bcryptjs';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getAllUsers() {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return [];

  const data = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  return data;
}

export async function createUser(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const validatedFields = CreateUserSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password, role } = validatedFields.data;

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    return { message: 'Email sudah terdaftar.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({ email, password: hashedPassword, role });

  revalidatePath('/admin/akun');
  return { success: true };
}

export async function updateUser(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const validatedFields = UpdateUserSchema.safeParse({
    id: formData.get('id'),
    email: formData.get('email'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { id, email, role } = validatedFields.data;

  // Cek duplikat email (kecuali email milik user ini sendiri)
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0 && existing[0].id !== id) {
    return { message: 'Email sudah digunakan oleh akun lain.' };
  }

  await db
    .update(users)
    .set({ email, role })
    .where(eq(users.id, id));

  revalidatePath('/admin/akun');
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  // Jangan biarkan admin menghapus dirinya sendiri
  if (id === session.userId) {
    return { message: 'Anda tidak dapat menghapus akun Anda sendiri.' };
  }

  await db.delete(users).where(eq(users.id, id));

  revalidatePath('/admin/akun');
  return { success: true };
}

export async function resetUserPassword(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const validatedFields = ResetUserPasswordSchema.safeParse({
    id: formData.get('id'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { id, newPassword } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, id));

  revalidatePath('/admin/akun');
  return { success: true };
}

export async function updateMyPassword(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session) return { message: 'Sesi telah berakhir. Silakan login kembali.' };

  const validatedFields = UpdateMyPasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const userData = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  const user = userData[0];

  if (!user) {
    return { message: 'Akun tidak ditemukan.' };
  }

  const validPassword = await bcrypt.compare(currentPassword, user.password);
  if (!validPassword) {
    return { message: 'Password saat ini salah.' };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, session.userId));

  return { success: true, message: 'Password berhasil diubah.' };
}
