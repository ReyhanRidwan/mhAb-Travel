import React from 'react';
import { Compass, Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    // TikTok logo custom
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="none">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.42-.32-.78-.71-1.1-1.13v6.52c-.01 2.22-.85 4.54-2.6 5.92-1.76 1.43-4.22 1.95-6.42 1.5-2.58-.45-4.9-2.54-5.48-5.11-.75-3.04.81-6.52 3.8-7.51.9-.31 1.86-.41 2.81-.3v3.91c-.81-.13-1.68-.02-2.42.36-.96.47-1.57 1.57-1.53 2.67.01 1.25.9 2.39 2.1 2.67 1.13.27 2.44-.21 2.94-1.28.2-.39.27-.84.26-1.28l-.02-12.01c-.01-.33.24-.62.58-.62z" />
        </svg>
      ),
      href: 'https://tiktok.com',
      label: 'TikTok'
    }
  ];

  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-stone-800">
        
        {/* Left column: Branding */}
        <div className="lg:col-span-4 space-y-6">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 group focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all p-1">
              <img 
                src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783322349/35940533-1f7a-4453-9bbc-1c096c7f3a09.png" 
                alt="mhAb Travel Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif font-extrabold text-lg text-white leading-tight block tracking-wide">
                mhAb Travel
              </span>
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block leading-none">
                Sejak Tahun 2012
              </span>
            </div>
          </button>

          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Di mhAb Travel, kami siap menjadi sahabat perjalanan terbaik Anda untuk mengeksplorasi keindahan nusantara Indonesia hingga destinasi impian mancanegara.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 pt-2">
            {socialLinks.map((soc, idx) => {
              const IconComp = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-amber-500 text-stone-400 hover:text-stone-950 flex items-center justify-center transition-all shadow-sm border border-stone-800"
                >
                  <IconComp />
                </a>
              );
            })}
          </div>
        </div>

        {/* Center-Left Column: Menu */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-white font-mono">Menu</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => onNavigate('hero')} className="hover:text-amber-400 transition-colors">
                Beranda
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                Tentang Kami
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('packages')} className="hover:text-amber-400 transition-colors">
                Dokumentasi
              </button>
            </li>
            <li>
              <button onClick={onOpenBooking} className="hover:text-amber-400 transition-colors">
                Hubungi Kami
              </button>
            </li>
          </ul>
        </div>

        {/* Center-Right Column: Paket Categories */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-white font-mono">Paket</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => onNavigate('packages')} className="hover:text-amber-400 transition-colors">
                Open Trip
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('packages')} className="hover:text-amber-400 transition-colors">
                Private Trip
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('packages')} className="hover:text-amber-400 transition-colors">
                Sewa Mobil Harian
              </button>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact Details */}
        <div className="lg:col-span-3 space-y-4 text-xs sm:text-sm">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-white font-mono">Informasi Kontak</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 leading-snug">
              <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span>
                Wisma mhAb Travel, Jl. Jend. Sudirman No.45, Jakarta Pusat / Yogyakarta
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-amber-500 shrink-0" />
              <a href="mailto:mhabtravel@gmail.com" className="hover:text-amber-400 transition-colors">
                mhabtravel@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-amber-500 shrink-0" />
              <a href="tel:+6281385926888" className="hover:text-amber-400 font-mono transition-colors">
                +62 813-8592-6888
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom copyright and language info */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
        <span>
          © {currentYear} mhAb Travel All Rights Reserved.
        </span>

        {/* Flag language switcher */}
        <div className="flex items-center gap-2 bg-stone-800 px-3.5 py-1.5 rounded-lg border border-stone-800 text-stone-300">
          <span className="w-4 h-3 inline-block relative shadow-sm shrink-0 overflow-hidden rounded-xs">
            {/* Indonesian flag */}
            <span className="absolute inset-0 bg-red-600 h-1/2" />
            <span className="absolute bottom-0 inset-x-0 bg-white h-1/2" />
          </span>
          <span className="tracking-wide">Indonesian</span>
        </div>
      </div>
    </footer>
  );
}
