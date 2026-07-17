'use server';

import { db } from '@/app/lib/db';
import { applications, settings, users, notifications } from '@/app/lib/schema';
import { ApplicationFormSchema, SettingsFormSchema, FormState } from '@/app/lib/definitions';
import { verifySession } from '@/app/lib/session';
import { eq, desc, and } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { sendNewApplicationEmail, sendStatusUpdateEmail } from '@/app/lib/email';
import { revalidatePath } from 'next/cache';

export async function createApplication(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session) return { message: 'Sesi telah berakhir. Silakan login kembali.' };
  if (session.role !== 'warga') return { message: 'Hanya warga yang dapat mengajukan surat.' };

  const type = formData.get('type') as string;
  const rawData: Record<string, unknown> = { type };
  formData.forEach((value, key) => {
    if (key !== 'type') rawData[key] = value;
  });

  const validatedFields = ApplicationFormSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const data = validatedFields.data;
  const appData = {
    userId: session.userId,
    type: data.type,
    nama: data.nama,
    jenisKelamin: data.jenisKelamin,
    tempatLahir: data.tempatLahir,
    tanggalLahir: data.tanggalLahir,
    warganegaraan: data.warganegaraan,
    agama: data.agama,
    pekerjaan: data.pekerjaan,
    alamat: data.alamat,
    rt: data.rt,
    rw: data.rw,
    desa: data.desa,
    kecamatan: data.kecamatan,
    kabupaten: data.kabupaten,
    provinsi: data.provinsi,
    nik: data.nik,
    kk: data.kk,
    keperluan: data.keperluan,
    detailUsaha: data.detailUsaha || null,
    keteranganLain: data.keteranganLain || null,
  };

  const result = await db.insert(applications).values(appData).returning({ id: applications.id });
  if (!result[0]) return { message: 'Gagal menyimpan pengajuan.' };

  // Kirim email ke admin
  const adminUsers = await db.select().from(users).where(eq(users.role, 'admin'));
  for (const admin of adminUsers) {
    await sendNewApplicationEmail({
      to: admin.email,
      nama: data.nama,
      type: data.type,
    });
  }

  // Buat notifikasi untuk warga
  await db.insert(notifications).values({
    userId: session.userId,
    applicationId: result[0].id,
    title: `Pengajuan ${data.type} berhasil dibuat`,
    message: `Pengajuan surat ${data.type} atas nama ${data.nama} telah berhasil diajukan dan menunggu verifikasi admin.`,
  });

  revalidatePath('/riwayat');
  redirect('/riwayat');
}

export async function getApplicationsByUser() {
  const session = await verifySession();
  if (!session) return [];

  const data = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, session.userId))
    .orderBy(desc(applications.createdAt));

  return data;
}

export async function getAllApplications() {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return [];

  const data = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));

  return data;
}

export async function getApplicationById(id: string) {
  const session = await verifySession();
  if (!session) return null;

  const data = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  const app = data[0];
  if (!app) return null;

  // Warga hanya bisa melihat suratnya sendiri
  if (session.role === 'warga' && app.userId !== session.userId) return null;

  return app;
}

export async function approveApplication(id: string, nomorSurat: string) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const now = new Date();
  const twoMonthsLater = new Date(now);
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

  const app = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  const appData = app[0];

  await db
    .update(applications)
    .set({
      status: 'DISETUJUI',
      nomorSurat,
      tanggalDisetujui: now,
      tanggalBerlakuMulai: now,
      tanggalBerlakuSampai: twoMonthsLater,
      updatedAt: now,
    })
    .where(eq(applications.id, id));

  if (appData) {
    const user = await db.select().from(users).where(eq(users.id, appData.userId)).limit(1);
    if (user[0]) {
      await sendStatusUpdateEmail({
        to: user[0].email,
        nama: appData.nama,
        type: appData.type,
        status: 'DISETUJUI',
      });

      // Notifikasi untuk warga
      await db.insert(notifications).values({
        userId: appData.userId,
        applicationId: appData.id,
        title: `Pengajuan ${appData.type} disetujui`,
        message: `Pengajuan surat ${appData.type} Anda telah disetujui dengan nomor surat ${nomorSurat}. Silakan datang ke Balai Desa untuk mengambil surat.`,
      });
    }
  }

  revalidatePath('/admin/pengajuan');
  revalidatePath(`/admin/pengajuan/${id}`);
  return { success: true };
}

