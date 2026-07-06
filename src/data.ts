import { Destination, TourPackage, Review } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'raja-ampat',
    name: 'Raja Ampat',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
    description: 'Surga bawah laut tropis di Papua Barat dengan gugusan pulau karang eksotis, biota laut terlengkap di dunia, dan pantai perawan berpasir putih halus.',
    highlights: ['Pulau Wayag (Scenic View)', 'Piaynemo Lookout', 'Misool Marine Park', 'Snorkeling di Selat Dampier'],
    bestTime: 'Oktober - April (Kondisi laut paling tenang)',
    weather: '27°C - 31°C, Hangat Tropis',
    duration: 'Disarankan mengambil program Liveaboard 5 Hari 4 Malam.'
  },
  {
    id: 'labuan-bajo',
    name: 'Labuan Bajo',
    image: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=800&q=80',
    description: 'Gerbang utama menuju habitat naga purba Komodo, pantai pink yang magis, serta puncak Pulau Padar dengan panorama tiga teluk yang menakjubkan.',
    highlights: ['Pulau Padar (Puncak Bukit)', 'Taman Nasional Komodo', 'Pink Beach', 'Manta Point Snorkeling'],
    bestTime: 'Mei - September (Musim angin sepoi & cerah)',
    weather: '26°C - 30°C, Berangin Cerah',
    duration: 'Paling pas dengan Paket Open Trip 3 Hari 2 Malam.'
  },
  {
    id: 'gunung-bromo',
    name: 'Gunung Bromo',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80',
    description: 'Gunung berapi aktif legendaris di Jawa Timur yang menyuguhkan pemandangan lautan pasir kelabu, kawah berbisik, dan matahari terbit emas yang megah.',
    highlights: ['Penanjakan 1 (Golden Sunrise)', 'Kawah Bromo', 'Pasir Berbisik', 'Bukit Teletubbies'],
    bestTime: 'Juni - Agustus (Suhu dingin berkabut cerah)',
    weather: '5°C - 18°C, Sangat Dingin',
    duration: 'Cocok sebagai paket tour singkat 2 Hari 1 Malam.'
  },
  {
    id: 'tokyo-kyoto',
    name: 'Tokyo & Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Perpaduan menakjubkan antara modernitas futuristik kota Tokyo dengan kedamaian kuil tradisional kuno dan hutan bambu Arashiyama di Kyoto, Jepang.',
    highlights: ['Shibuya Crossing & Sensoji Temple', 'Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Gunung Fuji & Danau Kawaguchiko'],
    bestTime: 'Maret - Mei (Sakura) / Oktober - November (Gugur)',
    weather: '10°C - 20°C, Sejuk Nyaman',
    duration: 'Disarankan mengambil Paket Eksklusif 7 Hari 6 Malam.'
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    description: 'Menikmati puncak-puncak salju abadi Pegunungan Alpen Swiss, danau berwarna hijau zamrud yang jernih, dan kastil-kastil bersejarah Eropa yang memesona.',
    highlights: ['Jungfraujoch (Top of Europe)', 'Danau Lucerne', 'Zermatt & Gunung Matterhorn', 'Interlaken Alpine Resort'],
    bestTime: 'Desember - Februari (Salju) / Juni - Agustus (Panas)',
    weather: '-5°C - 15°C, Dingin Sejuk',
    duration: 'Sangat disarankan Paket Tour Premium 8 Hari 7 Malam.'
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80',
    description: 'Lanskap magis di Turki dengan cerobong peri bebatuan unik, kota bawah tanah kuno, dan ratusan balon udara yang menghiasi langit fajar berwarna jingga.',
    highlights: ['Terbang Balon Udara Fajar', 'Goreme Open Air Museum', 'Kaymakli Underground City', 'Devrent Valley (Camel Rock)'],
    bestTime: 'April - Juni / September - November',
    weather: '12°C - 25°C, Sejuk Berangin',
    duration: 'Disisipkan dalam rangkaian Paket Tour Turki 6 Hari 5 Malam.'
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  // 1. Open Trip
  {
    id: 'bromo-tour',
    name: 'OPEN TRIP BROMO SUNRISE',
    price: 850000,
    category: 'harian',
    type: 'Open Trip',
    duration: '2 Hari 1 Malam',
    details: [
      'Transportasi AC dari Malang/Surabaya PP',
      'Sewa Jeep Bromo 4x4 Khusus',
      'Tiket Masuk Taman Nasional Bromo Tengger',
      'Makan Pagi Prasmanan Hangat',
      'Layanan Driver Sekaligus Guide Lokal',
      'Air Mineral & Masker Debu Gratis'
    ],
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'labuan-bajo-tour',
    name: 'OPEN TRIP LABUAN BAJO SAILING',
    price: 2450000,
    category: 'harian',
    type: 'Open Trip',
    duration: '3 Hari 2 Malam',
    details: [
      'Kapal Phinisi Semi-Luxury Living AC',
      'Menginap di Kabin Kapal Nyaman',
      'Makan 7 Kali selama Pelayaran (Koki Kapal)',
      'Perlengkapan Snorkeling Lengkap',
      'Dokumentasi Drone, Go-Pro & DSLR',
      'Kunjungan: Pulau Padar, Komodo, Pink Beach'
    ],
    image: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=800&q=80',
    rating: 5.0
  },
  {
    id: 'nusa-penida-tour',
    name: 'OPEN TRIP BALI EXOTIC SEHARIAN',
    price: 1350000,
    category: 'harian',
    type: 'Open Trip',
    duration: '1 Hari (Full Day)',
    details: [
      'Tiket Fastboat PP Sanur - Nusa Penida',
      'Transportasi AC Privat di Nusa Penida',
      'Makan Siang di Restoran Lokal Cantik',
      'Tiket Masuk Semua Objek Wisata',
      'Kunjungan: Kelingking Beach, Broken Beach, Angel Billabong',
      'Layanan Guide Foto Lokal Handal'
    ],
    image: '/images/hero_bali_1782818190522.jpg',
    rating: 4.8
  },
  {
    id: 'singapore-tour',
    name: 'OPEN TRIP SINGAPORE & MALAYSIA CITY EXPLORE',
    price: 4950000,
    category: 'harian',
    type: 'Open Trip / Group',
    duration: '4 Hari 3 Malam',
    details: [
      'Tiket Pesawat PP Internasional',
      'Hotel AC Bintang 3 Strategis',
      'Transportasi Bus Pariwisata AC VIP',
      'Makan Sesuai Jadwal Kuliner Lokal',
      'Kunjungan: Merlion Park, Jewel Changi, Petronas Tower',
      'Didampingi Tour Leader Profesional dari Indonesia'
    ],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },

  // 2. Private & Exclusive Trip
  {
    id: 'japan-exclusive',
    name: 'EXCLUSIVE JAPAN SAKURA & FUJI AUTUMN 7D6N',
    price: 24800000,
    category: 'exclusive',
    type: 'Paket Eksklusif',
    duration: '7 Hari 6 Malam',
    minPax: 2,
    details: [
      'Hotel Premium Bintang 4 di Tokyo & Kyoto',
      'Tiket Kereta Cepat Shinkansen PP',
      'Tiket Masuk Disneyland/Universal Studio Japan',
      'Sewa Private Van Toyota Alphard selama Tour',
      'Guide Berbahasa Indonesia Tinggal di Jepang',
      'Kunjungan: Mt. Fuji, Shibuya, Fushimi Inari, Asakusa'
    ],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 5.0
  },
  {
    id: 'swiss-exclusive',
    name: 'ROMANTIC SWITZERLAND ALPINE PREMIUM 8D7N',
    price: 36500000,
    category: 'exclusive',
    type: 'Paket Eksklusif',
    duration: '8 Hari 7 Malam',
    minPax: 2,
    details: [
      'Hotel Bintang 5 View Danau / Pegunungan',
      'Tiket Kereta Panoramic Swiss Travel Pass First Class',
      'Tiket Cable Car ke Jungfraujoch & Titlis',
      'Romantic Dinner di Puncak Pegunungan Alpen',
      'Private Airport Transfer PP di Zurich',
      'Asuransi Perjalanan Schengen Premium Termasuk'
    ],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'turkey-exclusive',
    name: 'EXOTIC CAPPADOCIA & ISTANBUL TURKEY TOUR 6D5N',
    price: 16900000,
    category: 'exclusive',
    type: 'Paket Eksklusif',
    duration: '6 Hari 5 Malam',
    minPax: 2,
    details: [
      'Hotel Cave (Gua Mewah) Unik di Cappadocia',
      'Tiket Penerbangan Domestik Istanbul - Cappadocia PP',
      'Tiket Terbang Balon Udara Mewah saat Sunrise',
      'Makan Pagi, Siang & Malam Kuliner Khas Turki',
      'Private Guide Berlisensi & Bus AC Mewah',
      'Kunjungan: Blue Mosque, Hagia Sophia, Goreme Valley'
    ],
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80',
    rating: 5.0
  },
  {
    id: 'raja-ampat-exclusive',
    name: 'RAJA AMPAT PRIVATE PHINISI EXPEDITION 5D4N',
    price: 18500000,
    category: 'exclusive',
    type: 'Paket Eksklusif',
    duration: '5 Hari 4 Malam',
    minPax: 2,
    details: [
      'Private Charter Kapal Phinisi Mewah ber-AC',
      'Kabin Mewah dengan Kamar Mandi Dalam',
      'Makanan Gourmet Olahan Chef Pribadi di Kapal',
      'Pemandu Snorkeling & Selam (Divemaster) Berlisensi',
      'Tiket Masuk & PIN Retribusi Raja Ampat',
      'Kunjungan: Wayag, Piaynemo, Misool, Pasir Timbul'
    ],
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },

  // 3. Study Tour
  {
    id: 'study-tour-jogja',
    name: 'STUDY TOUR JOGJA HISTORIS & BUDAYA',
    price: 1850000,
    category: 'study_tour',
    type: 'Study Tour',
    duration: '4 Hari 3 Malam',
    minPax: 15,
    details: [
      'Transportasi Bus Pariwisata AC Executive Terbaru PP',
      'Akomodasi Hotel Bintang 3 Nyaman & Bersih (4 Siswa/Kamar)',
      'Konsumsi Makan Prasmanan 10 Kali Sesuai Standar Gizi',
      'Kunjungan Edukasi: Candi Borobudur, Museum Merapi, Keraton Jogja',
      'Workshop Kreatif: Belajar Membatik & Pembuatan Kerajinan Gerabah',
      'Sertifikat Resmi Kelulusan Study Tour & Kaos Seragam Eksklamatif'
    ],
    image: '/images/study_tour_jogja_1783322874373.jpg',
    rating: 4.9
  },

  // 4. Company Trip
  {
    id: 'company-outing-bali',
    name: 'COMPANY GATHERING BALI EXTREME TEAM BUILDING',
    price: 3450000,
    category: 'company_trip',
    type: 'Company Trip',
    duration: '3 Hari 2 Malam',
    minPax: 20,
    details: [
      'Akomodasi Hotel Bintang 4 di Area Pantai Kuta / Seminyak',
      'Sesi Outbound & Team Building dipandu Trainer Profesional',
      'Gala Dinner Seafood Jimbaran dengan Live Acoustic, MC & Banner',
      'Transportasi Bus Pariwisata Luxury AC Medium/Large',
      'Kunjungan Destinasi Terpopuler: Uluwatu, Kintamani, Garuda Wisnu Kencana',
      'Dokumentasi Foto, Video & Aftermovie Cinematic Udara (Drone)'
    ],
    image: '/images/company_trip_bali_1783322892824.jpg',
    rating: 5.0
  },
  {
    id: 'company-retreat-raja-ampat',
    name: 'EXECUTIVE CORPORATE RETREAT RAJA AMPAT PREMIUM',
    price: 14800000,
    category: 'company_trip',
    type: 'Company Trip',
    duration: '5 Hari 4 Malam',
    minPax: 10,
    details: [
      'Menginap di Eco-Resort Eksklusif Tepi Pantai Raja Ampat',
      'Meeting Room VIP Terbuka dengan Pemandangan Laut Lepas',
      'Fasilitas Speedboat Privat Selama Kegiatan Gathering',
      'Snorkeling & Eksplorasi Gugusan Pulau Wayag, Piaynemo & Pasir Timbul',
      'Sajian Makanan Fine-Dining Olahan Koki Lokal & Seafood Segar',
      'Dokumentasi Profesional DSLR & Underwater Go-Pro, Souvenir Premium'
    ],
    image: '/images/company_trip_raja_ampat_1783322909381.jpg',
    rating: 5.0
  },

  // 5. Sewa Mobil Harian
  {
    id: 'alphard-transformer',
    name: 'Toyota Alphard Transformer',
    price: 2750000,
    category: 'mobil',
    type: 'Sewa Mobil + Driver',
    duration: '12 Jam',
    details: [
      'Termasuk Driver Profesional, Ramah & Berpakaian Rapi',
      'Termasuk Bahan Bakar (Bensin/Solar)',
      'Kapasitas Nyaman hingga 6 Penumpang',
      'Kondisi AC Dingin & Kabin Mewah Sangat Bersih',
      'Sangat Mewah untuk Tamu VIP atau Wedding',
      'Air Mineral Dingin & Handuk Segar di Dalam Mobil'
    ],
    image: '/images/toyota_alphard_1782818305432.jpg',
    rating: 4.9
  },
  {
    id: 'hiace-luxury',
    name: 'Toyota Hiace Premio Luxury',
    price: 1850000,
    category: 'mobil',
    type: 'Sewa Mobil + Driver',
    duration: '12 Jam',
    details: [
      'Sewa Unit Premio Terbaru Berpintu Geser',
      'Driver Premium Berpengalaman & On-Time',
      'Kapasitas Captain Seats hingga 9 - 11 Penumpang',
      'Sistem Audio & Hiburan TV Layar Sentuh Modern',
      'Termasuk Bensin, Tol, & Biaya Parkir',
      'Sempurna untuk Kebutuhan Wisata Keluarga Besar'
    ],
    image: '/images/wedding_car_1782818377689.jpg',
    rating: 5.0
  },
  {
    id: 'honda-brio',
    name: 'Honda Brio RS',
    price: 750000,
    category: 'mobil',
    type: 'Sewa Mobil + Driver',
    duration: '12 Jam',
    details: [
      'Termasuk Driver Ramah sekaligus Guide Rute Lokal',
      'Termasuk Bahan Bakar (Bensin)',
      'Kapasitas Ideal untuk 3-4 Orang Penumpang',
      'Mobil Kecil Lincah, Pas untuk Menjelajah Kota',
      'Sangat Hemat dan Nyaman untuk Pasangan',
      'Penjemputan Fleksibel di Area Bandara / Hotel Anda'
    ],
    image: '/images/honda_brio_1782818317010.jpg',
    rating: 4.8
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ahmad Fauzi',
    location: 'Jakarta',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    text: 'Sangat merekomendasikan mhAb Travel! Kami mengambil Paket Sailing Labuan Bajo Phinisi dan guidenya luar biasa hebat, dokumentasinya lengkap dari foto DSLR hingga drone. Phinisinya bersih dan makanannya enak banget!',
    date: '25 Juni 2026'
  },
  {
    id: 'rev-2',
    name: 'Siti Rahmawati',
    location: 'Surabaya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    text: 'Sewa Toyota Hiace Premio Luxury untuk acara kantor di Jogja. Pelayanannya luar biasa. Drivernya berpakaian sangat rapi, sopan, dan memahami jalan pintas menghindari kemacetan. mhAb Travel is highly recommended!',
    date: '12 Juni 2026'
  },
  {
    id: 'rev-3',
    name: 'Budi Santoso',
    location: 'Bandung',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    text: 'mhAb Travel menyusun trip 7D6N ke Jepang untuk keluarga saya secara sempurna. Dari visa, hotel, sewa Alphard di Tokyo, hingga Shinkansen semua diurus tanpa hambatan. Perjalanan luar negeri perdana kami menjadi begitu berkesan.',
    date: '02 Mei 2026'
  }
];

