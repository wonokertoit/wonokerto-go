'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FileCheck, Clock, XCircle, ArrowLeft, Calendar, Users } from "lucide-react";

interface Application {
  id: string;
  type: string;
  nama: string;
  keperluan: string;
  status: string;
  tanggalPengajuan: Date;
  nomorSurat: string | null;
  detailUsaha: string | null;
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

const statusConfig: Record<string, { color: string; bg: string; icon: typeof FileText; label: string }> = {
  DIAJUKAN: { color: "text-[#a16207]", bg: "bg-[#fefce8]", icon: Clock, label: "Diajukan" },
  DISETUJUI: { color: "text-[#166534]", bg: "bg-[#f0fdf4]", icon: FileCheck, label: "Disetujui" },
  DITOLAK: { color: "text-[#7f1d1d]", bg: "bg-[#fef2f2]", icon: XCircle, label: "Ditolak" },
  SELESAI: { color: "text-[#57534e]", bg: "bg-[#fafaf9]", icon: FileCheck, label: "Selesai" },
};

export default function DetailClient({ app }: { app: Application }) {
  const status = statusConfig[app.status] || statusConfig.DIAJUKAN;
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/riwayat"
          className="inline-flex items-center gap-1.5 text-sm text-[#78716c] hover:text-[#57534e] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-[#e7e5e4] overflow-hidden"
      >
        <div className="p-6 border-b border-[#e7e5e4]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#fafaf9] text-[#57534e]">
                  <FileText size={14} /> {app.type}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                  <StatusIcon size={14} /> {status.label}
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#1c1917]">{app.type === 'SKU' ? 'Surat Keterangan Usaha' : 'Surat Pengantar SKCK'}</h1>
              <p className="text-sm text-[#78716c] mt-1">ID: {app.id}</p>
            </div>
            {app.nomorSurat && (
              <div className="text-right">
                <p className="text-xs text-[#78716c]">Nomor Surat</p>
                <p className="text-sm font-semibold text-[#1c1917]">{app.nomorSurat}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-[#1c1917] mb-4 flex items-center gap-2">
              <FileText size={16} className="text-[#a8a29e]" /> Informasi Surat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Keperluan</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.keperluan}</p>
              </div>
              {app.detailUsaha && (
                <div className="bg-[#fafaf9] rounded-xl p-4">
                  <p className="text-xs text-[#78716c] mb-1">Detail Usaha</p>
                  <p className="text-sm font-medium text-[#1c1917]">{app.detailUsaha}</p>
                </div>
              )}
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Tanggal Pengajuan</p>
                <p className="text-sm font-medium text-[#1c1917]">{new Date(app.tanggalPengajuan).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1c1917] mb-4 flex items-center gap-2">
              <Users size={16} className="text-[#a8a29e]" /> Data Diri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Nama Lengkap</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.nama}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Jenis Kelamin</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.jenisKelamin}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Tempat, Tgl Lahir</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.tempatLahir}, {new Date(app.tanggalLahir).toLocaleDateString("id-ID")}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Warganegaraan</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.warganegaraan}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Agama</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.agama}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">Pekerjaan</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.pekerjaan}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4 md:col-span-2">
                <p className="text-xs text-[#78716c] mb-1">Alamat</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.alamat}, RT.{app.rt}/RW.{app.rw}, {app.desa}, {app.kecamatan}, {app.kabupaten}, {app.provinsi}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">NIK</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.nik}</p>
              </div>
              <div className="bg-[#fafaf9] rounded-xl p-4">
                <p className="text-xs text-[#78716c] mb-1">No. KK</p>
                <p className="text-sm font-medium text-[#1c1917]">{app.kk}</p>
              </div>
            </div>
          </div>

          {(app.status === 'DISETUJUI' || app.status === 'SELESAI') && (
            <div>
              <h3 className="text-sm font-semibold text-[#1c1917] mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-[#a8a29e]" /> Masa Berlaku
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#fafaf9] rounded-xl p-4 border border-[#e7e5e4]">
                  <p className="text-xs text-[#78716c] mb-1">Mulai Berlaku</p>
                  <p className="text-sm font-medium text-[#1c1917]">{app.tanggalBerlakuMulai ? new Date(app.tanggalBerlakuMulai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : '-'}</p>
                </div>
                <div className="bg-[#fafaf9] rounded-xl p-4 border border-[#e7e5e4]">
                  <p className="text-xs text-[#78716c] mb-1">Berlaku Sampai</p>
                  <p className="text-sm font-medium text-[#1c1917]">{app.tanggalBerlakuSampai ? new Date(app.tanggalBerlakuSampai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : '-'}</p>
                </div>
              </div>
            </div>
          )}

          {app.alasanPenolakan && (
            <div className="bg-[#fef2f2] rounded-xl p-4 border border-[#fecaca]">
              <p className="text-xs text-[#7f1d1d] mb-1">Alasan Penolakan</p>
              <p className="text-sm font-medium text-[#991b1b]">{app.alasanPenolakan}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
