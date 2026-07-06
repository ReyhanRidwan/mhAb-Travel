import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80',
    caption: 'Keindahan pulau karang tropis Raja Ampat'
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Pagoda megah dengan latar Gunung Fuji, Jepang'
  },
  {
    url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sunrise emas di Gunung Bromo yang mistis'
  },
  {
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Lanskap danau zamrud & salju abadi Alpen Swiss'
  },
  {
    url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Balon udara menghiasi langit Cappadocia, Turki'
  }
];

const DEST_WORDS = [
  { text: 'Indonesia', colorClass: 'from-emerald-400 via-teal-300 to-emerald-500' },
  { text: 'Dunia', colorClass: 'from-amber-400 via-orange-300 to-amber-500' }
];

export default function Hero({ onExploreClick }: HeroProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [destIdx, setDestIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // changes every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const destTimer = setInterval(() => {
      setDestIdx((prev) => (prev + 1) % DEST_WORDS.length);
    }, 3000); // changes text every 3 seconds
    return () => clearInterval(destTimer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-stone-950 text-white overflow-hidden pt-24 pb-16 px-6"
    >
      {/* Background Image Slider with Motion Cross-fade & Zoom */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={HERO_IMAGES[currentIdx].url}
            alt={HERO_IMAGES[currentIdx].caption}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.75, scale: 1.02 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="w-full h-full object-cover filter brightness-[0.7] select-none absolute inset-0"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        {/* Soft Radial and Linear Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/20" />
        <div className="absolute inset-0 bg-stone-950/30 backdrop-xs" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
        {/* Badge Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-semibold text-amber-400 tracking-wider uppercase shadow-lg shadow-black/10"
        >
          <Compass size={14} className="animate-spin-slow text-amber-400" />
          Travel Agency Indonesia & Internasional Terlengkap & Terpercaya
        </motion.div>

        {/* Main Big Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-md"
        >
          Jelajahi Keindahan{' '}
          <span className="relative inline-block min-w-[190px] sm:min-w-[280px] text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={destIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r ${DEST_WORDS[destIdx].colorClass}`}
              >
                {DEST_WORDS[destIdx].text}
              </motion.span>
            </AnimatePresence>
            <span className="opacity-0">Indonesia</span>
          </span>{' '}
          Bersama mhAb Travel
        </motion.h1>

        {/* Description Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-stone-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm"
        >
          Kami siap mendampingi Anda mengeksplorasi keindahan nusantara Indonesia hingga penjuru dunia dengan pelayanan VIP, armada prima, dan harga terbaik.
        </motion.p>

        {/* Buttons and Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
        >
          <button
            id="hero-explore-button"
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base group font-sans uppercase tracking-wider cursor-pointer"
          >
            Lihat Paket Tour Kami
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>

        {/* Trust Factors Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-10 md:pt-16 border-t border-white/10"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-400">14K+</span>
            <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-bold tracking-widest">Happy Travelers</span>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-400">12+ Tahun</span>
            <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-bold tracking-widest">Pengalaman Lokal</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-400">4.9★</span>
            <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-bold tracking-widest">Google Rating</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave Svg divider for transitions */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none fill-stone-50 overflow-hidden">
        <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
