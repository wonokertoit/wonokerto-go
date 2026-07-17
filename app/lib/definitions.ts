import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid." }).trim(),
  password: z.string().min(1, { message: "Password wajib diisi." }).trim(),
});

export const RegisterFormSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid." }).trim(),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter." })
    .trim(),
});

export const ApplicationFormSchema = z.object({
  type: z.enum(["SKU", "SKCK"]),
  nama: z.string().min(1, { message: "Nama wajib diisi." }).trim(),
  jenisKelamin: z.string().min(1, { message: "Jenis kelamin wajib dipilih." }),
  tempatLahir: z.string().min(1, { message: "Tempat lahir wajib diisi." }).trim(),
  tanggalLahir: z.string().min(1, { message: "Tanggal lahir wajib diisi." }),
  warganegaraan: z.string().min(1).default("Indonesia"),
  agama: z.string().min(1, { message: "Agama wajib diisi." }).trim(),
  pekerjaan: z.string().min(1, { message: "Pekerjaan wajib diisi." }).trim(),
  alamat: z.string().min(1, { message: "Alamat wajib diisi." }).trim(),
  rt: z.string().min(1, { message: "RT wajib diisi." }).trim(),
  rw: z.string().min(1, { message: "RW wajib diisi." }).trim(),
  desa: z.string().min(1, { message: "Desa wajib diisi." }).trim(),
  kecamatan: z.string().min(1, { message: "Kecamatan wajib diisi." }).trim(),
  kabupaten: z.string().min(1, { message: "Kabupaten wajib diisi." }).trim(),
  provinsi: z.string().min(1, { message: "Provinsi wajib diisi." }).trim(),
  nik: z.string().length(16, { message: "NIK harus tepat 16 karakter." }).trim(),
  kk: z.string().length(16, { message: "No KK harus tepat 16 karakter." }).trim(),
  keperluan: z.string().min(1, { message: "Keperluan wajib diisi." }).trim(),
  detailUsaha: z.string().optional(),
  keteranganLain: z.string().optional(),
});

export const AduanFormSchema = z.object({
  nama: z.string().optional(),
  kategori: z.string().min(1, { message: "Kategori wajib dipilih." }),
  subjek: z.string().min(1, { message: "Subjek wajib diisi." }).trim(),
  pesan: z.string().min(1, { message: "Pesan wajib diisi." }).trim(),
});

export const SettingsFormSchema = z.object({
  namaKepalaDesa: z.string().min(1),
  kopSurat: z.string().min(1),
  jabatan: z.string().min(1),
  kodeDesa: z.string().min(1),
  namaDesa: z.string().min(1),
  alamat: z.string().min(1),
  telepon: z.string().min(1),
  fax: z.string().min(1),
  email: z.string().email(),
  website: z.string().min(1),
  kecamatan: z.string().min(1),
  kabupaten: z.string().min(1),
  provinsi: z.string().min(1),
  kodePos: z.string().min(1),
});

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;
