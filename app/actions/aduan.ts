'use server';

import { db } from '@/app/lib/db';
import { aduan, users } from '@/app/lib/schema';
import { AduanFormSchema } from '@/app/lib/definitions';
import { verifySession } from '@/app/lib/session';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createAduan(state: { message?: string; success?: boolean } | undefined, formData: FormData) {
  const session = await verifySession();

  const rawData: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    rawData[key] = value;
  });

  const validatedFields = AduanFormSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { message: Object.values(validatedFields.error.flatten().fieldErrors).flat().join(', ') };
  }

  const data = validatedFields.data;

  await db.insert(aduan).values({
    userId: session?.userId ?? null,
    nama: data.nama || (session ? null : 'Anonim'),
    kategori: data.kategori,
    subjek: data.subjek,
    pesan: data.pesan,
  });

  revalidatePath('/riwayat-aduan');
  revalidatePath('/admin/aduan');
  return { success: true };
}

export async function getAduanByUser() {
  const session = await verifySession();
  if (!session) return [];

  return db
    .select()
    .from(aduan)
    .where(eq(aduan.userId, session.userId))
    .orderBy(desc(aduan.createdAt));
}

export async function getAllAduan() {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return [];

  return db
    .select()
    .from(aduan)
    .orderBy(desc(aduan.createdAt));
}

export async function getAduanById(id: string) {
  const session = await verifySession();
  if (!session) return null;

  const data = await db.select().from(aduan).where(eq(aduan.id, id)).limit(1);
  const item = data[0];
  if (!item) return null;

  if (session.role === 'warga' && item.userId !== session.userId) return null;

  return item;
}

export async function deleteAduan(id: string) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  await db.delete(aduan).where(eq(aduan.id, id));
  revalidatePath('/admin/aduan');
  return { success: true };
}

export async function getAduanStats() {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return null;

  const allAduan = await db.select().from(aduan);
  return {
    total: allAduan.length,
    kritik: allAduan.filter((a) => a.kategori === 'Kritik').length,
    saran: allAduan.filter((a) => a.kategori === 'Saran').length,
    pengaduan: allAduan.filter((a) => a.kategori === 'Pengaduan').length,
    lainnya: allAduan.filter((a) => a.kategori === 'Lainnya').length,
  };
}
