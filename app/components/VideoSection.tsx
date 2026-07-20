'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
  sortOrder: string;
  createdAt: Date | null;
}

function getYoutubeThumbnail(id: string, quality: 'default' | 'mqdefault' | 'hqdefault' = 'mqdefault') {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function VideoSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [[page, direction], setPage] = useState([0, 0]);
  const [showEmbed, setShowEmbed] = useState(false);

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

  const imageIndex = Math.abs(page % Math.max(videos.length, 1));
  const currentVideo = videos[imageIndex];

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = prev + newDirection;
        if (next < 0) return [videos.length - 1, newDirection];
        if (next >= videos.length) return [0, newDirection];
        return [next, newDirection];
      });
      setShowEmbed(false);
    },
    [videos.length]
  );

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

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.75,
      rotateY: dir > 0 ? 25 : -25,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 10,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.75,
      rotateY: dir > 0 ? -25 : 25,
      zIndex: 0,
    }),
  };

  return (
    <section id="tutorial" className="py-20 bg-white overflow-hidden">
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

        {/* 3D Carousel */}
        <div className="relative flex items-center justify-center h-[340px] sm:h-[400px] lg:h-[460px]"
          style={{ perspective: 1200 }}
        >
          {/* Prev Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-8 lg:left-16 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-[#e7e5e4] flex items-center justify-center text-[#57534e] hover:bg-[#fafaf9] transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-8 lg:right-16 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-[#e7e5e4] flex items-center justify-center text-[#57534e] hover:bg-[#fafaf9] transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Cards */}
          <div className="relative w-full max-w-3xl flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                  rotateY: { duration: 0.35 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-[80%] sm:w-[65%] lg:w-[55%] aspect-video rounded-2xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Thumbnail or Embed */}
                {!showEmbed ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={getYoutubeThumbnail(currentVideo.youtubeId, 'hqdefault')}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    
                    {/* Play button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowEmbed(true)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Play size={28} className="text-[#dc2626] ml-1" fill="#dc2626" />
                      </div>
                    </motion.button>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-[#1c1917]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
                      title={currentVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <button
                      onClick={() => setShowEmbed(false)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center mt-6 max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo?.id || 'empty'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-semibold text-[#1c1917] text-lg mb-2">{currentVideo?.title}</h3>
              {currentVideo?.description && (
                <p className="text-sm text-[#78716c] leading-relaxed">{currentVideo.description}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {videos.map((video, idx) => (
            <button
              key={video.id}
              onClick={() => {
                setPage(([prev]) => [idx, idx > prev ? 1 : -1]);
                setShowEmbed(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === imageIndex
                  ? 'bg-[#57534e] w-6'
                  : 'bg-[#d6d3d1] hover:bg-[#a8a29e]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
