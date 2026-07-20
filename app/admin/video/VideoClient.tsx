'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Plus,
  Pencil,
  Trash2,
  X,
  MonitorPlay,
  GripVertical,
  Video,
} from 'lucide-react';
import {
  createVideo,
  updateVideo,
  deleteVideo,
} from '@/app/actions/videos';
import { useActionState } from 'react';
import Link from 'next/link';

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
  sortOrder: string;
  createdAt: Date | null;
}

interface VideoClientProps {
  videos: VideoItem[];
}

export default function VideoClient({ videos }: VideoClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openModal = (type: 'create' | 'edit', video?: VideoItem) => {
    setModalType(type);
    setSelectedVideo(video || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedVideo(null);
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      await deleteVideo(id);
      setDeleteConfirm(null);
      window.location.reload();
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917] flex items-center gap-2">
            <Video size={24} className="text-[#57534e]" />
            Video Tutorial
          </h1>
          <p className="text-sm text-[#78716c] mt-1">Kelola video tutorial yang ditampilkan di landing page.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal('create')}
          className="inline-flex items-center gap-2 bg-[#57534e] text-white px-4 py-2.5 rounded-xl font-medium hover:bg-[#44403c] transition-all text-sm"
        >
          <Plus size={16} />
          Tambah Video
        </motion.button>
      </div>

      {videos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm p-12 text-center">
          <MonitorPlay size={48} className="mx-auto text-[#a8a29e] mb-4" />
          <h3 className="text-lg font-semibold text-[#1c1917] mb-2">Belum Ada Video</h3>
          <p className="text-sm text-[#78716c] mb-6">
            Tambahkan video tutorial untuk ditampilkan di landing page.<br />
            Video dengan urutan tertinggi akan ditampilkan sebagai video utama.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal('create')}
            className="inline-flex items-center gap-2 bg-[#57534e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#44403c] transition-all text-sm"
          >
            <Plus size={16} />
            Tambah Video Pertama
          </motion.button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured Video Preview */}
          <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-[#e7e5e4] flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-[#1c1917] flex items-center gap-2">
                  <Play size={18} className="text-[#dc2626]" />
                  Video yang Ditampilkan di Landing Page
                </h2>
                <p className="text-xs text-[#a8a29e] mt-0.5">Video dengan urutan tertinggi akan muncul di landing page.</p>
              </div>
              <Link
                href="/#tutorial"
                target="_blank"
                className="text-sm text-[#57534e] hover:underline"
              >
                Lihat di Landing →
              </Link>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative aspect-video bg-[#1c1917] rounded-xl overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videos[0].youtubeId}`}
                    title={videos[0].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-[#1c1917] mb-2">{videos[0].title}</h3>
                  {videos[0].description && (
                    <p className="text-sm text-[#78716c] leading-relaxed mb-4">{videos[0].description}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-[#a8a29e]">
                    <MonitorPlay size={14} className="text-[#dc2626]" />
                    <span>YouTube ID: {videos[0].youtubeId}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openModal('edit', videos[0])}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e7e5e4] text-[#57534e] font-medium hover:bg-[#fafaf9] transition-all text-sm"
                    >
                      <Pencil size={14} />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDelete(videos[0].id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        deleteConfirm === videos[0].id
                          ? 'text-white bg-[#dc2626]'
                          : 'text-[#dc2626] border border-[#e7e5e4] hover:bg-[#fef2f2]'
                      }`}
                    >
                      <Trash2 size={14} />
                      {deleteConfirm === videos[0].id ? 'Klik lagi' : 'Hapus'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Videos Table */}
          <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e7e5e4]">
              <h3 className="font-semibold text-[#1c1917]">Semua Video</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#fafaf9] border-b border-[#e7e5e4]">
                  <tr>
                    <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3 w-12"></th>
                    <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Judul</th>
                    <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">YouTube ID</th>
                    <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Urutan</th>
                    <th className="text-right text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f4]">
                  {videos.map((video, index) => (
                    <tr key={video.id} className="hover:bg-[#fafaf9]/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <GripVertical size={16} className="text-[#a8a29e]" />
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                              <Play size={10} />
                              Ditampilkan
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-7 rounded bg-[#1c1917] flex items-center justify-center flex-shrink-0">
                            <MonitorPlay size={14} className="text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#1c1917]">{video.title}</span>
                            {video.description && (
                              <p className="text-xs text-[#a8a29e] truncate max-w-[200px]">{video.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#78716c] font-mono">{video.youtubeId}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4]">
                          {video.sortOrder}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openModal('edit', video)}
                            className="p-2 rounded-lg text-[#57534e] hover:bg-[#f5f5f4] transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(video.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              deleteConfirm === video.id
                                ? 'text-white bg-[#dc2626]'
                                : 'text-[#dc2626] hover:bg-[#fef2f2]'
                            }`}
                            title={deleteConfirm === video.id ? 'Klik lagi untuk konfirmasi' : 'Hapus'}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-xl w-full max-w-md pointer-events-auto overflow-hidden">
                {modalType === 'create' && <CreateVideoForm onClose={closeModal} />}
                {modalType === 'edit' && selectedVideo && <EditVideoForm video={selectedVideo} onClose={closeModal} />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CreateVideoForm({ onClose }: { onClose: () => void }) {
  const [state, action, pending] = useActionState(createVideo, undefined);

  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-[#e7e5e4]">
        <h3 className="font-semibold text-[#1c1917]">Tambah Video Baru</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5f5f4] transition-colors">
          <X size={18} className="text-[#a8a29e]" />
        </button>
      </div>
      <form action={action} className="p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Judul Video</label>
          <input
            name="title"
            type="text"
            required
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
            placeholder="Contoh: Cara Menggunakan SIDEWO"
          />
          {state?.errors?.title && <p className="text-[#dc2626] text-xs mt-1">{state.errors.title[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Deskripsi</label>
          <textarea
            name="description"
            rows={3}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e] resize-none"
            placeholder="Deskripsi singkat tentang video ini..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">YouTube Video ID</label>
          <input
            name="youtubeId"
            type="text"
            required
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
            placeholder="Contoh: dQw4w9WgXcQ"
          />
          <p className="text-xs text-[#a8a29e] mt-1">ID YouTube adalah bagian terakhir dari URL YouTube setelah <code>v=</code>.</p>
          {state?.errors?.youtubeId && <p className="text-[#dc2626] text-xs mt-1">{state.errors.youtubeId[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Urutan Tampilan</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue="0"
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
          />
          <p className="text-xs text-[#a8a29e] mt-1">Video dengan nilai tertinggi akan ditampilkan di landing page.</p>
        </div>

        {state?.message && (
          <p className="text-[#dc2626] text-sm bg-[#fef2f2] p-3 rounded-lg">{state.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e7e5e4] text-[#57534e] font-medium hover:bg-[#fafaf9] transition-colors text-sm"
          >
            Batal
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="flex-1 bg-[#57534e] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all text-sm"
          >
            {pending ? 'Menyimpan...' : 'Simpan'}
          </motion.button>
        </div>
      </form>
    </>
  );
}

function EditVideoForm({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  const [state, action, pending] = useActionState(updateVideo, undefined);

  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-[#e7e5e4]">
        <h3 className="font-semibold text-[#1c1917]">Edit Video</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5f5f4] transition-colors">
          <X size={18} className="text-[#a8a29e]" />
        </button>
      </div>
      <form action={action} className="p-5 space-y-4">
        <input type="hidden" name="id" value={video.id} />
        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Judul Video</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={video.title}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
          />
          {state?.errors?.title && <p className="text-[#dc2626] text-xs mt-1">{state.errors.title[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Deskripsi</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={video.description || ''}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">YouTube Video ID</label>
          <input
            name="youtubeId"
            type="text"
            required
            defaultValue={video.youtubeId}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
          />
          {state?.errors?.youtubeId && <p className="text-[#dc2626] text-xs mt-1">{state.errors.youtubeId[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Urutan Tampilan</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={video.sortOrder}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
          />
          <p className="text-xs text-[#a8a29e] mt-1">Video dengan nilai tertinggi akan ditampilkan di landing page.</p>
        </div>

        {state?.message && (
          <p className="text-[#dc2626] text-sm bg-[#fef2f2] p-3 rounded-lg">{state.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e7e5e4] text-[#57534e] font-medium hover:bg-[#fafaf9] transition-colors text-sm"
          >
            Batal
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="flex-1 bg-[#57534e] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all text-sm"
          >
            {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </motion.button>
        </div>
      </form>
    </>
  );
}
