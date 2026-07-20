'use client';

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FileText, Shield, Clock, FileCheck, ArrowRight, Building2, MapPin,
  Users, Mail, Phone, ChevronRight, Sparkles, TrendingUp, Play
} from "lucide-react";
import GoogleMap from "./components/GoogleMap";
import CardNav from "./components/CardNav";
import VideoSection from "./components/VideoSection";

const navItems = [
  {
    label: "Layanan",
    bgColor: "#1B1722",
    textColor: "#fff",
    links: [
      { label: "Surat Keterangan Usaha", href: "/pengajuan/sku", ariaLabel: "Ajukan SKU" },
      { label: "Surat Pengantar SKCK", href: "/pengajuan/skck", ariaLabel: "Ajukan SKCK" },
      { label: "Aduan Warga", href: "/aduan", ariaLabel: "Aduan Warga" }
    ]
  },
  {
    label: "Informasi",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "Tentang Desa", href: "#", ariaLabel: "Tentang Desa Wonokerto" },
      { label: "Lokasi", href: "#lokasi", ariaLabel: "Lokasi Desa Wonokerto" }
    ]
  },
  {
    label: "Akun",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "Login", href: "/login", ariaLabel: "Login" },
      { label: "Daftar", href: "/register", ariaLabel: "Daftar Akun" }
    ]
  }
];

