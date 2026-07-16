'use client';

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { SuratContent, PdfData, SettingsData } from './PdfDocument';

interface Props {
  data: PdfData;
  settings: SettingsData;
  viewMode: 'viewer' | 'download';
}

export default function PdfDocumentClient({ data, settings, viewMode }: Props) {
  const isSKU = data.type === 'SKU';
  const fileName = `${isSKU ? 'SKU' : 'SKCK'}_${data.nama}_${data.nomorSurat || 'draft'}.pdf`;

  if (viewMode === 'viewer') {
    return (
      <PDFViewer width="100%" height="100%">
        <SuratContent data={data} settings={settings} />
      </PDFViewer>
    );
  }

  return (
    <PDFDownloadLink
      document={<SuratContent data={data} settings={settings} />}
      fileName={fileName}
      className="bg-[#57534e] text-white px-6 py-2 rounded-md hover:bg-[#44403c] inline-block"
    >
      {({ loading }) => (loading ? 'Memuat PDF...' : '📥 Download PDF')}
    </PDFDownloadLink>
  );
}
