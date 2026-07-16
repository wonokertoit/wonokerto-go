'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FileCheck, Clock, XCircle, ArrowLeft, Users } from "lucide-react";
import AdminActions from "./AdminActions";

interface Application {
  id: string;
  type: string;
  nama: string;
  keperluan: string;
  status: string;
  tanggalPengajuan: Date;
  nomorSurat: string | null;
  detailUsaha: string | null;
  keteranganLain: string | null;
  tanggalBerlakuMulai: Date | null;
  tanggalBerlakuSampai: Date | null;
  alasanPenolakan: string | null;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  warganegaraan: string;
  agama: string;
  pekerjaan: string;
  alamat: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  nik: string;
  kk: string;
}

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: typeof FileText; label: string }> = {
  DIAJUKAN: { color: "text-[#b45309]", bg: "bg-[#fffbeb]", border: "border-[#fde68a]", icon: Clock, label: "Diajukan" },
  DISETUJUI: { color: "text-[#15803d]", bg: "bg-[#f0fdf4]", border: "border-[#bbf7d0]", icon: FileCheck, label: "Disetujui" },
  DITOLAK: { color: "text-[#dc2626]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]", icon: XCircle, label: "Ditolak" },
  SELESAI: { color: "text-[#1c1917]", bg: "bg-[#fafaf9]", border: "border-[#e7e5e4]", icon: FileCheck, label: "Selesai" },
};

export default function DetailClient({ app }: { app: Application }) {
  const status = statusConfig[app.status] || statusConfig.DIAJUKAN;
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/pengajuan"
          className="inline-flex items-center gap-1.5 text-sm text-[#a8a29e] hover:text-[#57534e] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden"
      >
        <div className="p-5 border-b border-[#e7e5e4]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#fafaf9] text-[#57534e] border border-[#e7e5e4]">
                  <FileText size={12} /> {app.type}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.color} ${status.border}`}>
                  <StatusIcon size={12} /> {status.label}
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#1c1917]">Review Pengajuan</h1>
              <p className="text-sm text-[#a8a29e] mt-1">ID: {app.id}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <AdminActions
            appId={app.id}
            currentStatus={app.status}
            nomorSurat={app.nomorSurat}
          />
        </div>

        <div className="px-5 pb-5 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[#1c1917] mb-3 flex items-center gap-2">
              <FileText size={16} className="text-[#a8a29e]" /> Informasi Surat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#fafaf9] rounded-lg p-4 border border-[#e7e5e4]">
                <p className="text-xs text-[#a8a29e] mb-1">Jenis Surat</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.type === 'SKU' ? 'Surat Keterangan Usaha' : 'Surat Pengantar SKCK'}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-lg p-4 border border-[#e7e5e4]">
                <p className="text-xs text-[#a8a29e] mb-1">Tanggal Pengajuan</p>
                <p className="text-sm font-medium text-[#1c1917]">{new Date(app.tanggalPengajuan).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-lg p-4 border border-[#e7e5e4]">
                <p className="text-xs text-[#a8a29e] mb-1">Keperluan</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.keperluan}</p>
              </div>
              {app.nomorSurat && (
                <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#bbf7d0]">
                  <p className="text-xs text-[#15803d] mb-1">Nomor Surat</p>
                  <p className="text-sm font-medium text-[#15803d]">{app.nomorSurat}</p>
                </div>
              )}
              {app.detailUsaha && (
                <div className="bg-[#fafaf9] rounded-lg p-4 border border-[#e7e5e4]">
                  <p className="text-xs text-[#a8a29e] mb-1">Detail Usaha</p>
                  <p className="text-sm font-medium text-[#1c1917]">{app.detailUsaha}</p>
                </div>
              )}
              {app.keteranganLain && (
                <div className="bg-[#fafaf9] rounded-lg p-4 border border-[#e7e5e4]">
                  <p className="text-xs text-[#a8a29e] mb-1">Keterangan Lain</p>
                  <p className="text-sm font-medium text-[#1c1917]">{app.keteranganLain}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1c1917] mb-3 flex items-center gap-2">
              <Users size={16} className="text-[#a8a29e]" /> Data Diri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Nama", value: app.nama },
                { label: "Jenis Kelamin", value: app.jenisKelamin },
                { label: "Tempat, Tgl Lahir", value: `${app.tempatLahir}, ${new Date(app.tanggalLahir).toLocaleDateString("id-ID")}` },
                { label: "Warganegaraan", value: app.warganegaraan },
                { label: "Agama", value: app.agama },
                { label: "Pekerjaan", value: app.pekerjaan },
                { label: "Alamat", value: `${app.alamat}, RT.${app.rt}/RW.${app.rw}, ${app.desa}, ${app.kecamatan}, ${app.kabupaten}, ${app.provinsi}` },
                { label: "NIK", value: app.nik },
                { label: "No. KK", value: app.kk },
              ].map((item) => (
                <div key={item.label} className="bg-[#fafaf9] rounded-lg p-4 border border-[#e7e5e4]">
                  <p className="text-xs text-[#a8a29e] mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-[#1c1917]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {app.alasanPenolakan && (
            <div className="bg-[#fef2f2] rounded-lg p-4 border border-[#fecaca]">
              <p className="text-xs text-[#dc2626] mb-1">Alasan Penolakan</p>
              <p className="text-sm font-medium text-[#dc2626]">{app.alasanPenolakan}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
