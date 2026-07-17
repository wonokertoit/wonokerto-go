'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";

interface Aduan {
  id: string;
  nama: string | null;
  kategori: string;
  subjek: string;
  pesan: string;
  createdAt: Date;
}

export default function RiwayatAduanClient({ aduan }: { aduan: Aduan[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[#1c1917]"
          >
            Riwayat Aduan
          </motion.h1>
          <p className="text-[#78716c] mt-1 text-sm">Daftar aduan, kritik, dan saran yang pernah Anda kirim.</p>
        </div>
        <Link
          href="/aduan"
          className="inline-flex items-center gap-2 bg-[#57534e] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#44403c] transition-all"
        >
          <MessageSquare size={16} /> Kirim Aduan
        </Link>
      </div>

      {aduan.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-2xl shadow-sm border border-[#e7e5e4] text-center"
        >
          <div className="w-16 h-16 bg-[#f5f5f4] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-[#a8a29e]" size={32} />
          </div>
          <p className="text-[#78716c] mb-4">Belum ada aduan yang dikirim.</p>
          <Link
            href="/aduan"
            className="inline-flex items-center gap-2 bg-[#57534e] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#44403c] transition-all"
          >
            Kirim Aduan Sekarang <ArrowRight size={16} />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e7e5e4] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e7e5e4]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Subjek</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Pengirim</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#a8a29e] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f4]">
                {aduan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#fafaf9]/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#fafaf9] text-[#57534e]">
                        <FileText size={14} /> {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1c1917]">{item.subjek}</td>
                    <td className="px-6 py-4 text-sm text-[#78716c]">{item.nama || 'Anonim'}</td>
                    <td className="px-6 py-4 text-sm text-[#78716c]">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/riwayat-aduan/${item.id}`}
                        className="inline-flex items-center gap-1 text-sm text-[#57534e] hover:text-[#44403c] font-medium"
                      >
                        Detail <ArrowRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
