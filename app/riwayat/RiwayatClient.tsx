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

const statusConfig: Record<string, { color: string; bg: string; icon: typeof FileText }> = {
  DIAJUKAN: { color: "text-[#a16207]", bg: "bg-[#fefce8]", icon: FileClock },
  DISETUJUI: { color: "text-[#166534]", bg: "bg-[#f0fdf4]", icon: FileCheck },
  DITOLAK: { color: "text-[#7f1d1d]", bg: "bg-[#fef2f2]", icon: XCircle },
  SELESAI: { color: "text-[#57534e]", bg: "bg-[#fafaf9]", icon: FileCheck },
};

export default function RiwayatClient({ applications }: { applications: Application[] }) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold text-[#1c1917]">Riwayat Pengajuan</h1>
        <p className="text-[#78716c] mt-1">Daftar seluruh pengajuan surat Anda.</p>
      </motion.div>

      {applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-12 rounded-2xl shadow-sm border border-[#e7e5e4] text-center"
        >
          <div className="w-16 h-16 bg-[#f5f5f4] rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-[#a8a29e]" size={32} />
          </div>
          <p className="text-[#78716c] mb-4">Belum ada pengajuan surat.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#57534e] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#44403c] transition-all"
          >
            Ajukan Surat Sekarang <ArrowRight size={16} />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e7e5e4] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e7e5e4]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Jenis</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Keperluan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f4]">
                {applications.map((app) => {
                  const status = statusConfig[app.status] || statusConfig.DIAJUKAN;
                  const StatusIcon = status.icon;
                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-[#fafaf9]/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#fafaf9] text-[#57534e]">
                          <FileText size={14} /> {app.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1c1917]">{app.nama}</td>
                      <td className="px-6 py-4 text-sm text-[#78716c] max-w-xs truncate">{app.keperluan}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                          <StatusIcon size={14} /> {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#78716c]">
                        {new Date(app.tanggalPengajuan).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/riwayat/${app.id}`}
                          className="inline-flex items-center gap-1 text-sm text-[#57534e] hover:text-[#44403c] font-medium"
                        >
                          Detail <ArrowRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
