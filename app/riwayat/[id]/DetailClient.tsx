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
  DIAJUKAN: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock, label: "Diajukan" },
  DISETUJUI: { color: "text-green-600", bg: "bg-green-50", icon: FileCheck, label: "Disetujui" },
  DITOLAK: { color: "text-red-600", bg: "bg-red-50", icon: XCircle, label: "Ditolak" },
  SELESAI: { color: "text-emerald-600", bg: "bg-emerald-50", icon: FileCheck, label: "Selesai" },
};

export default function DetailClient({ app }: { app: Application }) {
  const status = statusConfig[app.status] || statusConfig.DIAJUKAN;
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/riwayat"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                  <FileText size={14} /> {app.type}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                  <StatusIcon size={14} /> {status.label}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{app.type === 'SKU' ? 'Surat Keterangan Usaha' : 'Surat Pengantar SKCK'}</h1>
              <p className="text-sm text-gray-500 mt-1">ID: {app.id}</p>
            </div>
            {app.nomorSurat && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Nomor Surat</p>
                <p className="text-sm font-semibold text-gray-900">{app.nomorSurat}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-gray-400" /> Informasi Surat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Keperluan</p>
                <p className="text-sm font-medium text-gray-900">{app.keperluan}</p>
              </div>
              {app.detailUsaha && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Detail Usaha</p>
                  <p className="text-sm font-medium text-gray-900">{app.detailUsaha}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Tanggal Pengajuan</p>
                <p className="text-sm font-medium text-gray-900">{new Date(app.tanggalPengajuan).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={16} className="text-gray-400" /> Data Diri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                <p className="text-sm font-medium text-gray-900">{app.nama}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Jenis Kelamin</p>
                <p className="text-sm font-medium text-gray-900">{app.jenisKelamin}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Tempat, Tgl Lahir</p>
                <p className="text-sm font-medium text-gray-900">{app.tempatLahir}, {new Date(app.tanggalLahir).toLocaleDateString("id-ID")}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Warganegaraan</p>
                <p className="text-sm font-medium text-gray-900">{app.warganegaraan}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Agama</p>
                <p className="text-sm font-medium text-gray-900">{app.agama}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Pekerjaan</p>
                <p className="text-sm font-medium text-gray-900">{app.pekerjaan}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p className="text-xs text-gray-500 mb-1">Alamat</p>
                <p className="text-sm font-medium text-gray-900">{app.alamat}, RT.{app.rt}/RW.{app.rw}, {app.desa}, {app.kecamatan}, {app.kabupaten}, {app.provinsi}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">NIK</p>
                <p className="text-sm font-medium text-gray-900">{app.nik}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">No. KK</p>
                <p className="text-sm font-medium text-gray-900">{app.kk}</p>
              </div>
            </div>
          </div>

          {(app.status === 'DISETUJUI' || app.status === 'SELESAI') && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" /> Masa Berlaku
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs text-emerald-600 mb-1">Mulai Berlaku</p>
                  <p className="text-sm font-medium text-emerald-900">{app.tanggalBerlakuMulai ? new Date(app.tanggalBerlakuMulai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : '-'}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs text-emerald-600 mb-1">Berlaku Sampai</p>
                  <p className="text-sm font-medium text-emerald-900">{app.tanggalBerlakuSampai ? new Date(app.tanggalBerlakuSampai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : '-'}</p>
                </div>
              </div>
            </div>
          )}

          {app.alasanPenolakan && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <p className="text-xs text-red-600 mb-1">Alasan Penolakan</p>
              <p className="text-sm font-medium text-red-900">{app.alasanPenolakan}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