const features = [
  {
    icon: FileText,
    title: "Surat Keterangan Usaha",
    desc: "Ajukan SKU untuk keperluan perizinan usaha Anda dengan proses digital.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
  {
    icon: Shield,
    title: "Surat Pengantar SKCK",
    desc: "Ajukan surat pengantar untuk pembuatan SKCK secara cepat dan mudah.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
  {
    icon: Clock,
    title: "Tracking Status",
    desc: "Pantau status pengajuan surat secara real-time kapan saja.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
  {
    icon: FileCheck,
    title: "Cetak PDF",
    desc: "Download surat dalam format PDF siap cetak dengan sekali klik.",
    color: "bg-[#fafaf9] text-[#57534e]",
  },
];

const stats = [
  { label: "Pengajuan Surat", value: "1,240+", icon: FileCheck },
  { label: "Warga Terdaftar", value: "3,500+", icon: Users },
  { label: "Hari Proses", value: "2", suffix: " hari", icon: Clock },
  { label: "Kepuasan", value: "98", suffix: "%", icon: TrendingUp },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* Soft ambient blobs */
function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.35] blur-3xl"
        style={{ background: "radial-gradient(circle, #d6d3d1 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, -25, 35, 0], y: [0, 30, -25, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full opacity-[0.30] blur-3xl"
        style={{ background: "radial-gradient(circle, #a8a29e 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0], scale: [1, 1.05, 0.92, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full opacity-[0.25] blur-3xl"
        style={{ background: "radial-gradient(circle, #e7e5e4 0%, transparent 70%)" }}
      />
    </div>
  );
}

/* Floating badge */
function FloatingBadge({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
      }}
      className={`absolute hidden lg:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#e7e5e4] shadow-sm text-sm text-[#57534e] font-medium ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Stat card */
function StatCard({ value, suffix, label, icon: Icon, delay }: { value: string; suffix?: string; label: string; icon: React.ElementType; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 text-center border border-[#e7e5e4] shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#fafaf9] flex items-center justify-center text-[#57534e]">
        <Icon size={20} />
      </div>
      <div className="text-3xl lg:text-4xl font-bold text-[#1c1917] mb-1">
        {value}<span className="text-[#a8a29e]">{suffix}</span>
      </div>
      <p className="text-sm text-[#78716c]">{label}</p>
    </motion.div>
  );
}

/* Smooth wave divider */
function WaveDivider({ flip = false, fill = "#fafaf9" }: { flip?: boolean; fill?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 sm:h-12 lg:h-14 block">
        <path
          d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="min-h-screen bg-white">
      <CardNav
        logoAlt="SIDEWO"
        items={navItems}
        baseColor="#fff"
        menuColor="#1c1917"
        buttonBgColor="#57534e"
        buttonTextColor="#fff"
        theme="light"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-[#fafaf9] via-white to-white pt-24">
        <AmbientBlobs />

        <FloatingBadge className="top-[22%] left-[12%]" delay={0.8}>
          <FileText size={16} className="text-[#57534e]" />
          SKU Online
        </FloatingBadge>
        <FloatingBadge className="top-[35%] right-[10%]" delay={1.2}>
          <Shield size={16} className="text-[#57534e]" />
          SKCK Cepat
        </FloatingBadge>
        <FloatingBadge className="bottom-[20%] left-[15%]" delay={1.6}>
          <Clock size={16} className="text-[#57534e]" />
          Real-time
        </FloatingBadge>

        <motion.div style={{ y: heroY }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] rounded-full text-[#57534e] text-sm font-medium mb-6 border border-[#e7e5e4]"
              >
                <Building2 size={16} />
                Desa Wonokerto, Kecamatan Wonogiri
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-[#1c1917] mb-6 leading-tight tracking-tight"
              >
                SIDEWO
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-xl text-[#57534e] mb-4 font-medium"
              >
                Sistem Informasi Desa Wonokerto
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-lg text-[#78716c] mb-10 leading-relaxed max-w-2xl mx-auto"
              >
                Layanan pengajuan surat online untuk Surat Keterangan Usaha (SKU) dan Surat Pengantar SKCK.
                Proses cepat, transparan, dan terintegrasi.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center gap-2 bg-[#57534e] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#44403c] transition-all hover:shadow-lg hover:shadow-[#e7e5e4]"
                >
                  Login Warga
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#57534e] border border-[#e7e5e4] px-8 py-3 rounded-xl font-medium hover:bg-[#fafaf9] transition-all"
                >
                  Daftar Akun
                </Link>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-16 flex flex-col items-center gap-2"
              >
                <span className="text-xs text-[#a8a29e]">Gulir ke bawah</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight size={18} className="text-[#a8a29e] rotate-90" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <WaveDivider fill="#fafaf9" />

      {/* Stats Section */}
      <section className="py-16 bg-[#fafaf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider flip fill="#fafaf9" />

      {/* Features */}
      <section className="py-20 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-[#57534e] text-xs font-medium mb-4 border border-[#e7e5e4]"
            >
              <Sparkles size={14} />
              Fitur Unggulan
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1c1917] mb-3">Layanan Desa Digital</h2>
            <p className="text-[#78716c] max-w-lg mx-auto">
              Semua kebutuhan surat administrasi desa kini bisa diurus secara online tanpa ribet.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={item}
                  whileHover={{ y: -8, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
                  className="bg-white p-6 rounded-2xl border border-[#e7e5e4] hover:shadow-xl hover:shadow-[#e7e5e4]/60 transition-shadow cursor-default group"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5 border border-[#e7e5e4] transition-transform group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-[#1c1917] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#78716c] leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <VideoSection />

      <WaveDivider fill="#fafaf9" />

      {/* Map Section */}
      <section id="lokasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] rounded-full text-[#57534e] text-sm font-medium mb-6 border border-[#e7e5e4]"
            >
              <MapPin size={16} />
              Lokasi Desa Wonokerto
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1c1917] mb-3">Peta Desa Wonokerto</h2>
            <p className="text-[#78716c] max-w-xl mx-auto">
              Desa Wonokerto terletak di Kecamatan Wonogiri, Kabupaten Wonogiri, Provinsi Jawa Tengah.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-sm"
          >
            <GoogleMap height="450px" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >
            {[
              { label: "Koordinat", value: "-7.8233°, 110.9317°" },
              { label: "Kecamatan", value: "Wonogiri" },
              { label: "Kabupaten", value: "Wonogiri" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#fafaf9] p-5 rounded-xl border border-[#e7e5e4] text-center transition-shadow hover:shadow-sm"
              >
                <p className="text-xs text-[#a8a29e] uppercase tracking-wider mb-1 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-[#1c1917]">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#1c1917]">
          <motion.div
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #a8a29e 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ x: [0, -15, 20, 0], y: [0, 10, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #78716c 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Siap Mengurus Surat?
            </h2>
            <p className="text-[#a8a29e] mb-10 max-w-lg mx-auto text-lg">
              Daftar sekarang dan nikmati kemudahan layanan administrasi desa secara online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#1c1917] px-8 py-3 rounded-xl font-semibold hover:bg-[#fafaf9] transition-all shadow-lg"
              >
                Daftar Sekarang
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-white border border-white/20 px-8 py-3 rounded-xl font-medium hover:bg-white/5 transition-all"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fafaf9] border-t border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#57534e] flex items-center justify-center text-white text-sm font-bold">S</div>
                <span className="font-bold text-[#1c1917] text-lg">SIDEWO</span>
              </div>
              <p className="text-sm text-[#78716c] leading-relaxed">
                Sistem Informasi Desa Wonokerto — layanan administrasi digital untuk masyarakat Desa Wonokerto, Kecamatan Wonogiri.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1c1917] mb-4 text-sm uppercase tracking-wide">Kontak</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:desa.wonokerto@wonogiri.go.id" className="flex items-center gap-2.5 text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-[#fafaf9] flex items-center justify-center text-[#57534e] border border-[#e7e5e4]"><Mail size={14} /></span>
                  desa.wonokerto@wonogiri.go.id
                </a>
                <div className="flex items-center gap-2.5 text-sm text-[#78716c]">
                  <span className="w-8 h-8 rounded-lg bg-[#fafaf9] flex items-center justify-center text-[#57534e] border border-[#e7e5e4]"><Phone size={14} /></span>
                  (0273) 123456
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#78716c]">
                  <span className="w-8 h-8 rounded-lg bg-[#fafaf9] flex items-center justify-center text-[#57534e] border border-[#e7e5e4]"><MapPin size={14} /></span>
                  Desa Wonokerto, Wonogiri, Jawa Tengah
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1c1917] mb-4 text-sm uppercase tracking-wide">Tautan Cepat</h3>
              <div className="flex flex-col gap-2.5">
                <Link href="/login" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">Login</Link>
                <Link href="/register" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">Daftar</Link>
                <Link href="/pengajuan/sku" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">Pengajuan SKU</Link>
                <Link href="/pengajuan/skck" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">Pengajuan SKCK</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#e7e5e4] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#a8a29e]">
              &copy; {new Date().getFullYear()} Desa Wonokerto. Hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#a8a29e]">
              <Users size={14} />
              <span>Dibuat untuk masyarakat Desa Wonokerto</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#e7e5e4] text-center">
            <p className="text-[11px] text-[#a8a29e]">
              Dibuat oleh <strong className="text-[#78716c]">KKN R UNDIP Tim 2 Desa Wonokerto</strong>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
