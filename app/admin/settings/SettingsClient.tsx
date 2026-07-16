'use client';

import { motion } from "framer-motion";
import { Save } from "lucide-react";

interface Settings {
  namaKepalaDesa: string;
  jabatan: string;
  namaDesa: string;
  kodeDesa: string;
  alamat: string;
  telepon: string;
  fax: string;
  email: string;
  website: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
}

export default function SettingsClient({
  settings,
  updateAction,
}: {
  settings: Settings;
  updateAction: (formData: FormData) => void;
}) {
  const inputClass = "w-full px-4 py-2.5 bg-[#fafaf9] rounded-xl text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#a8a29e]/20 outline-none transition-all placeholder:text-[#a8a29e]";

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold text-[#1c1917]">Pengaturan Desa</h1>
        <p className="text-[#78716c] mt-1">Atur kop surat dan informasi desa.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <form
          action={updateAction}
          className="bg-white p-6 rounded-2xl shadow-sm border border-[#e7e5e4] space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Nama Kepala Desa</label>
              <input name="namaKepalaDesa" defaultValue={settings.namaKepalaDesa} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Jabatan</label>
              <input name="jabatan" defaultValue={settings.jabatan} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Nama Desa</label>
              <input name="namaDesa" defaultValue={settings.namaDesa} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Kode Desa</label>
              <input name="kodeDesa" defaultValue={settings.kodeDesa} required className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Alamat</label>
              <input name="alamat" defaultValue={settings.alamat} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Telepon</label>
              <input name="telepon" defaultValue={settings.telepon} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Fax</label>
              <input name="fax" defaultValue={settings.fax} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Email</label>
              <input name="email" type="email" defaultValue={settings.email} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Website</label>
              <input name="website" defaultValue={settings.website} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Kecamatan</label>
              <input name="kecamatan" defaultValue={settings.kecamatan} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Kabupaten</label>
              <input name="kabupaten" defaultValue={settings.kabupaten} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Provinsi</label>
              <input name="provinsi" defaultValue={settings.provinsi} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#44403c] mb-1.5">Kode Pos</label>
              <input name="kodePos" defaultValue={settings.kodePos} required className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#57534e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#44403c] transition-all"
            >
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
