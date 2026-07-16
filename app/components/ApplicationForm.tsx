'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createApplication } from '@/app/actions/applications';
import { ArrowLeft, Send, X } from 'lucide-react';
import Select from './Select';

interface ApplicationFormProps {
  type: 'SKU' | 'SKCK';
}

const inputClass = "w-full px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400";
const textareaClass = "w-full px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 resize-none";

const jenisKelaminOptions = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const agamaOptions = [
  { value: 'Islam', label: 'Islam' },
  { value: 'Kristen', label: 'Kristen' },
  { value: 'Katholik', label: 'Katholik' },
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Buddha', label: 'Buddha' },
  { value: 'Konghucu', label: 'Konghucu' },
];

const warganegaraanOptions = [
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Asing', label: 'Asing' },
];

export default function ApplicationForm({ type }: ApplicationFormProps) {
  const [state, action, pending] = useActionState(createApplication, undefined);
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [agama, setAgama] = useState('');
  const [warganegaraan, setWarganegaraan] = useState('Indonesia');

  return (
    <div className="w-full max-w-none mx-auto">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>
      </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h1 className="text-lg font-bold text-gray-900 mb-4">
            Pengajuan {type === 'SKU' ? 'Surat Keterangan Usaha (SKU)' : 'Surat Pengantar SKCK'}
          </h1>

        <form action={action} className="space-y-3">
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="jenisKelamin" value={jenisKelamin} />
          <input type="hidden" name="agama" value={agama} />
          <input type="hidden" name="warganegaraan" value={warganegaraan} />

          <section>
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Data Diri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input name="nama" required className={inputClass} placeholder="Masukkan nama lengkap" />
                {state?.errors?.nama && <p className="text-red-500 text-xs mt-1.5">{state.errors.nama[0]}</p>}
              </div>
              <Select
                label="Jenis Kelamin"
                name="jenisKelaminDisplay"
                value={jenisKelamin}
                onChange={setJenisKelamin}
                options={jenisKelaminOptions}
                placeholder="Pilih jenis kelamin..."
                error={state?.errors?.jenisKelamin?.[0]}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                <input name="tempatLahir" required className={inputClass} placeholder="Kota kelahiran" />
                {state?.errors?.tempatLahir && <p className="text-red-500 text-xs mt-1.5">{state.errors.tempatLahir[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input name="tanggalLahir" type="date" required className={inputClass} />
                {state?.errors?.tanggalLahir && <p className="text-red-500 text-xs mt-1.5">{state.errors.tanggalLahir[0]}</p>}
              </div>
              <Select
                label="Warganegaraan"
                name="warganegaraanDisplay"
                value={warganegaraan}
                onChange={setWarganegaraan}
                options={warganegaraanOptions}
                placeholder="Pilih warganegaraan..."
                error={state?.errors?.warganegaraan?.[0]}
              />
              <Select
                label="Agama"
                name="agamaDisplay"
                value={agama}
                onChange={setAgama}
                options={agamaOptions}
                placeholder="Pilih agama..."
                error={state?.errors?.agama?.[0]}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                <input name="pekerjaan" required className={inputClass} placeholder="Pekerjaan saat ini" />
                {state?.errors?.pekerjaan && <p className="text-red-500 text-xs mt-1.5">{state.errors.pekerjaan[0]}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat (Jalan/Dusun)</label>
                <input name="alamat" required className={inputClass} placeholder="Alamat lengkap" />
                {state?.errors?.alamat && <p className="text-red-500 text-xs mt-1.5">{state.errors.alamat[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RT</label>
                <input name="rt" required className={inputClass} placeholder="001" />
                {state?.errors?.rt && <p className="text-red-500 text-xs mt-1.5">{state.errors.rt[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RW</label>
                <input name="rw" required className={inputClass} placeholder="001" />
                {state?.errors?.rw && <p className="text-red-500 text-xs mt-1.5">{state.errors.rw[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desa</label>
                <input name="desa" defaultValue="Wonokerto" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                <input name="kecamatan" defaultValue="Wonogiri" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kabupaten</label>
                <input name="kabupaten" defaultValue="Wonogiri" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                <input name="provinsi" defaultValue="Jawa Tengah" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <input name="nik" required maxLength={20} className={inputClass} placeholder="16 digit NIK" />
                {state?.errors?.nik && <p className="text-red-500 text-xs mt-1.5">{state.errors.nik[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. KK</label>
                <input name="kk" required className={inputClass} placeholder="Nomor Kartu Keluarga" />
                {state?.errors?.kk && <p className="text-red-500 text-xs mt-1.5">{state.errors.kk[0]}</p>}
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-gray-100">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Keperluan & Keterangan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keperluan</label>
                <textarea
                  name="keperluan"
                  required
                  rows={3}
                  placeholder={type === 'SKU' ? 'Contoh: Surat Keterangan Usaha untuk Kredit di BRI' : 'Contoh: Surat Pengantar untuk membuat SKCK'}
                  className={textareaClass}
                />
                {state?.errors?.keperluan && <p className="text-red-500 text-xs mt-1.5">{state.errors.keperluan[0]}</p>}
              </div>

              {type === 'SKU' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detail Usaha</label>
                  <textarea
                    name="detailUsaha"
                    rows={2}
                    placeholder="Contoh: Warung sembako, Ternak sapi, Toko online, dll."
                    className={textareaClass}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan Lain (opsional)</label>
                <textarea
                  name="keteranganLain"
                  rows={2}
                  placeholder="Tambahan keterangan jika diperlukan"
                  className={textareaClass}
                />
              </div>
            </div>
          </section>

          {state?.message && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{state.message}</p>
          )}

          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <Send size={18} /> {pending ? 'Mengirim...' : 'Ajukan Surat'}
            </motion.button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
            >
              <X size={18} /> Batal
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
