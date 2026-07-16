'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { approveApplication, rejectApplication, completeApplication } from '@/app/actions/applications';
import { CheckCircle, XCircle, Printer } from 'lucide-react';

interface AdminActionsProps {
  appId: string;
  currentStatus: string;
  nomorSurat?: string | null;
}

export default function AdminActions({ appId, currentStatus, nomorSurat }: AdminActionsProps) {
  const router = useRouter();
  const [nomor, setNomor] = useState(nomorSurat || '');
  const [alasan, setAlasan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleApprove() {
    if (!nomor.trim()) {
      setError('Nomor surat wajib diisi sebelum approve.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await approveApplication(appId, nomor.trim());
    setLoading(false);
    if (result.success) {
      router.refresh();
    } else if (result.message) {
      setError(result.message);
    }
  }

  async function handleReject() {
    if (!alasan.trim()) {
      setError('Alasan penolakan wajib diisi.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await rejectApplication(appId, alasan.trim());
    setLoading(false);
    if (result.success) {
      router.refresh();
    } else if (result.message) {
      setError(result.message);
    }
  }

  async function handleComplete() {
    setLoading(true);
    setError('');
    const result = await completeApplication(appId);
    setLoading(false);
    if (result.success) {
      router.refresh();
    } else if (result.message) {
      setError(result.message);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-[#fef2f2] text-[#dc2626] rounded-lg text-sm border border-[#fecaca]"
        >
          {error}
        </motion.div>
      )}

      {currentStatus === 'DIAJUKAN' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#fafaf9] rounded-lg p-5 space-y-4 border border-[#e7e5e4]"
        >
          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-1">
              Nomor Surat (wajib diisi saat approve)
            </label>
            <input
              type="text"
              value={nomor}
              onChange={(e) => setNomor(e.target.value)}
              placeholder="Contoh: 470/SKU/2026"
              className="w-full px-3 py-2 bg-white rounded-lg text-sm border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApprove}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#57534e] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all"
            >
              <CheckCircle size={18} /> {loading ? 'Memproses...' : 'Setujui'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReject}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white text-[#dc2626] border border-[#fecaca] px-5 py-2.5 rounded-lg font-medium hover:bg-[#fef2f2] disabled:opacity-50 transition-all"
            >
              <XCircle size={18} /> {loading ? 'Memproses...' : 'Tolak'}
            </motion.button>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-1">Alasan Penolakan (jika ditolak)</label>
            <textarea
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-white rounded-lg text-sm border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all resize-none"
              placeholder="Masukkan alasan jika akan menolak..."
            />
          </div>
        </motion.div>
      )}

      {currentStatus === 'DISETUJUI' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f0fdf4] rounded-lg p-5 border border-[#bbf7d0] space-y-4"
        >
          <div className="flex items-center gap-2 text-[#15803d]">
            <CheckCircle size={20} />
            <p className="font-medium">Surat telah disetujui. Nomor: {nomorSurat || '-'}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/pengajuan/${appId}/pdf`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#57534e] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#44403c] transition-all"
            >
              <Printer size={18} /> Preview & Download PDF
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white text-[#15803d] border border-[#bbf7d0] px-5 py-2.5 rounded-lg font-medium hover:bg-[#f0fdf4] disabled:opacity-50 transition-all"
            >
              <CheckCircle size={18} /> {loading ? 'Memproses...' : 'Tandai Selesai'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {currentStatus === 'SELESAI' && (
        <div className="bg-[#f0fdf4] rounded-lg p-5 border border-[#bbf7d0]">
          <div className="flex items-center gap-2 text-[#15803d] mb-4">
            <CheckCircle size={20} />
            <p className="font-medium">Surat telah selesai diproses.</p>
          </div>
          <Link
            href={`/admin/pengajuan/${appId}/pdf`}
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#57534e] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#44403c] transition-all"
          >
            <Printer size={18} /> Download PDF
          </Link>
        </div>
      )}

      {currentStatus === 'DITOLAK' && (
        <div className="bg-[#fef2f2] rounded-lg p-5 border border-[#fecaca]">
          <div className="flex items-center gap-2 text-[#dc2626]">
            <XCircle size={20} />
            <p className="font-medium">Pengajuan ditolak.</p>
          </div>
        </div>
      )}
    </div>
  );
}
