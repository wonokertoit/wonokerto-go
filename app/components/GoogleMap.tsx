'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertCircle } from 'lucide-react';
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
} from '@/components/ui/map';

interface VillageMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

const DEFAULT_CENTER = { lat: -7.8233, lng: 110.9317 }; // Wonokerto, Wonogiri
const DEFAULT_ZOOM = 15;

export default function VillageMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = '400px',
}: VillageMapProps) {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-sm relative"
      style={{ height }}
    >
      <Map
        center={[center.lng, center.lat]}
        zoom={zoom}
        className="h-full w-full"
      >
        <MapMarker
          longitude={center.lng}
          latitude={center.lat}
          onClick={() => setPopupOpen((open) => !open)}
        >
          <MarkerContent>
            <div className="relative flex flex-col items-center">
              <div className="bg-[#57534e] text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <MapPin size={14} />
                Desa Wonokerto
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#57534e]" />
            </div>
          </MarkerContent>
          {popupOpen && (
            <MarkerPopup closeButton>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#1c1917]">Desa Wonokerto</p>
                <p className="text-xs text-[#78716c]">Kecamatan Wonogiri</p>
                <p className="text-xs text-[#78716c]">Kabupaten Wonogiri, Jawa Tengah</p>
                <p className="text-[10px] text-[#a8a29e] mt-1">
                  {center.lat.toFixed(4)}°, {center.lng.toFixed(4)}°
                </p>
              </div>
            </MarkerPopup>
          )}
        </MapMarker>

        <MapControls
          position="bottom-right"
          showZoom
          showFullscreen
        />
      </Map>
    </motion.div>
  );
}
