'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FileCheck, Clock, XCircle, ArrowRight, FileClock } from "lucide-react";

interface Application {
  id: string;
  type: string;
  nama: string;
  keperluan: string;
  status: string;
  tanggalPengajuan: Date;
}

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: typeof FileText }> = {
  DIAJUKAN: { color: "text-[#b45309]", bg: "bg-[#fffbeb]", border: "border-[#fde68a]", icon: FileClock },
  DISETUJUI: { color: "text-[#15803d]", bg: "bg-[#f0fdf4]", border: "border-[#bbf7d0]", icon: FileCheck },
  DITOLAK: { color: "text-[#dc2626]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]", icon: XCircle },
  SELESAI: { color: "text-[#1c1917]", bg: "bg-[#fafaf9]", border: "border-[#e7e5e4]", icon: FileCheck },
};

export default function PengajuanClient({ applications }: { applications: Application[] }) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold text-[#1c1917]">Daftar Pengajuan Surat</h1>
        <p className="text-[#a8a29e] mt-1 text-sm">Kelola dan proses semua pengajuan dari warga.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e5e4]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Jenis</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Keperluan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Tanggal</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f4]">
              {applications.map((app) => {
                const status = statusConfig[app.status] || statusConfig.DIAJUKAN;
                const StatusIcon = status.icon;
                return (
                  <tr key={app.id} className="hover:bg-[#fafaf9] transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#fafaf9] text-[#57534e] border border-[#e7e5e4]">
                        <FileText size={12} /> {app.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[#1c1917]">{app.nama}</td>
                    <td className="px-4 py-3 text-sm text-[#78716c] max-w-xs truncate">{app.keperluan}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.color} border ${status.border}`}>
                        <StatusIcon size={12} /> {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#78716c]">
                      {new Date(app.tanggalPengajuan).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/pengajuan/${app.id}`}
                        className="inline-flex items-center gap-1 text-sm text-[#78716c] hover:text-[#57534e] font-medium transition-colors"
                      >
                        Detail <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
