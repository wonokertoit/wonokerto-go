'use client';

import Link from "next/link";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { FileText, FileCheck, Clock, XCircle, ArrowLeft, Calendar, Users, Star, MessageSquare, Send } from "lucide-react";
import { submitFeedback } from "@/app/actions/applications";

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
  rating: number | null;
  feedback: string | null;
  feedbackCreatedAt: Date | null;
}

const statusConfig: Record<string, { color: string; bg: string; icon: typeof FileText; label: string }> = {
  DIAJUKAN: { color: "text-[#a16207]", bg: "bg-[#fefce8]", icon: Clock, label: "Diajukan" },
  DISETUJUI: { color: "text-[#166534]", bg: "bg-[#f0fdf4]", icon: FileCheck, label: "Disetujui" },
  DITOLAK: { color: "text-[#7f1d1d]", bg: "bg-[#fef2f2]", icon: XCircle, label: "Ditolak" },
  SELESAI: { color: "text-[#57534e]", bg: "bg-[#fafaf9]", icon: FileCheck, label: "Selesai" },
};

function StarRating({ rating, setRating, disabled = false }: { rating: number; setRating?: (r: number) => void; disabled?: boolean }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => setRating && setRating(star)}
          onMouseEnter={() => !disabled && setHover(star)}
          onMouseLeave={() => !disabled && setHover(0)}
          className={`transition-transform ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            size={24}
            className={
              star <= (hover || rating)
                ? "fill-[#78716c] text-[#78716c]"
                : "text-[#d6d3d1]"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function DetailClient({ app }: { app: Application }) {
  const status = statusConfig[app.status] || statusConfig.DIAJUKAN;
  const StatusIcon = status.icon;

  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const canGiveFeedback = app.status === "SELESAI" && !app.feedback && !submitted;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors(null);
    setMessage("");

    startTransition(async () => {
      const result = await submitFeedback(app.id, rating, feedbackText);
      if (result?.errors) {
        setErrors(result.errors);
      } else if (result?.message) {
        setMessage(result.message);
      } else {
        setSubmitted(true);
        setMessage("Terima kasih! Saran dan kritik Anda telah tersimpan.");
      }
    });
  }

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

          {/* Feedback Section */}
          {(app.feedback || canGiveFeedback) && (
            <div className="border-t border-[#e7e5e4] pt-8">
              <h3 className="text-sm font-semibold text-[#1c1917] mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-[#a8a29e]" /> Penilaian Layanan
              </h3>

              {app.feedback ? (
                <div className="bg-[#fafaf9] rounded-xl p-5 border border-[#e7e5e4]">
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={app.rating ?? 0} disabled />
                    <span className="text-sm font-medium text-[#57534e]">{app.rating}/5</span>
                  </div>
                  <p className="text-sm text-[#1c1917] leading-relaxed">{app.feedback}</p>
                  {app.feedbackCreatedAt && (
                    <p className="text-xs text-[#a8a29e] mt-2">
                      Dikirim pada {new Date(app.feedbackCreatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#fafaf9] rounded-xl p-5 border border-[#e7e5e4] space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1c1917] mb-2">Beri Rating</label>
                    <StarRating rating={rating} setRating={setRating} />
                    {errors?.rating && <p className="text-xs text-[#dc2626] mt-1">{errors.rating[0]}</p>}
                  </div>
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-[#1c1917] mb-2">Saran & Kritik</label>
                    <textarea
                      id="feedback"
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Bagaimana pengalaman Anda dengan layanan kami?"
                      className="w-full bg-white rounded-xl border border-[#d6d3d1] px-4 py-3 text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#e7e5e4] focus:border-[#a8a29e] transition-all resize-none"
                    />
                    {errors?.feedback && <p className="text-xs text-[#dc2626] mt-1">{errors.feedback[0]}</p>}
                  </div>
                  {message && (
                    <div className={`text-sm ${submitted ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                      {message}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isPending || rating === 0}
                    className="inline-flex items-center gap-2 bg-[#57534e] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#44403c] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send size={16} />
                    {isPending ? 'Mengirim...' : 'Kirim Penilaian'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
