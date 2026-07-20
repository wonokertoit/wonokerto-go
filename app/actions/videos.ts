'use server';

import { db } from '@/app/lib/db';
import { videos } from '@/app/lib/schema';
import { VideoSchema, FormState } from '@/app/lib/definitions';
import { verifySession } from '@/app/lib/session';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getVideos() {
  const data = await db
    .select()
    .from(videos)
    .orderBy(desc(videos.sortOrder), desc(videos.createdAt));
  return data;
}

export async function getVideoById(id: string) {
  const data = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
  return data[0] || null;
}

export async function createVideo(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const validatedFields = VideoSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    youtubeId: formData.get('youtubeId'),
    sortOrder: formData.get('sortOrder') || '0',
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { title, description, youtubeId, sortOrder } = validatedFields.data;

  await db.insert(videos).values({ title, description: description || null, youtubeId, sortOrder });

  revalidatePath('/admin/video');
  revalidatePath('/');
  return { success: true };
}

export async function updateVideo(state: FormState, formData: FormData) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  const id = formData.get('id') as string;
  if (!id) return { message: 'ID video wajib diisi.' };

  const validatedFields = VideoSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    youtubeId: formData.get('youtubeId'),
    sortOrder: formData.get('sortOrder') || '0',
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { title, description, youtubeId, sortOrder } = validatedFields.data;

  await db
    .update(videos)
    .set({ title, description: description || null, youtubeId, sortOrder })
    .where(eq(videos.id, id));

  revalidatePath('/admin/video');
  revalidatePath('/');
  return { success: true };
}

export async function deleteVideo(id: string) {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return { message: 'Unauthorized.' };

  await db.delete(videos).where(eq(videos.id, id));

  revalidatePath('/admin/video');
  revalidatePath('/');
  return { success: true };
}
