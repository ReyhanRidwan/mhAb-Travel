import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Compass, User, AlertCircle, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function InteractiveAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! 🙏 Saya Sena, Asisten Virtual mhAb Travel. Ada yang bisa saya bantu untuk merencanakan liburan impian Anda ke seluruh Indonesia atau mancanegara?',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickQuestions = [
    { text: 'Cara Pesan Paket Tour?', query: 'pesan' },
    { text: 'Waktu Terbaik Liburan?', query: 'waktu' },
    { text: 'Sewa mobil dapet driver?', query: 'mobil' },
    { text: 'Custom Itinerary?', query: 'custom' }
  ];

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('pesan') || q.includes('booking') || q.includes('bayar')) {
      return 'Untuk pemesanan sangat mudah! Anda cukup klik tombol "Booking Now" pada paket pilihan Anda di website ini, lalu isi form kontaknya. Setelah dikonfirmasi, Anda bisa langsung chat WhatsApp kami untuk finalisasi. Pembayaran bisa transfer bank virtual account, kartu kredit, QRIS via Midtrans, atau transfer manual! 😊';
    }
    if (q.includes('waktu') || q.includes('kapan') || q.includes('bulan')) {
      return 'Waktu terbaik tergantung destinasi Anda! Untuk wisata domestik seperti Bali, Labuan Bajo, dan Bromo adalah saat musim kemarau (April - Oktober). Sedangkan untuk mancanegara seperti Jepang dan Eropa, musim semi (Maret - Mei) atau musim gugur (September - November) sangat indah dan direkomendasikan. ☀️🍁';
    }
    if (q.includes('mobil') || q.includes('brio') || q.includes('alphard') || q.includes('sewa')) {
      return 'Semua penyewaan mobil di mhAb Travel sudah ALL-IN termasuk Driver Profesional kami (yang siap menjadi guide jalan & bantu foto-foto) serta Bahan Bakar (BBM). Anda tinggal duduk santai menikmati perjalanan eksklusif tanpa repot menyetir! 🚗';
    }
    if (q.includes('custom') || q.includes('itinerary') || q.includes('rute') || q.includes('buatkan')) {
      return 'Tenu saja bisa! Kami sangat fleksibel merancang perjalanan kustom. Baik untuk rute domestik (Bali, Labuan Bajo, Raja Ampat, Bromo) maupun rute luar negeri (Jepang, Swiss, Turki, Singapura, Malaysia). Hubungi CS WhatsApp kami di +62 813-8592-6888 untuk konsultasi gratis! 🗺️✨';
    }
    if (q.includes('penida') || q.includes('kelingking') || q.includes('bajo') || q.includes('raja') || q.includes('bromo')) {
      return 'Kami memiliki paket unggulan terpopuler seperti Open Trip Bromo Sunrise, Sailing Labuan Bajo Phinisi, Tour Raja Ampat Liveaboard, hingga Trip Nusa Penida Bali. Semua dikemas profesional, lengkap dengan akomodasi dan dokumentasi berkualitas premium! 🌴⛵';
    }
    if (q.includes('makan') || q.includes('kuliner') || q.includes('enak')) {
      return 'Kuliner adalah bagian terpenting dari trip kami! Baik hidangan khas Nusantara (Ayam Betutu Bali, Seafood Jimbaran, kuliner lokal Jogja/Bromo) maupun sajian otentik luar negeri (Sushi Jepang, Kebab Turki). Kami siap mengantar Anda ke tempat kuliner hidden gem terlezat! 🍛🍣';
    }
    if (q.includes('halo') || q.includes('hai') || q.includes('pagi') || q.includes('siang') || q.includes('sore')) {
      return 'Halo juga! Ada yang bisa saya bantu rencanakan hari ini? Silakan tanya seputar paket tour, harga, sewa mobil, atau destinasi wisata menarik di seluruh Indonesia dan mancanegara. 🗺️✈️';
    }
    
    return 'Pertanyaan menarik! Saya sarankan untuk langsung menghubungi pemandu wisata kami via WhatsApp di +62 813-8592-6888 agar mendapat rincian rute lengkap, ketersediaan jadwal ter-update, dan penawaran promo harga spesial! 🤙🌸';
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate natural typing delay
    setTimeout(() => {
      const assistantText = getResponse(text);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Chat Trigger Button */}
      <motion.button
        id="chat-trigger-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-2xl shadow-amber-600/30 transition-colors cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={24} />
              {/* Notification Badge Dot */}
              <span className="absolute top-[-3px] right-[-3px] w-3 h-3 bg-red-500 rounded-full border-2 border-amber-600 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Panel Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="absolute bottom-18 right-0 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-stone-100 flex flex-col overflow-hidden"
          >
            {/* Panel Header */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white p-4 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-bold shadow-md">
                  <Compass size={18} className="animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide">Sena Virtual Guide</h4>
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider leading-none">Online • mhAb Travel</p>
                </div>
              </div>
              <button
                id="close-chat-panel"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto bg-stone-50 space-y-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  {/* Sender Avatar Icon */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs text-xs font-bold ${
                    msg.sender === 'user' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-stone-900 text-amber-400'
                  }`}>
                    {msg.sender === 'user' ? <User size={14} /> : 'S'}
                  </div>

                  <div className="space-y-1">
                    <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-stone-950 rounded-tr-none font-medium'
                        : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none shadow-xs'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-stone-400 block px-1 text-right font-mono">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[80%] items-center">
                  <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    S
                  </div>
                  <div className="bg-white border border-stone-100 p-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick action questions helper list */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-stone-100/50 border-t border-stone-100 flex flex-wrap gap-1.5 justify-center">
                {quickQuestions.map((qq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qq.text)}
                    className="text-[10px] sm:text-xs font-bold text-stone-700 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-400 rounded-full px-3 py-1 shadow-xs transition-all cursor-pointer"
                  >
                    {qq.text}
                  </button>
                ))}
              </div>
            )}

            {/* Form Input Message */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-stone-100 flex gap-2 items-center"
            >
              <input
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pesan untuk Sena..."
                className="flex-1 bg-stone-50 border border-stone-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-stone-800"
              />
              <button
                id="send-chat-message"
                type="submit"
                disabled={!inputValue.trim()}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  inputValue.trim()
                    ? 'bg-amber-600 text-white cursor-pointer hover:bg-amber-700'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
