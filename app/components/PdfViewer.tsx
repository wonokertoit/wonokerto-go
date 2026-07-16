'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PdfData, SettingsData } from './PdfDocument';

const PdfClient = dynamic(() => import('./PdfDocumentClient'), { ssr: false });

interface Props {
  data: PdfData;
  settings: SettingsData;
}

export default function PdfViewer({ data, settings }: Props) {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden h-[700px]">
        <Suspense fallback={<div className="flex items-center justify-center h-full">Memuat PDF...</div>}>
          <PdfClient data={data} settings={settings} viewMode="viewer" />
        </Suspense>
      </div>
      <div className="flex justify-center">
        <Suspense fallback={<span>Memuat...</span>}>
          <PdfClient data={data} settings={settings} viewMode="download" />
        </Suspense>
      </div>
    </div>
  );
}
