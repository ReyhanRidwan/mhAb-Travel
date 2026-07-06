/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import About from './components/About';
import Packages from './components/Packages';
import WhyChooseUs from './components/WhyChooseUs';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import DestinationDetailModal from './components/DestinationDetailModal';
import InteractiveAssistant from './components/InteractiveAssistant';
import { Destination } from './types';
import { TOUR_PACKAGES, REVIEWS } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  CheckCircle, 
  Phone, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Users, 
  Heart, 
  TrendingUp, 
  Award 
} from 'lucide-react';

type PageView = 'home' | 'about' | 'packages' | 'why';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDestDetailOpen, setIsDestDetailOpen] = useState(false);

  // States for Expanded Packages Page
  const [packageSearch, setPackageSearch] = useState('');
  const [packageFilter, setPackageFilter] = useState<'all' | 'harian' | 'exclusive' | 'study_tour' | 'company_trip' | 'mobil'>('all');

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Smooth scroll and routing helper
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero' || sectionId === 'home') {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'about') {
      setActivePage('about');
      window.scrollTo({ top: 0 });
    } else if (sectionId === 'packages') {
      setActivePage('packages');
      window.scrollTo({ top: 0 });
    } else if (sectionId === 'why-choose-us' || sectionId === 'why') {
      setActivePage('why');
      window.scrollTo({ top: 0 });
    } else {
      // Anchoring elements on homepage
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const handleOpenBooking = (packageId: string = '') => {
    setSelectedPackageId(packageId);
    setIsBookingOpen(true);
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsDestDetailOpen(true);
  };

  // Filtering logic for the expanded packages page
  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(packageSearch.toLowerCase()) || 
                          pkg.details.some(det => det.toLowerCase().includes(packageSearch.toLowerCase()));
    const matchesCategory = packageFilter === 'all' || pkg.category === packageFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-500 selection:text-stone-950 flex flex-col justify-between">
      {/* Navigation Header */}
      <Header 
        onOpenBooking={() => handleOpenBooking('')} 
        onNavigate={handleNavigate} 
        activePage={activePage}
      />

      {/* Main Pages with AnimatePresence Page Transition Effects */}
      <main className={`flex-grow ${activePage === 'home' ? '' : 'pt-20'}`}>
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Banner with Auto-rotating Images */}
              <Hero onExploreClick={() => handleNavigate('packages')} />

              {/* Bento Grid Destinations Section */}
              <Destinations onSelectDestination={handleSelectDestination} />

              {/* About Us Teaser Section */}
              <About onLearnMoreClick={() => handleNavigate('about')} />

              {/* Packages Rows Section */}
              <Packages onBookPackage={handleOpenBooking} />

              {/* Why Choose Us Highlight Grid */}
              <WhyChooseUs />

              {/* Direct Booking Call to Action */}
              <CTA onContactClick={() => handleOpenBooking('')} />
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white"
            >
              {/* Hero Banner Header */}
              <div className="relative py-24 bg-stone-950 text-white text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                  <img 
                    src="/images/swing_1782818270952.jpg" 
                    alt="Swing Bali" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-950/80" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                  <span className="text-amber-500 text-xs font-mono uppercase tracking-widest font-extrabold">Tentang Kami</span>
                  <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight">Kisah Perjalanan Kami</h1>
                  <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    Mengenal mhAb Travel, teman perjalanan terpercaya yang telah menemani ribuan traveler mewujudkan mimpi liburan terbaik di seluruh Indonesia dan mancanegara sejak tahun 2012.
                  </p>
                  <button 
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors pt-4"
                  >
                    <ArrowLeft size={14} /> Kembali ke Beranda
                  </button>
                </div>
              </div>

              {/* Deep About Content */}
              <div className="py-20 max-w-7xl mx-auto px-6 space-y-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                      Berawal Dari Keinginan Memperkenalkan Keindahan Nusantara & Dunia
                    </h2>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                      mhAb Travel didirikan pada tahun 2012 oleh sekelompok pemandu wisata profesional berpengalaman rute domestik dan mancanegara. Kami melihat banyak wisatawan yang mendambakan perjalanan yang fleksibel, aman, dan otentik tanpa dibebani proses administrasi yang rumit, baik saat menjelajahi indahnya kepulauan Indonesia maupun eksotisme mancanegara.
                    </p>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                      Sejak itu, misi kami sangat sederhana: <strong>menjadi jembatan bagi Anda untuk merasakan keindahan destinasi murni.</strong> Kami menggabungkan pelayanan premium, armada transportasi yang prima, dan keramahan khas keluarga dalam setiap perjalanan yang kami rancang.
                    </p>
                    <div className="border-l-4 border-amber-500 pl-4 py-1.5 bg-stone-50 rounded-r-xl">
                      <p className="text-stone-800 font-medium italic text-sm">
                        "Bagi kami, setiap wisatawan adalah sahabat dekat yang harus pulang dengan senyuman paling bahagia di wajahnya."
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <img 
                        src="/images/hero_bali_1782818190522.jpg" 
                        alt="Kelingking Beach" 
                        className="rounded-2xl shadow-md h-48 sm:h-64 w-full object-cover"
                      />
                      <img 
                        src="/images/kintamani_1782818366002.jpg" 
                        alt="Kintamani Mountain" 
                        className="rounded-2xl shadow-md h-40 sm:h-48 w-full object-cover"
                      />
                    </div>
                    <div className="space-y-4 pt-8">
                      <img 
                        src="/images/bali_friends_1782818331133.jpg" 
                        alt="Happy Tourists" 
                        className="rounded-2xl shadow-md h-40 sm:h-48 w-full object-cover"
                      />
                      <img 
                        src="/images/atv_1782818283610.jpg" 
                        alt="ATV Adventure" 
                        className="rounded-2xl shadow-md h-48 sm:h-64 w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Milestones / Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-stone-50 rounded-3xl p-8 sm:p-12 text-center border border-stone-100">
                  <div className="space-y-2">
                    <span className="text-4xl sm:text-5xl font-serif font-extrabold text-amber-600 block">12+</span>
                    <span className="text-xs sm:text-sm text-stone-500 uppercase font-mono tracking-wider font-bold">Tahun Berkarya</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-4xl sm:text-5xl font-serif font-extrabold text-amber-600 block">14,200+</span>
                    <span className="text-xs sm:text-sm text-stone-500 uppercase font-mono tracking-wider font-bold">Wisatawan Puas</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-4xl sm:text-5xl font-serif font-extrabold text-amber-600 block">98%</span>
                    <span className="text-xs sm:text-sm text-stone-500 uppercase font-mono tracking-wider font-bold">Rating Sangat Puas</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-4xl sm:text-5xl font-serif font-extrabold text-amber-600 block">15+</span>
                    <span className="text-xs sm:text-sm text-stone-500 uppercase font-mono tracking-wider font-bold">Driver Profesional</span>
                  </div>
                </div>

                {/* Visi Misi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-white border border-stone-100 rounded-3xl p-8 shadow-sm space-y-4 hover:border-amber-200 transition-colors">
                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Visi Kami</h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      Menjadi penyedia jasa perjalanan wisata premium terdepan di Indonesia yang diakui atas keaslian informasi, standar keselamatan kelas tinggi, kejujuran harga, dan kontribusi nyata dalam melestarikan pariwisata lokal maupun global.
                    </p>
                  </div>
                  <div className="bg-white border border-stone-100 rounded-3xl p-8 shadow-sm space-y-4 hover:border-amber-200 transition-colors">
                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Misi Kami</h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      Memberikan pelayanan yang ramah dan tulus layaknya sahabat, menyediakan armada kendaraan yang selalu bersih, terawat dan nyaman, serta memberdayakan driver dan pemandu lokal profesional agar mampu memberikan wawasan terbaik bagi para tamu.
                    </p>
                  </div>
                </div>

                {/* Client Reviews Carousel or Guest Book */}
                <div className="space-y-8">
                  <div className="text-center">
                    <span className="text-amber-600 text-xs font-bold tracking-widest font-mono uppercase block">Suara Tamu Kami</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 mt-2">Ulasan Jujur di Google Maps</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {REVIEWS.map((rev) => (
                      <div key={rev.id} className="bg-stone-50 border border-stone-100 p-6 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={rev.avatar} 
                            alt={rev.name} 
                            className="w-10 h-10 rounded-full object-cover border border-stone-200" 
                          />
                          <div>
                            <h4 className="font-bold text-stone-900 text-sm leading-none">{rev.name}</h4>
                            <span className="text-[10px] text-stone-400 font-medium">{rev.location} • {rev.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action bar */}
              <div className="bg-stone-50 border-t border-stone-100 py-12 px-6 text-center">
                <div className="max-w-2xl mx-auto space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Siap Jelajahi Keindahan Dunia Bersama mhAb Travel?</h3>
                  <p className="text-stone-500 text-xs sm:text-sm">
                    Jangan ragu berkonsultasi mengenai itinerary impian Anda. Kami siap merancang perjalanan yang personal dan tidak terlupakan.
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <button 
                      onClick={() => handleOpenBooking('')}
                      className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      Booking Perjalanan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'packages' && (
            <motion.div
              key="packages-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-stone-50 py-12"
            >
              <div className="max-w-7xl mx-auto px-6 space-y-12">
                {/* Header Title block */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs font-mono">Katalog Lengkap</span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-stone-900 leading-tight">
                    Pilih Paket Wisata Impian Anda
                  </h1>
                  <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                    Sistem penyaringan interaktif. Ketik kata kunci atau pilih kategori paket di bawah ini untuk merencanakan petualangan Anda!
                  </p>
                  <button 
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800 transition-colors pt-2"
                  >
                    <ArrowLeft size={14} /> Kembali ke Beranda
                  </button>
                </div>

                {/* Filter and Search Bar Controller Row */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200/60 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                    {[
                      { id: 'all' as const, label: 'Semua' },
                      { id: 'harian' as const, label: 'Open Trip' },
                      { id: 'exclusive' as const, label: 'Private Trip' },
                      { id: 'study_tour' as const, label: 'Study Tour' },
                      { id: 'company_trip' as const, label: 'Company Trip' },
                      { id: 'mobil' as const, label: 'Sewa Mobil' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setPackageFilter(tab.id)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          packageFilter === tab.id
                            ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/10'
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search bar input */}
                  <div className="relative w-full md:w-72">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={packageSearch}
                      onChange={(e) => setPackageSearch(e.target.value)}
                      placeholder="Cari destinasi atau paket..."
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Catalog Grid of Packages (Responsive 3 columns) */}
                {filteredPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg, idx) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-stone-200 overflow-hidden flex flex-col justify-between transition-all duration-300 h-full"
                      >
                        <div>
                          {/* Image Thumbnail with zoom hover */}
                          <div className="aspect-[16/10] w-full overflow-hidden relative group">
                            <img
                              src={pkg.image}
                              alt={pkg.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {/* Tags overlay */}
                            <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                              {pkg.duration}
                            </div>
                            <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                              {pkg.category === 'mobil' ? 'Driver + Bensin' : 'Tour Paket'}
                            </div>
                          </div>

                          {/* Info body */}
                          <div className="p-6 space-y-4">
                            <div className="space-y-1">
                              <h3 className="font-serif font-extrabold text-stone-900 leading-tight text-lg sm:text-xl min-h-[56px] flex items-center">
                                {pkg.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <span className="text-amber-600 text-xs font-bold">★ {pkg.rating.toFixed(1)}</span>
                                <span className="text-[10px] text-stone-400 font-semibold">(Verified Google Review)</span>
                              </div>
                            </div>

                            {/* Price block */}
                            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100/80 flex justify-between items-center">
                              <div>
                                <span className="text-[10px] text-stone-400 uppercase font-extrabold block leading-none mb-1">Mulai Dari</span>
                                <span className="text-amber-700 font-extrabold text-lg sm:text-xl">{formatPrice(pkg.price)}</span>
                              </div>
                              <span className="text-[10px] text-stone-500 font-bold bg-white border border-stone-200/60 px-3 py-1.5 rounded-lg shadow-2xs">
                                {pkg.category === 'mobil' ? 'Per Mobil' : '/pax'}
                              </span>
                            </div>

                            {/* Full Checklist */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest block font-bold">Fasilitas All-In:</span>
                              <ul className="text-stone-600 text-xs space-y-2">
                                {pkg.details.map((det, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-2 leading-snug">
                                    <CheckCircle size={13} className="text-amber-600 mt-0.5 shrink-0" />
                                    <span>{det}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Booking Trigger Footer card */}
                        <div className="p-6 pt-0 mt-4">
                          <button
                            id={`catalog-book-${pkg.id}`}
                            onClick={() => handleOpenBooking(pkg.id)}
                            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all text-center block cursor-pointer"
                          >
                            Pesan Paket Ini Sekarang
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-stone-200/60 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
                    <p className="text-stone-400 text-sm font-medium">
                      Maaf, tidak ada paket atau mobil yang cocok dengan pencarian kata kunci "{packageSearch}".
                    </p>
                    <button
                      onClick={() => {
                        setPackageSearch('');
                        setPackageFilter('all');
                      }}
                      className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-4 py-2 rounded-xl uppercase tracking-wider transition-all"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activePage === 'why' && (
            <motion.div
              key="why-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white"
            >
              {/* Hero Banner Header */}
              <div className="relative py-24 bg-stone-950 text-white text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                  <img 
                    src="/images/handara_1782818227755.jpg" 
                    alt="Handara Bali Gate" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-950/80" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                  <span className="text-amber-500 text-xs font-mono uppercase tracking-widest font-extrabold">Keunggulan Layanan</span>
                  <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight">Mengapa Harus mhAb Travel?</h1>
                  <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    Lebih dari sekadar memandu, kami berdedikasi menciptakan perjalanan yang aman, terpercaya, transparan, dan penuh kegembiraan asli di setiap destinasi pilihan Anda.
                  </p>
                  <button 
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors pt-4"
                  >
                    <ArrowLeft size={14} /> Kembali ke Beranda
                  </button>
                </div>
              </div>

              {/* Six Core Values Breakdown Grid */}
              <div className="py-20 max-w-7xl mx-auto px-6 space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Pemandu Lokal Berlisensi',
                      desc: 'Driver sekaligus guide kami adalah orang asli Bali yang ramah, sopan, dan berlisensi resmi. Mereka siap membagikan kisah sejarah & budaya orisinil.',
                      icon: Award,
                      color: 'bg-amber-100 text-amber-700'
                    },
                    {
                      title: 'Kejujuran & Transparansi',
                      desc: 'Tidak ada biaya tersembunyi (No hidden cost). Semua rincian bensin, tiket masuk wisata, tol, driver, dan parkir tercantum jelas sejak awal pemesanan.',
                      icon: ShieldCheck,
                      color: 'bg-emerald-100 text-emerald-700'
                    },
                    {
                      title: 'Fleksibilitas Tanpa Batas',
                      desc: 'Kami memahami keinginan liburan Anda dapat berubah di lapangan. Kami sangat fleksibel menyesuaikan rute demi kenyamanan dan kepuasan Anda.',
                      icon: Heart,
                      color: 'bg-red-100 text-red-700'
                    },
                    {
                      title: 'Armada Bersih & Prima',
                      desc: 'Fleksibilitas kendaraan mulai dari Honda Brio, Toyota Avanza, Innova Reborn, Hiace, hingga Alphard Gen 4 premium, semua selalu dalam kondisi harum dan prima.',
                      icon: Clock,
                      color: 'bg-blue-100 text-blue-700'
                    },
                    {
                      title: 'Rekomendasi Hidden Gem',
                      desc: 'Ingin mencoba kuliner Bali paling otentik yang tidak ada di buku panduan turis? Kami siap merekomendasikan dan mengantarkan Anda ke spot tersembunyi terbaik.',
                      icon: MapPin,
                      color: 'bg-purple-100 text-purple-700'
                    },
                    {
                      title: 'Layanan Darurat 24 Jam',
                      desc: 'Keamanan Anda adalah fokus utama kami. Tim dukungan pelanggan kami selalu siap sedia merespon segala kebutuhan darurat Anda kapan saja.',
                      icon: Phone,
                      color: 'bg-amber-100 text-amber-750'
                    }
                  ].map((val, idx) => {
                    const IconComp = val.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="p-8 border border-stone-100 bg-stone-50/50 hover:bg-amber-50/10 hover:border-amber-200 rounded-3xl space-y-4 transition-all duration-300 shadow-2xs"
                      >
                        <div className={`w-12 h-12 rounded-xl ${val.color} flex items-center justify-center shadow-xs`}>
                          <IconComp size={24} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-tight">
                          {val.title}
                        </h3>
                        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                          {val.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Secure travel standards banner */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-stone-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
                  <div className="space-y-6 z-10">
                    <span className="text-amber-500 text-xs font-mono uppercase tracking-widest font-extrabold block">Standar Keselamatan</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">Perjalanan Aman Bersama Kami</h2>
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                      Setiap armada mobil kami dilengkapi dengan asuransi perjalanan penuh, peralatan pertolongan pertama (P3K), dan driver berlisensi resmi yang telah melewati tes berkendara aman yang ketat. Kenyamanan dan keselamatan Anda tidak pernah kami kompromikan.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-200">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-amber-500 shrink-0" /> Seatbelt di semua baris kursi
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-amber-500 shrink-0" /> Driver bersertifikasi mengemudi aman
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-amber-500 shrink-0" /> Pembersihan desinfektan harian
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-amber-500 shrink-0" /> GPS Pelacak Kendaraan Realtime
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="/images/toyota_alphard_1782818305432.jpg" 
                      alt="Premium safe car fleet" 
                      className="w-full h-full object-cover filter brightness-90"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Structured Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenBooking={() => handleOpenBooking('')} 
      />

      {/* Modals & Chat Assistants */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedPackageId={selectedPackageId} 
      />

      <DestinationDetailModal 
        isOpen={isDestDetailOpen} 
        onClose={() => setIsDestDetailOpen(false)} 
        destination={selectedDestination} 
        onBookThis={handleOpenBooking} 
      />

      <InteractiveAssistant />
    </div>
  );
}
