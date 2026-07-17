'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createAduan } from '@/app/actions/aduan';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { ArrowLeft, Send, X, MessageSquare } from 'lucide-react';
import Select from './Select';

const inputClass = "w-full px-3 py-2 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]";
const textareaClass = "w-full px-3 py-2 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e] resize-none";

const kategoriOptions = [
  { value: 'Infrastruktur', label: 'Infrastruktur' },
  { value: 'Pelayanan', label: 'Pelayanan' },
  { value: 'Kebersihan', label: 'Kebersihan' },
  { value: 'Keamanan', label: 'Keamanan' },
  { value: 'Lainnya', label: 'Lainnya' },
];

export default function AduanForm() {
  const [state, action, pending] = useActionState(createAduan, undefined);
  const [kategori, setKategori] = useState('');
  const [anonim, setAnonim] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success('Aduan berhasil dikirim!');
      const form = document.getElementById('aduan-form') as HTMLFormElement;
      form?.reset();
      setKategori('');
      setAnonim(false);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[#a8a29e] hover:text-[#57534e] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-[#e7e5e4]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#fafaf9] rounded-lg flex items-center justify-center border border-[#e7e5e4]">
            <MessageSquare className="text-[#78716c]" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1c1917]">Kirim Aduan, Kritik &amp; Saran</h1>
            <p className="text-xs text-[#a8a29e]">Sampaikan pendapat Anda untuk Desa Wonokerto yang lebih baik.</p>
          </div>
        </div>

        <form id="aduan-form" action={action} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="anonim"
              checked={anonim}
              onChange={(e) => setAnonim(e.target.checked)}
              className="rounded border-[#e7e5e4] text-[#57534e] focus:ring-[#a8a29e]"
            />
            <label htmlFor="anonim" className="text-sm text-[#57534e] cursor-pointer">
              Kirim sebagai anonim
            </label>
          </div>

          {!anonim && (
            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1">Nama (opsional)</label>
              <input
                name="nama"
                className={inputClass}
                placeholder="Nama Anda (boleh dikosongkan)"
              />
            </div>
          )}

          <Select
            label="Kategori"
            name="kategoriDisplay"
            value={kategori}
            onChange={setKategori}
            options={kategoriOptions}
            placeholder="Pilih kategori..."
          />
          <input type="hidden" name="kategori" value={kategori} />

          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-1">Subjek</label>
            <input
              name="subjek"
              required
              className={inputClass}
              placeholder="Judul singkat aduan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-1">Pesan</label>
            <textarea
              name="pesan"
              required
              rows={5}
              className={textareaClass}
              placeholder="Jelaskan detail aduan, kritik, atau saran Anda..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 bg-[#57534e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all"
            >
              <Send size={18} /> {pending ? 'Mengirim...' : 'Kirim Aduan'}
            </motion.button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#e7e5e4] rounded-xl text-[#57534e] hover:bg-[#fafaf9] transition-all"
            >
              <X size={18} /> Batal
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
