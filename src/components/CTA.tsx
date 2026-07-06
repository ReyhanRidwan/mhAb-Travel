import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface CTAProps {
  onContactClick: () => void;
}

export default function CTA({ onContactClick }: CTAProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-stone-950 text-white px-6">
      {/* Background Image of Mount Bromo at Sunset */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=1200&q=80"
          alt="Sunset over Mount Bromo"
          className="w-full h-full object-cover filter brightness-[0.3] scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft dark visual filters */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 font-extrabold px-4 py-1.5 rounded-full border border-amber-500/30 text-xs uppercase tracking-widest"
        >
          <Sparkles size={12} /> Amankan Seat Liburanmu Sekarang
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight leading-tight"
        >
          Tunggu apalagi? Hubungi <br /> Kami Sekarang Juga!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Jangan tunda lagi. Setiap hari yang kamu tunda adalah satu hari pengalaman seru yang hilang. Konsultasikan itinerary impianmu gratis bersama kami.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
        >
          <button
            id="cta-booking-trigger"
            onClick={onContactClick}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider group"
          >
            Hubungi Kami
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            id="cta-whatsapp-link"
            href="https://wa.me/6281385926888?text=Halo%20mhAb%20Travel%2C%20saya%20tertarik%20untuk%20booking%20paket%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-white/20 hover:border-amber-500 hover:bg-amber-500/10 text-white hover:text-amber-400 font-extrabold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider"
          >
            <MessageSquare size={18} /> Chat WhatsApp Agency
          </a>
        </motion.div>
      </div>
    </section>
  );
}
