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
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Dashboard Warga
        </motion.h1>
        <p className="text-gray-500 mt-1">Selamat datang, silakan ajukan surat yang Anda butuhkan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pengajuan" value={stats?.total ?? 0} icon={FileText} color="blue" delay={0} />
        <StatCard label="Diajukan" value={stats?.diajukan ?? 0} icon={FileClock} color="yellow" delay={0.1} />
        <StatCard label="Disetujui" value={stats?.disetujui ?? 0} icon={FileCheck} color="emerald" delay={0.2} />
        <StatCard label="Selesai" value={stats?.selesai ?? 0} icon={Clock} color="purple" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">Ajukan Surat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/pengajuan/sku"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <FilePlus className="text-blue-600" size={24} />
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-blue-500 transition-colors" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Surat Keterangan Usaha</h3>
            <p className="text-sm text-gray-500">Ajukan SKU untuk keperluan perizinan, kredit, dan lainnya.</p>
          </Link>

          <Link
            href="/pengajuan/skck"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-purple-200"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <FilePlus className="text-purple-600" size={24} />
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-purple-500 transition-colors" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Surat Pengantar SKCK</h3>
            <p className="text-sm text-gray-500">Ajukan surat pengantar untuk pembuatan SKCK.</p>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
          <Link
            href="/riwayat"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>
        <p className="text-sm text-gray-500">Lihat riwayat pengajuan Anda di halaman Riwayat.</p>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, delay = 0 }: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  delay?: number;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    gray: "bg-gray-50 text-gray-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 ${colorMap[color]} rounded-xl flex items-center justify-center`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}
