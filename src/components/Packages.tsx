import React from 'react';
import { motion } from 'motion/react';
import { TOUR_PACKAGES } from '../data';
import { TourPackage } from '../types';
import { Check, Star, ArrowRight, Car, ShieldAlert, Heart } from 'lucide-react';

interface PackagesProps {
  onBookPackage: (packageId: string) => void;
}

export default function Packages({ onBookPackage }: PackagesProps) {
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const getCategoryPackages = (cat: 'harian' | 'exclusive' | 'study_tour' | 'company_trip' | 'mobil') => {
    return TOUR_PACKAGES.filter((pkg) => pkg.category === cat);
  };

  const categories = [
    {
      id: 'harian' as const,
      title: 'Open Trip',
      desc: 'Gabung seru dengan traveler lain! Hemat, praktis, dan penuh teman baru untuk petualangan Anda.',
      bgColor: 'bg-stone-50 border-stone-200'
    },
    {
      id: 'exclusive' as const,
      title: 'Private Trip',
      desc: 'Eksklusif hanya untuk grup atau keluarga Anda. Bebas tentukan waktu dan nikmati kenyamanan privat maksimal.',
      bgColor: 'bg-stone-50 border-stone-200'
    },
    {
      id: 'study_tour' as const,
      title: 'Study Tour',
      desc: 'Petualangan edukatif interaktif untuk pelajar dan mahasiswa. Kombinasi belajar, riset lapangan, dan rekreasi seru.',
      bgColor: 'bg-stone-50 border-stone-200'
    },
    {
      id: 'company_trip' as const,
      title: 'Company Trip',
      desc: 'Meningkatkan sinergi dan kebersamaan tim kerja Anda dengan paket outing, gathering, dan team-building profesional.',
      bgColor: 'bg-stone-50 border-stone-200'
    },
    {
      id: 'mobil' as const,
      title: 'Sewa Mobil Harian',
      desc: 'Tipe traveler yang suka explore sendiri tanpa terikat itinerary? Kami juga siapkan untukmu.',
      bgColor: 'bg-stone-50 border-stone-200'
    }
  ];

  return (
    <section id="packages" className="py-20 md:py-28 bg-stone-50 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs font-mono">Pilihan Trip Terbaik</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-stone-900 leading-tight">
            Booking Paket Liburan mhAb Travel!
          </h2>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Mau petualangan seru open trip, perjalanan mewah privat eksklusif, atau sewa armada premium lepas kunci harian? Kami siapkan seluruh pilihan terbaik untuk Anda!
          </p>
        </div>

        {/* Categories Rows */}
        {categories.map((catInfo, catIdx) => {
          const items = getCategoryPackages(catInfo.id);

          return (
            <div key={catInfo.id} className="space-y-6">
              {/* Category Title bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Kategori 0{catIdx + 1}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-800">{catInfo.title}</h3>
                <div className="flex-1 h-[1px] bg-stone-200" />
              </div>

              {/* Grid of 4 cards: 3 product cards, 1 custom teaser card */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((pkg, itemIdx) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: itemIdx * 0.1 }}
                    className="bg-white rounded-3xl border border-stone-100 shadow-xs hover:shadow-lg hover:border-stone-200 overflow-hidden flex flex-col justify-between transition-all duration-300"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="aspect-[4/3] w-full overflow-hidden relative group">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                          {pkg.duration}
                        </div>
                        {pkg.rating >= 4.9 && (
                          <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                            <Star size={10} className="fill-stone-950" /> BEST
                          </div>
                        )}
                      </div>

                      {/* Info body */}
                      <div className="p-5 space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-stone-900 leading-tight text-base sm:text-lg min-h-[44px] flex items-center">
                            {pkg.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-amber-600 text-xs font-bold">★ {pkg.rating.toFixed(1)}</span>
                            <span className="text-[10px] text-stone-400 font-semibold">(Verified Review)</span>
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="bg-stone-50/70 p-3 rounded-2xl border border-stone-100 flex justify-between items-center">
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-bold block leading-none mb-1">Mulai Dari</span>
                            <span className="text-stone-800 font-extrabold text-sm sm:text-base">{formatPrice(pkg.price)}</span>
                          </div>
                          <span className="text-[10px] text-stone-500 font-semibold bg-stone-100 px-2 py-1 rounded-md">
                            {pkg.category === 'mobil' ? 'Per Mobil' : '/pax'}
                          </span>
                        </div>

                        {/* Details checklist */}
                        <ul className="text-stone-600 text-xs space-y-1.5 pt-2 border-t border-stone-100">
                          {pkg.details.slice(0, 3).map((det, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5 leading-tight">
                              <Check size={12} className="text-amber-600 mt-0.5 shrink-0" />
                              <span className="line-clamp-1">{det}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Booking Trigger */}
                    <div className="p-5 pt-0">
                      <button
                        id={`book-pkg-${pkg.id}`}
                        onClick={() => onBookPackage(pkg.id)}
                        className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all text-center block"
                      >
                        Booking Now
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Rightmost 4th column Card: Teaser / Description Category card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-stone-100 rounded-3xl border border-stone-200/60 p-6 flex flex-col justify-between items-start text-left min-h-[350px] relative overflow-hidden group"
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />

                  <div className="space-y-4 z-10">
                    <span className="text-[10px] bg-amber-500 text-stone-950 font-extrabold px-3 py-1 rounded-md uppercase tracking-widest">
                      Koleksi Pilihan
                    </span>
                    <h4 className="text-2xl font-serif font-extrabold text-stone-950 leading-tight">
                      {catInfo.title}
                    </h4>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                      {catInfo.desc}
                    </p>
                  </div>

                  <button
                    id={`see-all-${catInfo.id}`}
                    onClick={() => onBookPackage('')}
                    className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group z-10"
                  >
                    Lihat Semua
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
