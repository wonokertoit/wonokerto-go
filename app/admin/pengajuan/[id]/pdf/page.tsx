import { getApplicationById } from '@/app/actions/applications';
import { getSettings } from '@/app/actions/applications';
import { notFound } from 'next/navigation';
import PdfViewer from '@/app/components/PdfViewer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PdfPage({ params }: PageProps) {
  const { id } = await params;
  const [app, settings] = await Promise.all([
    getApplicationById(id),
    getSettings(),
  ]);

  if (!app || !settings) {
    notFound();
  }

  const pdfData = {
    type: app.type,
    nomorSurat: app.nomorSurat,
    nama: app.nama,
    jenisKelamin: app.jenisKelamin,
    tempatLahir: app.tempatLahir,
    tanggalLahir: app.tanggalLahir,
    warganegaraan: app.warganegaraan,
    agama: app.agama,
    pekerjaan: app.pekerjaan,
    alamat: app.alamat,
    rt: app.rt,
    rw: app.rw,
    desa: app.desa,
    kecamatan: app.kecamatan,
    kabupaten: app.kabupaten,
    provinsi: app.provinsi,
    nik: app.nik,
    kk: app.kk,
    keperluan: app.keperluan,
    detailUsaha: app.detailUsaha,
    keteranganLain: app.keteranganLain,
    tanggalPengajuan: app.tanggalPengajuan,
    tanggalBerlakuMulai: app.tanggalBerlakuMulai,
    tanggalBerlakuSampai: app.tanggalBerlakuSampai,
  };

  const pdfSettings = {
    ...settings,
    logoUrl: settings.logoUrl || '/Logo%20wonogiti.png',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4 text-center">
        Preview {app.type === 'SKU' ? 'Surat Keterangan Usaha' : 'Surat Pengantar SKCK'}
      </h1>
      <PdfViewer data={pdfData} settings={pdfSettings} />
    </div>
  );
}
