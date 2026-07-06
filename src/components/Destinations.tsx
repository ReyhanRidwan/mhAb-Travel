import React from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../data';
import { Destination } from '../types';
import { Eye, ArrowUpRight } from 'lucide-react';

interface DestinationsProps {
  onSelectDestination: (dest: Destination) => void;
}

export default function Destinations({ onSelectDestination }: DestinationsProps) {
  // Bento Grid size mapping for tablet and desktop (perfectly filled, no gaps)
  const bentoClasses = [
    'lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2', // Nusa Penida: large focal point
    'lg:col-span-1 lg:row-span-1 md:col-span-1 md:row-span-1', // Nusa Dua: square
    'lg:col-span-1 lg:row-span-1 md:col-span-1 md:row-span-1', // Bedugul: square
    'lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2', // Handara Gate: tall portrait
    'lg:col-span-2 lg:row-span-1 md:col-span-1 md:row-span-1', // Uluwatu: wide landscape
    'lg:col-span-2 lg:row-span-1 md:col-span-1 md:row-span-1', // GWK: wide landscape
  ];

  return (
    <section id="destinations" className="py-20 md:py-28 bg-stone-50 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs font-mono">Destinasi Pilihan Terbaik</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-stone-900 leading-tight">
            Surga Dunia Itu Nyata. <br className="hidden sm:inline" /> Dan Itu Adalah <span className="italic font-normal font-serif text-amber-700">Indonesia & Dunia</span>
          </h2>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Dari keindahan alam Nusantara yang magis hingga landmark ikonik perkotaan di berbagai belahan dunia. Temukan destinasi liburan impian terbaik Anda yang telah kami rancang secara sempurna di bawah ini.
          </p>
        </div>

        {/* Bento Grid Layout of Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => onSelectDestination(dest)}
              className={`group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl border border-stone-100 hover:border-stone-200 transition-all duration-500 flex flex-col relative h-[250px] md:h-full ${bentoClasses[idx] || ''}`}
            >
              {/* Image Container with Zoom */}
              <div className="absolute inset-0 z-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Visual Dark Overlay (Gets slightly darker on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/20 group-hover:from-stone-950/95 group-hover:via-stone-950/50 transition-all duration-300" />
              </div>

              {/* Card Content & Badge */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8 space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] bg-amber-500/95 text-stone-950 font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest block w-max mb-2 shadow-md">
                      Eksotis
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white tracking-tight drop-shadow-sm">
                      {dest.name}
                    </h3>
                  </div>
                  
                  {/* Circular Interaction Indicator */}
                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-amber-500 text-white group-hover:text-stone-950 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:border-transparent transition-all duration-300 shadow-sm shrink-0">
                    <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                  </div>
                </div>

                {/* Short description hidden/revealed beautifully */}
                <p className="text-stone-300 text-xs leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 group-hover:text-stone-100 transition-all duration-300">
                  {dest.description}
                </p>

                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-amber-400 font-extrabold uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                  <Eye size={12} />
                  Info Selengkapnya
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
