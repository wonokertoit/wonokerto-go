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
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-900 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400";

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Desa</h1>
        <p className="text-gray-500 mt-1">Atur kop surat dan informasi desa.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <form
          action={updateAction}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Kepala Desa</label>
              <input name="namaKepalaDesa" defaultValue={settings.namaKepalaDesa} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Jabatan</label>
              <input name="jabatan" defaultValue={settings.jabatan} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Desa</label>
              <input name="namaDesa" defaultValue={settings.namaDesa} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode Desa</label>
              <input name="kodeDesa" defaultValue={settings.kodeDesa} required className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
              <input name="alamat" defaultValue={settings.alamat} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telepon</label>
              <input name="telepon" defaultValue={settings.telepon} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Fax</label>
              <input name="fax" defaultValue={settings.fax} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input name="email" type="email" defaultValue={settings.email} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
              <input name="website" defaultValue={settings.website} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kecamatan</label>
              <input name="kecamatan" defaultValue={settings.kecamatan} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kabupaten</label>
              <input name="kabupaten" defaultValue={settings.kabupaten} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Provinsi</label>
              <input name="provinsi" defaultValue={settings.provinsi} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode Pos</label>
              <input name="kodePos" defaultValue={settings.kodePos} required className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-all"
            >
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
