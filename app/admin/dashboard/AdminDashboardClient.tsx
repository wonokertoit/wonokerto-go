'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FileCheck, Clock, XCircle, FileClock, ArrowRight, Users, Settings } from "lucide-react";

interface AdminDashboardClientProps {
  stats: {
    total: number;
    diajukan: number;
    disetujui: number;
    ditolak: number;
    selesai: number;
  } | null;
}

export default function AdminDashboardClient({ stats }: AdminDashboardClientProps) {
  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-[#1c1917]"
        >
          Dashboard Admin
        </motion.h1>
        <p className="text-[#a8a29e] mt-1 text-sm">Kelola pengajuan surat dari warga.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total" value={stats?.total ?? 0} icon={FileText} delay={0} />
        <StatCard label="Diajukan" value={stats?.diajukan ?? 0} icon={FileClock} delay={0.1} />
        <StatCard label="Disetujui" value={stats?.disetujui ?? 0} icon={FileCheck} delay={0.2} />
        <StatCard label="Ditolak" value={stats?.ditolak ?? 0} icon={XCircle} delay={0.3} />
        <StatCard label="Selesai" value={stats?.selesai ?? 0} icon={Clock} delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link
          href="/admin/pengajuan"
          className="group bg-white p-5 rounded-xl border border-[#e7e5e4] hover:border-[#d6d3d1] hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#fafaf9] rounded-lg flex items-center justify-center border border-[#e7e5e4]">
                <Users className="text-[#78716c]" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1c1917] text-sm">Kelola Pengajuan</h3>
                <p className="text-xs text-[#a8a29e]">Review dan proses semua pengajuan</p>
              </div>
            </div>
            <ArrowRight className="text-[#d6d3d1] group-hover:text-[#78716c] transition-colors" size={18} />
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="group bg-white p-5 rounded-xl border border-[#e7e5e4] hover:border-[#d6d3d1] hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#fafaf9] rounded-lg flex items-center justify-center border border-[#e7e5e4]">
                <Settings className="text-[#78716c]" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1c1917] text-sm">Pengaturan Desa</h3>
                <p className="text-xs text-[#a8a29e]">Atur kop surat dan informasi desa</p>
              </div>
            </div>
            <ArrowRight className="text-[#d6d3d1] group-hover:text-[#78716c] transition-colors" size={18} />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, delay = 0 }: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  delay?: number;
}) {
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
        <div className="w-9 h-9 bg-[#fafaf9] rounded-lg flex items-center justify-center border border-[#e7e5e4]">
          <div className="text-[#78716c]">
            <Icon size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
