import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Sun, CloudSun, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
  onBookThis: (packageId?: string) => void;
}

export default function DestinationDetailModal({ isOpen, onClose, destination, onBookThis }: DestinationDetailModalProps) {
  if (!isOpen || !destination) return null;

  // Find a matching package ID for direct booking redirection
  const getPackageIdForDest = (id: string): string => {
    if (id === 'raja-ampat') return 'raja-ampat-exclusive';
    if (id === 'labuan-bajo') return 'labuan-bajo-tour';
    if (id === 'gunung-bromo') return 'bromo-tour';
    if (id === 'tokyo-kyoto') return 'japan-exclusive';
    if (id === 'swiss-alps') return 'swiss-exclusive';
    if (id === 'cappadocia') return 'turkey-exclusive';
    return 'bromo-tour'; // fallback
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl overflow-hidden bg-white rounded-3xl shadow-2xl flex flex-col border border-stone-100"
        >
          {/* Close button */}
          <button 
            id="close-dest-detail-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-stone-600 hover:text-stone-900 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
          >
            <X size={20} />
          </button>

          {/* Large Hero Image of Destination */}
          <div className="h-64 sm:h-80 w-full relative">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            
            {/* Title & Badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-amber-500 text-stone-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1 mb-2 shadow-sm">
                <MapPin size={10} /> Destinasi Terpopuler
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">{destination.name}</h3>
            </div>
          </div>

          {/* Destination Details Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[50vh]">
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Tentang Destinasi</h4>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">{destination.description}</p>
            </div>

            {/* Grid of travel info (Weather, Best Time, Duration) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                <Sun className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h5 className="text-xs font-bold text-stone-700 uppercase">Perkiraan Cuaca</h5>
                  <p className="text-stone-600 text-xs mt-0.5 leading-normal">{destination.weather}</p>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-start gap-3">
                <Calendar className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h5 className="text-xs font-bold text-stone-700 uppercase">Waktu Terbaik</h5>
                  <p className="text-stone-600 text-xs mt-0.5 leading-normal">{destination.bestTime}</p>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-start gap-3">
                <Clock className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h5 className="text-xs font-bold text-stone-700 uppercase">Durasi Kunjungan</h5>
                  <p className="text-stone-600 text-xs mt-0.5 leading-normal">{destination.duration}</p>
                </div>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">Spot Wajib Kunjungan</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((spot, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-stone-50 border border-stone-100 py-2.5 px-3.5 rounded-xl text-stone-700 text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="font-semibold leading-tight">{spot}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs text-stone-400 font-medium">Tertarik menjelajahi {destination.name}?</p>
              <p className="text-sm font-semibold text-stone-800 leading-normal">Kami siap mengatur transportasi & tiket masuk all-in.</p>
            </div>
            <button
              id="book-direct-destination"
              onClick={() => {
                onClose();
                onBookThis(getPackageIdForDest(destination.id));
              }}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group shrink-0"
            >
              Booking Paket Sekarang
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
