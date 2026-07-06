import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, MessageCircleCode } from 'lucide-react';

interface AboutProps {
  onLearnMoreClick: () => void;
}

export default function About({ onLearnMoreClick }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-white px-6 border-y border-stone-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Images Grid/Collage */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4">
          {/* Main Large Image (Couple Swing) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-8 overflow-hidden rounded-3xl shadow-lg relative aspect-[3/4]"
          >
            <img
              src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783259686/52e43830-db53-4994-bcdc-5f89d5ab2d81.png"
              alt="Scenic swing overlooking the tropical jungle in Bali"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
          </motion.div>

          {/* Right Two Smaller Images stacked */}
          <div className="col-span-4 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="overflow-hidden rounded-2xl shadow-md relative aspect-square"
            >
              <img
                src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png"
                alt="Happy group of travelers posing in Bali"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="overflow-hidden rounded-2xl shadow-md relative aspect-[4/5] flex-1"
            >
              <img
                src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783325638/f3a50332-0cc1-430b-93d3-e6dd79a34527.png"
                alt="Tourists riding an ATV in Bali jungle track"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Right Side: Copywriting Content */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="space-y-3">
            <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs font-mono flex items-center gap-2">
              <Sparkles size={14} /> Teman Perjalanan Terbaik Anda
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-stone-900 leading-tight">
              Kami Bukan Sekadar Travel Agent — <span className="text-amber-700 italic font-normal">Kami Teman Perjalanan Kamu</span>
            </h2>
          </div>

          <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            <p>
              Di <strong>mhAb Travel</strong>, kami percaya liburan yang baik bukan soal seberapa banyak tempat yang dikunjungi — tapi seberapa dalam Anda merasakannya. Makanya setiap trip yang kami rancang selalu personal, selalu thoughtful, dan selalu ada sentuhan layanan terbaik yang tak bisa Anda dapatkan dari travel agent biasa.
            </p>
            <p className="border-l-4 border-amber-500 pl-4 py-1.5 bg-stone-50/70 text-stone-700 font-medium rounded-r-xl">
              "Kami adalah tim profesional yang telah berpengalaman mendampingi ribuan pelancong menjelajahi indahnya kepulauan Indonesia hingga keunikan destinasi mancanegara dengan kenyamanan maksimal."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="about-cta-button"
              onClick={onLearnMoreClick}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg hover:shadow-amber-500/10 active:scale-95 transition-all text-sm uppercase tracking-wider text-center"
            >
              Lihat Selengkapnya →
            </button>
            
            <a
              id="free-consultation-whatsapp"
              href="https://wa.me/6281385926888?text=Halo%20mhAb%20Travel%2C%20saya%20ingin%20tanya-tanya%20mengenai%20paket%20trip%20wisata."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-200 hover:border-amber-500 bg-white hover:bg-amber-50 text-stone-800 hover:text-amber-800 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              Konsultasi Rute Gratis
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
