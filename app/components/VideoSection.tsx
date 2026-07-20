'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
  sortOrder: string;
  createdAt: Date | null;
}

export default function VideoSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const { getVideos } = await import('@/app/actions/videos');
        const data = await getVideos();
        setVideos(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section id="tutorial" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f4] rounded-full text-[#57534e] text-xs font-medium mb-4 border border-[#e7e5e4]">
            <Play size={14} />
            Video Tutorial
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1c1917] mb-3">Panduan Penggunaan SIDEWO</h2>
          <div className="animate-pulse max-w-3xl mx-auto aspect-video bg-[#e7e5e4] rounded-2xl"></div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section id="tutorial" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f4] rounded-full text-[#57534e] text-xs font-medium mb-4 border border-[#e7e5e4]">
            <Play size={14} />
            Video Tutorial
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1c1917] mb-3">Panduan Penggunaan SIDEWO</h2>
          <p className="text-[#78716c]">Belum ada video tutorial. Admin dapat menambahkan video dari dashboard.</p>
        </div>
      </section>
    );
  }

  // Ambil video pertama (tertinggi sortOrder)
  const featuredVideo = videos[0];

  return (
    <section id="tutorial" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f4] rounded-full text-[#57534e] text-xs font-medium mb-4 border border-[#e7e5e4]">
            <Play size={14} />
            Video Tutorial
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1c1917] mb-3">Panduan Penggunaan SIDEWO</h2>
          <p className="text-[#78716c] max-w-lg mx-auto">
            Pelajari cara menggunakan layanan SIDEWO dengan mudah melalui video tutorial berikut.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm overflow-hidden">
            <div className="relative aspect-video bg-[#1c1917]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-t-2xl"
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#fafaf9] flex items-center justify-center border border-[#e7e5e4]">
                  <Play size={20} className="text-[#57534e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1917]">{featuredVideo.title}</h3>
                  <span className="text-xs text-[#a8a29e] bg-[#f5f5f4] px-2 py-0.5 rounded-full">Video Tutorial</span>
                </div>
              </div>
              {featuredVideo.description && (
                <p className="text-sm text-[#78716c] leading-relaxed">{featuredVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
