import Link from "next/link";
import { motion } from "framer-motion";
import { getAduanById } from "@/app/actions/aduan";
import { ArrowLeft, MessageSquare, Calendar, User, Tag } from "lucide-react";

export default async function AduanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getAduanById(id);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#78716c]">Aduan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/riwayat-aduan"
          className="inline-flex items-center gap-1.5 text-sm text-[#78716c] hover:text-[#57534e] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-[#e7e5e4] overflow-hidden"
      >
        <div className="p-6 border-b border-[#e7e5e4]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fafaf9] rounded-lg flex items-center justify-center border border-[#e7e5e4]">
                <MessageSquare className="text-[#78716c]" size={20} />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#fafaf9] text-[#57534e] mb-1">
                  <Tag size={14} /> {item.kategori}
                </span>
                <h1 className="text-lg font-bold text-[#1c1917]">{item.subjek}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-4 text-sm text-[#78716c]">
            <div className="flex items-center gap-1.5">
              <User size={14} /> {item.nama || 'Anonim'}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(item.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          <div className="bg-[#fafaf9] rounded-xl p-4">
            <p className="text-xs text-[#78716c] mb-1">Pesan</p>
            <p className="text-sm text-[#1c1917] leading-relaxed whitespace-pre-wrap">{item.pesan}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
