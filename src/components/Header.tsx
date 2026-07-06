import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
  activePage?: string;
}

export default function Header({ onOpenBooking, onNavigate, activePage = 'home' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', id: 'hero' },
    { label: 'Tentang Kami', id: 'about' },
    { label: 'Paket Tour', id: 'packages' },
    { label: 'Mengapa Kami', id: 'why-choose-us' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  const shouldBeSolid = isScrolled || activePage === 'packages';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        shouldBeSolid
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800 py-3 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className={`rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all p-1 ${
            shouldBeSolid ? 'w-10 h-10' : 'w-8 h-8'
          }`}>
            <img 
              src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783322349/35940533-1f7a-4453-9bbc-1c096c7f3a09.png" 
              alt="mhAb Travel Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <span className={`font-serif text-white leading-tight block tracking-wide transition-all ${
              shouldBeSolid ? 'text-lg font-extrabold' : 'text-sm font-medium'
            }`}>
              mhAb Travel
            </span>
            <span className={`text-amber-500 font-bold uppercase tracking-widest block leading-none transition-all ${
              shouldBeSolid ? 'text-[10px]' : 'text-[8px] opacity-80'
            }`}>
              Sejak Tahun 2012
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-white/90 hover:text-amber-400 uppercase tracking-widest transition-all relative group py-2 ${
                shouldBeSolid ? 'text-xs font-semibold' : 'text-[11px] font-normal'
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Action Button & Menu Icon */}
        <div className="flex items-center gap-4">
          <button
            id="header-cta-button"
            onClick={onOpenBooking}
            className={`hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 ${
              shouldBeSolid ? 'px-5 py-2.5 text-xs' : 'px-4 py-1.5 text-[10px]'
            }`}
          >
            <PhoneCall size={shouldBeSolid ? 14 : 12} />
            Hubungi Kami
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white bg-stone-800/50 rounded-xl border border-stone-700/50 transition-all focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-950 border-b border-stone-800"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left text-stone-300 hover:text-white font-semibold py-2.5 border-b border-stone-900 text-base"
                >
                  {link.label}
                </button>
              ))}
              <button
                id="mobile-header-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 px-5 rounded-xl text-center text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} />
                Hubungi Kami
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
