'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Shield, Clock, FileCheck, ArrowRight, Building2 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Surat Keterangan Usaha",
    desc: "Ajukan SKU untuk keperluan perizinan usaha Anda.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
  {
    icon: Shield,
    title: "Surat Pengantar SKCK",
    desc: "Ajukan surat pengantar untuk pembuatan SKCK.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
  {
    icon: Clock,
    title: "Tracking Status",
    desc: "Pantau status pengajuan surat secara real-time.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
  {
    icon: FileCheck,
    title: "Cetak PDF",
    desc: "Download surat dalam format PDF untuk dicetak.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fafaf9] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] rounded-full text-[#57534e] text-sm font-medium mb-6 border border-[#e7e5e4]">
              <Building2 size={16} />
              Desa Wonokerto, Kecamatan Wonogiri
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#1c1917] mb-6 leading-tight">
              Sistem Informasi{" "}
              <span className="text-[#57534e]">Desa Wonokerto</span>
            </h1>
            <p className="text-lg text-[#78716c] mb-10 leading-relaxed">
              Layanan pengajuan surat online untuk Surat Keterangan Usaha (SKU) dan Surat Pengantar SKCK.
              Proses cepat, transparan, dan terintegrasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-[#57534e] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#44403c] transition-all hover:shadow-lg hover:shadow-[#e7e5e4]"
              >
                Login Warga
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#57534e] border border-[#e7e5e4] px-8 py-3 rounded-xl font-medium hover:bg-[#fafaf9] transition-all"
              >
                Daftar Akun
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={item}
                  className="bg-white p-6 rounded-xl border border-[#e7e5e4] hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 border border-[#e7e5e4]`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-[#1c1917] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#78716c]">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
