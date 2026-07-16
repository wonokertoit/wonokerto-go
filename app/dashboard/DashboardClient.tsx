'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FileCheck, Clock, FileClock, ArrowRight, FilePlus } from "lucide-react";

interface DashboardClientProps {
  stats: {
    total: number;
    diajukan: number;
    disetujui: number;
    selesai: number;
  } | null;
}

export default function DashboardClient({ stats }: DashboardClientProps) {
  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-[#1c1917]"
        >
          Dashboard Warga
        </motion.h1>
        <p className="text-[#78716c] mt-1 text-sm">Selamat datang, silakan ajukan surat yang Anda butuhkan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pengajuan" value={stats?.total ?? 0} icon={FileText} variant="default" delay={0} />
        <StatCard label="Diajukan" value={stats?.diajukan ?? 0} icon={FileClock} variant="warning" delay={0.1} />
        <StatCard label="Disetujui" value={stats?.disetujui ?? 0} icon={FileCheck} variant="success" delay={0.2} />
        <StatCard label="Selesai" value={stats?.selesai ?? 0} icon={Clock} variant="default" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-base font-semibold text-[#1c1917]">Ajukan Surat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/pengajuan/sku"
            className="group bg-white p-5 rounded-xl border border-[#e7e5e4] hover:border-[#d6d3d1] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-[#fafaf9] rounded-lg flex items-center justify-center mb-3 border border-[#e7e5e4]">
                <FilePlus className="text-[#78716c]" size={20} />
              </div>
              <ArrowRight className="text-[#d6d3d1] group-hover:text-[#78716c] transition-colors" size={18} />
            </div>
            <h3 className="font-semibold text-[#1c1917] mb-1 text-sm">Surat Keterangan Usaha</h3>
            <p className="text-xs text-[#78716c]">Ajukan SKU untuk keperluan perizinan, kredit, dan lainnya.</p>
          </Link>

          <Link
            href="/pengajuan/skck"
            className="group bg-white p-5 rounded-xl border border-[#e7e5e4] hover:border-[#d6d3d1] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-[#fafaf9] rounded-lg flex items-center justify-center mb-3 border border-[#e7e5e4]">
                <FilePlus className="text-[#78716c]" size={20} />
              </div>
              <ArrowRight className="text-[#d6d3d1] group-hover:text-[#78716c] transition-colors" size={18} />
            </div>
            <h3 className="font-semibold text-[#1c1917] mb-1 text-sm">Surat Pengantar SKCK</h3>
            <p className="text-xs text-[#78716c]">Ajukan surat pengantar untuk pembuatan SKCK.</p>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-5 rounded-xl border border-[#e7e5e4]"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[#1c1917]">Aktivitas Terbaru</h2>
          <Link
            href="/riwayat"
            className="text-sm text-[#78716c] hover:text-[#57534e] font-medium flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-sm text-[#a8a29e]">Lihat riwayat pengajuan Anda di halaman Riwayat.</p>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, variant, delay = 0 }: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  variant: "default" | "success" | "warning";
  delay?: number;
}) {
  const variantMap = {
    default: "bg-[#fafaf9] text-[#78716c] border-[#e7e5e4]",
    success: "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]",
    warning: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white p-4 rounded-xl border border-[#e7e5e4]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#a8a29e] font-medium">{label}</p>
          <p className="text-xl font-bold text-[#1c1917] mt-1">{value}</p>
        </div>
        <div className={`w-9 h-9 ${variantMap[variant]} rounded-lg flex items-center justify-center border`}>
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  );
}
