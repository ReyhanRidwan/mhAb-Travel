import React from 'react';
import { motion } from 'motion/react';
import { Compass, Coins, Heart, CheckCircle2, UserCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const sellingPoints = [
    {
      title: 'Guide Profesional Berlisensi',
      desc: 'Guide lokal kami adalah putra daerah asli berlisensi resmi yang sangat paham destinasi pilihan Anda luar-dalam. Anda mendapat cerita otentik, bukan sekadar rute.',
      icon: UserCheck
    },
    {
      title: 'Harga Transparan',
      desc: 'Yang Anda bayar adalah yang Anda dapatkan. Kami percaya liburan menyenangkan dimulai dari kejujuran tanpa biaya siluman.',
      icon: Coins
    },
    {
      title: 'Fleksibel Sesuai Keinginan',
      desc: 'Mau trip santai keluarga, petualangan seru rombongan kantor, atau honeymoon romantis? Kami kustomisasi penuh sesuai keinginan Anda.',
      icon: Heart
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Images Grid/Collage */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4 h-full">
          {/* Top Row: Two equal width images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-6 overflow-hidden rounded-2xl shadow-md aspect-video"
          >
            <img
              src="/images/wedding_car_1782818377689.jpg"
              alt="Premium black wedding car with flower decorations in Bali"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="col-span-6 overflow-hidden rounded-2xl shadow-md aspect-video"
          >
            <img
              src="/images/bali_friends_1782818331133.jpg"
              alt="Happy tourists group in Bali"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Bottom Row: Full span height image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-12 overflow-hidden rounded-3xl shadow-lg aspect-[16/10]"
          >
            <img
              src="/images/atv_1782818283610.jpg"
              alt="Adventure ATV jungle ride in Bali"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Key Value Propositions */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs font-mono block">Keunggulan Layanan</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-stone-900 leading-tight">
              Kenapa Harus Pilih <br className="hidden sm:inline" /> mhAb Travel?
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              Kami bukan sekadar travel agent biasa dengan rencana perjalanan kaku. Kami adalah sahabat perjalanan Anda — merancang opsi kuliner otentik tersembunyi, mengurus seluruh kenyamanan transportasi, dan memastikan petualangan impian Anda berjalan sempurna tanpa hambatan.
            </p>
          </div>

          {/* Point Items list */}
          <div className="space-y-4">
            {sellingPoints.map((point, idx) => {
              const IconComp = point.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
                    <IconComp size={24} className="stroke-[2]" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-tight">{point.title}</h4>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{point.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
