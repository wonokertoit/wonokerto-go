'use server';

import { db } from '@/app/lib/db';
import { users } from '@/app/lib/schema';
import { LoginFormSchema, RegisterFormSchema, FormState } from '@/app/lib/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    return { message: 'Email sudah terdaftar.' };
  }

  const data = await db
    .insert(users)
    .values({ email, password: hashedPassword, role: 'warga' })
    .returning({ id: users.id });

  const user = data[0];
  if (!user) {
    return { message: 'Gagal membuat akun.' };
  }

  await createSession(user.id, 'warga', email);
  redirect('/dashboard');
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const data = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = data[0];

  if (!user) {
    return { message: 'Email atau password salah.' };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { message: 'Email atau password salah.' };
  }

  await createSession(user.id, user.role, user.email);
  if (user.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/dashboard');
  }
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