export async function rejectApplication(id: string, alasan: string) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const now = new Date();
  const app = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  const appData = app[0];

  await db
    .update(applications)
    .set({
      status: 'DITOLAK',
      alasanPenolakan: alasan,
      updatedAt: now,
    })
    .where(eq(applications.id, id));

  if (appData) {
    const user = await db.select().from(users).where(eq(users.id, appData.userId)).limit(1);
    if (user[0]) {
      await sendStatusUpdateEmail({
        to: user[0].email,
        nama: appData.nama,
        type: appData.type,
        status: 'DITOLAK',
      });

      // Notifikasi untuk warga
      await db.insert(notifications).values({
        userId: appData.userId,
        applicationId: appData.id,
        title: `Pengajuan ${appData.type} ditolak`,
        message: `Mohon maaf, pengajuan surat ${appData.type} Anda ditolak dengan alasan: ${alasan}. Silakan hubungi admin desa untuk informasi lebih lanjut.`,
      });
    }
  }

  revalidatePath('/admin/pengajuan');
  revalidatePath(`/admin/pengajuan/${id}`);
  return { success: true };
}

export async function completeApplication(id: string) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const now = new Date();
  const app = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  const appData = app[0];

  await db
    .update(applications)
    .set({
      status: 'SELESAI',
      tanggalSelesai: now,
      updatedAt: now,
    })
    .where(eq(applications.id, id));

  if (appData) {
    const user = await db.select().from(users).where(eq(users.id, appData.userId)).limit(1);
    if (user[0]) {
      await sendStatusUpdateEmail({
        to: user[0].email,
        nama: appData.nama,
        type: appData.type,
        status: 'SELESAI',
      });

      // Notifikasi untuk warga
      await db.insert(notifications).values({
        userId: appData.userId,
        applicationId: appData.id,
        title: `Pengajuan ${appData.type} selesai`,
        message: `Pengajuan surat ${appData.type} Anda telah selesai diproses. Surat sudah siap diambil di Balai Desa Wonokerto.`,
      });
    }
  }

  revalidatePath('/admin/pengajuan');
  revalidatePath(`/admin/pengajuan/${id}`);
  return { success: true };
}

export async function getNotifications() {
  const session = await verifySession();
  if (!session) return [];

  const data = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, session.userId))
    .orderBy(desc(notifications.createdAt))
    .limit(20);

  return data;
}

export async function markNotificationAsRead(id: string) {
  const session = await verifySession();
  if (!session) return { message: 'Unauthorized.' };

  await db
    .update(notifications)
    .set({ read: 'true' })
    .where(eq(notifications.id, id));

  return { success: true };
}

export async function markAllNotificationsAsRead() {
  const session = await verifySession();
  if (!session) return { message: 'Unauthorized.' };

  await db
    .update(notifications)
    .set({ read: 'true' })
    .where(eq(notifications.userId, session.userId));

  return { success: true };
}

export async function getSettings() {
  const data = await db.select().from(settings).where(eq(settings.id, 'default')).limit(1);
  return data[0] || null;
}

export async function updateSettings(formData: FormData) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const validatedFields = SettingsFormSchema.safeParse({
    namaKepalaDesa: formData.get('namaKepalaDesa'),
    kopSurat: formData.get('kopSurat'),
    jabatan: formData.get('jabatan'),
    kodeDesa: formData.get('kodeDesa'),
    namaDesa: formData.get('namaDesa'),
    alamat: formData.get('alamat'),
    telepon: formData.get('telepon'),
    fax: formData.get('fax'),
    email: formData.get('email'),
    website: formData.get('website'),
    kecamatan: formData.get('kecamatan'),
    kabupaten: formData.get('kabupaten'),
    provinsi: formData.get('provinsi'),
    kodePos: formData.get('kodePos'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const data = validatedFields.data;
  await db
    .update(settings)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(settings.id, 'default'));

  revalidatePath('/admin/settings');
  return { success: true };
}

export async function getStats() {
  const session = await verifySession();
  if (!session) return null;

  const allApps = await db.select().from(applications);

  if (session.role === 'admin') {
    return {
      total: allApps.length,
      diajukan: allApps.filter((a) => a.status === 'DIAJUKAN').length,
      disetujui: allApps.filter((a) => a.status === 'DISETUJUI').length,
      ditolak: allApps.filter((a) => a.status === 'DITOLAK').length,
      selesai: allApps.filter((a) => a.status === 'SELESAI').length,
    };
  } else {
    const userApps = allApps.filter((a) => a.userId === session.userId);
    return {
      total: userApps.length,
      diajukan: userApps.filter((a) => a.status === 'DIAJUKAN').length,
      disetujui: userApps.filter((a) => a.status === 'DISETUJUI').length,
      ditolak: userApps.filter((a) => a.status === 'DITOLAK').length,
      selesai: userApps.filter((a) => a.status === 'SELESAI').length,
    };
  }
}
