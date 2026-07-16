'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { approveApplication, rejectApplication, completeApplication } from '@/app/actions/applications';
import { FileText, CheckCircle, XCircle, Printer, ArrowRight } from 'lucide-react';

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
          className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100"
        >
          {error}
        </motion.div>
      )}

      {currentStatus === 'DIAJUKAN' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nomor Surat (wajib diisi saat approve)
            </label>
            <input
              type="text"
              value={nomor}
              onChange={(e) => setNomor(e.target.value)}
              placeholder="Contoh: 470/SKU/2026"
              className="w-full px-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApprove}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <CheckCircle size={18} /> {loading ? 'Memproses...' : 'Setujui'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReject}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 transition-all"
            >
              <XCircle size={18} /> {loading ? 'Memproses...' : 'Tolak'}
            </motion.button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Alasan Penolakan (jika ditolak)</label>
            <textarea
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
              placeholder="Masukkan alasan jika akan menolak..."
            />
          </div>
        </motion.div>
      )}

      {currentStatus === 'DISETUJUI' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-4"
        >
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle size={20} />
            <p className="font-medium">Surat telah disetujui. Nomor: {nomorSurat || '-'}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/pengajuan/${appId}/pdf`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all"
            >
              <Printer size={18} /> Preview & Download PDF
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <CheckCircle size={18} /> {loading ? 'Memproses...' : 'Tandai Selesai'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {currentStatus === 'SELESAI' && (
        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-800 mb-4">
            <CheckCircle size={20} />
            <p className="font-medium">Surat telah selesai diproses.</p>
          </div>
          <Link
            href={`/admin/pengajuan/${appId}/pdf`}
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            <Printer size={18} /> Download PDF
          </Link>
        </div>
      )}

      {currentStatus === 'DITOLAK' && (
        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
          <div className="flex items-center gap-2 text-red-800">
            <XCircle size={20} />
            <p className="font-medium">Pengajuan ditolak.</p>
          </div>
        </div>
      )}
    </div>
  );
}