export const FAQS = [
  {
    q: 'Apakah harga paket sudah termasuk tiket pesawat?',
    a: 'Untuk paket internasional (seperti Singapura & Malaysia), tiket pesawat pulang-pergi sudah termasuk dalam harga paket. Sedangkan untuk paket domestik, harga default adalah land-tour, namun tim kami siap membantu pemesanan tiket pesawat domestik dengan penawaran harga terbaik.'
  },
  {
    q: 'Bagaimana cara melakukan pembayaran dan konfirmasi?',
    a: 'Pembayaran aman dapat dilakukan melalui snap payment gateway Midtrans (mendukung transfer bank virtual account, kartu kredit, dan QRIS) langsung di website, atau via transfer bank manual ke rekening resmi kami. Untuk paket eksklusif, diperlukan uang muka (DP) sebesar 30%.'
  },
  {
    q: 'Apakah itinerary paket privat dapat disesuaikan (custom)?',
    a: 'Sangat bisa! mhAb Travel mengedepankan fleksibilitas tinggi. Anda bebas menambahkan objek wisata, memilih hotel bintang tertentu, atau menyesuaikan rute sesuai minat pribadi baik untuk trip domestik maupun mancanegara.'
  },
  {
    q: 'Bagaimana standar keselamatan perjalanan di mhAb Travel?',
    a: 'Keamanan adalah prioritas mutlak kami. Semua armada kami berasuransi penuh, terawat prima, dan dipandu oleh driver profesional berlisensi resmi. Kami juga menyertakan asuransi perjalanan internasional premium untuk semua tur mancanegara.'
  }
];
