import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Users, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  Ticket, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Heart, 
  Gift, 
  ShieldCheck, 
  Info, 
  CreditCard,
  Camera,
  Hotel,
  Navigation
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data';
import { TourPackage } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackageId?: string;
}

// Static fully-booked dates in July 2026
const FULLY_BOOKED_DAYS = [4, 11, 12, 18, 19, 25, 26]; // Busy weekend dates in July 2026

export default function BookingModal({ isOpen, onClose, selectedPackageId }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState<TourPackage | null>(null);
  
  // State for fields
  const [selectedDate, setSelectedDate] = useState<number | null>(null); // July 2026 day number
  const [paxAdult, setPaxAdult] = useState(2);
  const [paxChild, setPaxChild] = useState(0);
  
  // Add-ons state
  const [addOnExtraHotel, setAddOnExtraHotel] = useState(false);
  const [addOnAirportTransfer, setAddOnAirportTransfer] = useState(false);
  const [addOnPrivateGuide, setAddOnPrivateGuide] = useState(false);
  
  // Personal details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Payment option
  const [paymentOption, setPaymentOption] = useState<'dp' | 'full'>('dp'); // dp: 30%, full: 100%
  
  // Midtrans Payment Gateway state
  const [paymentMethod, setPaymentMethod] = useState<'midtrans' | 'manual'>('midtrans');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [midtransToken, setMidtransToken] = useState('');
  const [midtransRedirectUrl, setMidtransRedirectUrl] = useState('');
  const [midtransPaymentStatus, setMidtransPaymentStatus] = useState<'pending' | 'success' | 'failed' | null>(null);
  const [midtransMessage, setMidtransMessage] = useState('');

  // Generation output
  const [ticketNumber, setTicketNumber] = useState('');

  // Load Midtrans Snap JS script dynamically
  useEffect(() => {
    if (isOpen) {
      const existingScript = document.getElementById('midtrans-snap-script');
      if (!existingScript) {
        const script = document.createElement('script');
        // Check if we configured production in metadata/env
        const isProduction = (import.meta as any).env?.VITE_MIDTRANS_IS_PRODUCTION === 'true';
        script.src = isProduction
          ? 'https://app.midtrans.com/snap/snap.js'
          : 'https://app.sandbox.midtrans.com/snap/snap.js';
        
        const clientKey = (import.meta as any).env?.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-dummy';
        script.setAttribute('data-client-key', clientKey);
        script.id = 'midtrans-snap-script';
        document.body.appendChild(script);
      }
    }
  }, [isOpen]);

  // Handle selected package auto-fill
  useEffect(() => {
    if (isOpen) {
      if (selectedPackageId) {
        const pkg = TOUR_PACKAGES.find(p => p.id === selectedPackageId);
        if (pkg) {
          setSelectedPkg(pkg);
          setPaxAdult(pkg.minPax || (pkg.category === 'mobil' ? 1 : 2));
          setPaxChild(0);
        }
      } else if (TOUR_PACKAGES.length > 0 && !selectedPkg) {
        setSelectedPkg(TOUR_PACKAGES[0]);
        setPaxAdult(2);
        setPaxChild(0);
      }
      // Reset state for new booking session
      setCurrentStep(1);
      setSelectedDate(null);
      setAddOnExtraHotel(false);
      setAddOnAirportTransfer(false);
      setAddOnPrivateGuide(false);
      setName('');
      setEmail('');
      setPhone('');
      setPaymentOption('dp');
      setPaymentMethod('midtrans');
      setIsPaymentLoading(false);
      setMidtransToken('');
      setMidtransRedirectUrl('');
      setMidtransPaymentStatus(null);
      setMidtransMessage('');
    }
  }, [selectedPackageId, isOpen]);

  if (!isOpen) return null;

  const handlePackageChange = (id: string) => {
    const pkg = TOUR_PACKAGES.find(p => p.id === id);
    if (pkg) {
      setSelectedPkg(pkg);
      setPaxAdult(pkg.minPax || (pkg.category === 'mobil' ? 1 : 2));
      setPaxChild(0);
    }
  };

  // Pricing values
  const extraHotelCost = 450000;
  const airportTransferCost = 250000;
  const privateGuideCost = 350000;

  // Breakdown Calculations
  const getBasePackagePrice = (): number => {
    if (!selectedPkg) return 0;
    return selectedPkg.price;
  };

  const calculatePackageTotal = (): number => {
    if (!selectedPkg) return 0;
    if (selectedPkg.category === 'mobil') {
      return selectedPkg.price; // Flat car rental
    }
    // Child gets a 30% discount on package price
    const adultTotal = selectedPkg.price * paxAdult;
    const childTotal = (selectedPkg.price * 0.7) * paxChild;
    return adultTotal + childTotal;
  };

  const calculateAddOnsTotal = (): number => {
    let total = 0;
    if (addOnExtraHotel) total += extraHotelCost;
    if (addOnAirportTransfer) total += airportTransferCost;
    if (addOnPrivateGuide) total += privateGuideCost;
    return total;
  };

  const getGroupDiscount = (): number => {
    const totalPeople = paxAdult + paxChild;
    if (selectedPkg?.category !== 'mobil' && totalPeople >= 4) {
      return 150000; // Flat discount for group size >= 4
    }
    return 0;
  };

  const calculateGrandTotal = (): number => {
    const pkgTotal = calculatePackageTotal();
    const addOnsTotal = calculateAddOnsTotal();
    const discount = getGroupDiscount();
    return Math.max(0, pkgTotal + addOnsTotal - discount);
  };

  const calculateRequiredPayment = (): number => {
    const total = calculateGrandTotal();
    if (paymentOption === 'dp') {
      return total * 0.3; // 30% Down Payment
    }
    return total; // 100% Full Payment
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const triggerMidtransPayment = async () => {
    setIsPaymentLoading(true);
    setMidtransMessage('');
    const randId = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NRB-2026-${randId}`;
    setTicketNumber(orderId);

    const amount = calculateRequiredPayment();

    try {
      const response = await fetch('/api/midtrans/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          grossAmount: amount,
          customerDetails: {
            name,
            email,
            phone,
          },
          itemDetails: [
            {
              id: selectedPkg?.id || 'BALI_TOUR',
              price: amount,
              quantity: 1,
              name: `${selectedPkg?.name} (${paymentOption === 'dp' ? 'DP 30%' : 'Lunas'})`,
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server untuk membuat token pembayaran.');
      }

      const data = await response.json();
      setMidtransToken(data.token);
      setMidtransRedirectUrl(data.redirect_url);

      if (data.isMock) {
        setMidtransMessage('Kunci Server Midtrans belum dikonfigurasi di env. Berjalan dalam mode simulasi/uji coba.');
      }

      const snapInstance = (window as any).snap;
      if (snapInstance && !data.isMock) {
        snapInstance.pay(data.token, {
          onSuccess: (result: any) => {
            console.log('payment success!', result);
            setMidtransPaymentStatus('success');
            setCurrentStep(8);
            setIsPaymentLoading(false);
          },
          onPending: (result: any) => {
            console.log('payment pending...', result);
            setMidtransPaymentStatus('pending');
            setCurrentStep(8);
            setIsPaymentLoading(false);
          },
          onError: (result: any) => {
            console.error('payment error', result);
            setMidtransPaymentStatus('failed');
            alert('Pembayaran gagal atau dibatalkan. Silakan coba lagi atau gunakan transfer bank manual.');
            setIsPaymentLoading(false);
          },
          onClose: () => {
            console.log('customer closed the popup without finishing the payment');
            setIsPaymentLoading(false);
          }
        });
      } else {
        // Mock mode or snap.js is not loaded
        setIsPaymentLoading(false);
        // Advance to Step 8 so the user can interact with the mock checkout flow
        setCurrentStep(8);
      }

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan sistem saat menghubungi gerbang pembayaran Midtrans.');
      setIsPaymentLoading(false);
    }
  };

  const handleNextStep = () => {
    // Basic validation before changing steps
    if (currentStep === 1 && !selectedPkg) return;
    if (currentStep === 2 && !selectedDate) {
      alert('Mohon pilih tanggal keberangkatan terlebih dahulu!');
      return;
    }
    if (currentStep === 6) {
      if (!name.trim()) {
        alert('Mohon isi Nama Lengkap Anda!');
        return;
      }
      if (!phone.trim()) {
        alert('Mohon isi Nomor WhatsApp aktif!');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        alert('Mohon masukkan alamat Email yang valid!');
        return;
      }
    }

    if (currentStep === 7) {
      if (paymentMethod === 'midtrans') {
        triggerMidtransPayment();
        return;
      } else {
        // Generate randomized ticket number for bank transfer
        const rand = Math.floor(10000 + Math.random() * 90000);
        setTicketNumber(`NRB-2026-${rand}`);
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  // Prepares the WhatsApp text for booking dispatch
  const handleWhatsAppShare = () => {
    if (!selectedPkg || !selectedDate) return;
    const paymentMethodText = paymentMethod === 'midtrans'
      ? `Midtrans Gateway (${midtransPaymentStatus === 'success' ? 'LUNAS' : 'PENDING'})`
      : 'Transfer Bank Manual (BCA/Mandiri)';

    const text = `Halo mhAb Travel! Saya ingin memesan paket tour:\n\n` +
      `*Nama:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*No. HP/WA:* ${phone}\n` +
      `*Paket Wisata:* ${selectedPkg.name}\n` +
      `*Tanggal:* ${selectedDate} Juli 2026\n` +
      `*Jumlah Peserta:* ${selectedPkg.category === 'mobil' ? 'Sewa Mobil' : `${paxAdult} Dewasa, ${paxChild} Anak`}\n` +
      `*Add-ons:* ${[
        addOnExtraHotel ? 'Extra Malam Hotel' : '',
        addOnAirportTransfer ? 'Airport Transfer' : '',
        addOnPrivateGuide ? 'Private Guide/Fotografer' : ''
      ].filter(Boolean).join(', ') || 'Tidak Ada'}\n` +
      `*Pilihan Bayar:* ${paymentOption === 'dp' ? 'DP 30% (Lunas saat Trip)' : 'Full Payment (Lunas)'}\n` +
      `*Metode Bayar:* ${paymentMethodText}\n` +
      `*Nomor Tiket:* ${ticketNumber}\n` +
      `*Total Biaya:* ${formatPrice(calculateGrandTotal())}\n` +
      `*Jumlah Tagihan:* ${formatPrice(calculateRequiredPayment())}\n\n` +
      `Mohon bantu konfirmasi pesanan saya ya. Terima kasih! 🙏🌸`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/6281385926888?text=${encodedText}`, '_blank');
  };

  // Days array for Juli 2026 (Wednesday start, 31 days)
  const renderCalendarDays = () => {
    const days = [];
    // Juli 2026 starts on Wednesday, so 2 empty cells (Monday, Tuesday blank)
    for (let i = 0; i < 2; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12" />);
    }
    
    for (let day = 1; day <= 31; day++) {
      const isBooked = FULLY_BOOKED_DAYS.includes(day);
      const isSelected = selectedDate === day;
      
      days.push(
        <button
          key={day}
          type="button"
          disabled={isBooked}
          onClick={() => setSelectedDate(day)}
          className={`h-10 sm:h-12 w-full flex flex-col items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
            isBooked
              ? 'bg-red-50 text-red-300 line-through cursor-not-allowed border border-red-100/50'
              : isSelected
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 ring-2 ring-amber-600 scale-105'
              : 'bg-white hover:bg-amber-50 text-stone-800 hover:text-amber-700 border border-stone-200/60'
          }`}
        >
          <span>{day}</span>
          {isBooked && (
            <span className="text-[7px] text-red-500 absolute bottom-0.5 font-mono leading-none font-bold">FULL</span>
          )}
          {isSelected && (
            <span className="w-1.5 h-1.5 bg-stone-950 rounded-full absolute bottom-1" />
          )}
        </button>
      );
    }
    return days;
  };

  // Step Titles for Progress Indicator
  const stepTitles = [
    'Pilih Paket',
    'Tanggal',
    'Peserta',
    'Add-on',
    'Ringkasan',
    'Data Diri',
    'Metode Bayar',
    'Konfirmasi'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* Backdrop background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (currentStep < 8) onClose();
          }}
          className="absolute inset-0 bg-stone-900/85 backdrop-blur-md"
        />

        {/* Multi-step Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col border border-stone-100 overflow-hidden max-h-[96vh]"
        >
          {/* Close button top right */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors shadow-xs"
          >
            <X size={18} />
          </button>

          {/* Stepper Progress Bar Header */}
          <div className="bg-stone-950 text-white p-4 sm:p-6 border-b border-stone-800">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950">
                  <Compass size={18} className="animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-serif font-extrabold text-sm sm:text-base text-white tracking-wide">
                    Sistem Reservasi Otomatis
                  </h3>
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest leading-none">
                    Multi-Step Smart Wizard • Wisanggeni Tour
                  </p>
                </div>
              </div>

              {/* Graphical steps connector */}
              <div className="relative pt-1">
                {/* Horizontal progress bar background */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-800 -translate-y-1/2 rounded-full z-0" />
                {/* Active progress bar percentage indicator */}
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 -translate-y-1/2 rounded-full z-0 transition-all duration-500" 
                  style={{ width: `${((currentStep - 1) / (stepTitles.length - 1)) * 100}%` }}
                />

                {/* Individual Steps Circles Grid */}
                <div className="relative z-10 flex justify-between items-center">
                  {stepTitles.map((title, index) => {
                    const stepNum = index + 1;
                    const isCompleted = currentStep > stepNum;
                    const isActive = currentStep === stepNum;
                    
                    return (
                      <div key={title} className="flex flex-col items-center">
                        <button
                          type="button"
                          disabled={stepNum > currentStep && currentStep < 8} // only allow jumping backward
                          onClick={() => stepNum < currentStep && setCurrentStep(stepNum)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all ${
                            isCompleted 
                              ? 'bg-amber-500 text-stone-950 shadow-md cursor-pointer'
                              : isActive 
                              ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/30 font-extrabold shadow-lg scale-110 cursor-default'
                              : 'bg-stone-900 text-stone-500 border border-stone-800 cursor-not-allowed'
                          }`}
                        >
                          {isCompleted ? '✓' : stepNum}
                        </button>
                        <span className="hidden md:block text-[9px] font-bold uppercase tracking-wider mt-1.5 font-mono text-stone-400">
                          {title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Core Body: Left layout status, Right steps inputs */}
          <div className="flex-grow flex flex-col lg:flex-row overflow-hidden min-h-0">
            
            {/* Desktop Left status bar panel */}
            <div className="hidden lg:flex w-80 bg-stone-50 border-r border-stone-100 p-6 flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="text-amber-600 font-extrabold uppercase tracking-widest text-[10px] font-mono block mb-1">
                    Ringkasan Pilihan
                  </span>
                  <h4 className="font-serif font-extrabold text-lg text-stone-900">
                    Tiket Reservasi Anda
                  </h4>
                </div>

                {selectedPkg ? (
                  <div className="space-y-4">
                    {/* Tiny thumbnail */}
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xs relative">
                      <img 
                        src={selectedPkg.image} 
                        alt={selectedPkg.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
                      <span className="absolute bottom-2.5 left-2.5 bg-amber-500 text-stone-950 text-[8px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {selectedPkg.type}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider block">Paket Wisata</span>
                      <h5 className="font-bold text-stone-800 text-sm leading-snug">{selectedPkg.name}</h5>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-b border-stone-200/60 py-3 text-xs">
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase font-bold block mb-0.5">Tanggal</span>
                        <span className="font-semibold text-stone-800">
                          {selectedDate ? `${selectedDate} Juli 2026` : '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase font-bold block mb-0.5">Peserta</span>
                        <span className="font-semibold text-stone-800">
                          {selectedPkg.category === 'mobil' ? 'Sewa Mobil' : `${paxAdult} Dewasa, ${paxChild} Anak`}
                        </span>
                      </div>
                    </div>

                    {/* Add-ons List */}
                    <div className="space-y-2">
                      <span className="text-[9px] text-stone-400 uppercase font-bold block">Add-ons Opsional</span>
                      <ul className="text-stone-700 text-xs space-y-1">
                        {addOnExtraHotel && <li className="flex justify-between"><span>🏨 Hotel Extra</span><span>{formatPrice(extraHotelCost)}</span></li>}
                        {addOnAirportTransfer && <li className="flex justify-between"><span>🚗 Airport PP</span><span>{formatPrice(airportTransferCost)}</span></li>}
                        {addOnPrivateGuide && <li className="flex justify-between"><span>📷 Guide & Fotografer</span><span>{formatPrice(privateGuideCost)}</span></li>}
                        {!addOnExtraHotel && !addOnAirportTransfer && !addOnPrivateGuide && (
                          <li className="text-stone-400 italic text-[11px]">Tidak ada tambahan</li>
                        )}
                      </ul>
                    </div>

                    {/* Group Discount Badge */}
                    {getGroupDiscount() > 0 && (
                      <div className="bg-emerald-50 text-emerald-800 rounded-xl p-2.5 border border-emerald-100 flex items-center gap-2 text-[10px] font-bold">
                        <Gift size={14} className="shrink-0 text-emerald-600" />
                        <span>Sore! Diskon Rombongan Rp 150K Aktif! 🎁</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-stone-400 text-xs italic">Menunggu pilihan paket...</p>
                )}
              </div>

              {/* Total Summary Sticky Left */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-stone-400 uppercase font-bold text-[10px] font-mono">Estimasi Total</span>
                  <span className="text-xl font-serif font-extrabold text-amber-700">
                    {formatPrice(calculateGrandTotal())}
                  </span>
                </div>
                <p className="text-[9px] text-stone-400 leading-tight">Biaya jujur tanpa mark-up tersembunyi.</p>
              </div>
            </div>

            {/* Steps interactive layout area */}
            <div className="flex-1 p-5 sm:p-8 overflow-y-auto max-h-[65vh] sm:max-h-[75vh] lg:max-h-full">
              
              {/* Slide effects on step changing */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >

                  {/* STEP 1: PILIH PAKET */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 1 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Pilih Paket atau Layanan Wisata</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Tentukan paket petualangan terbaik Anda. Paket dapat diubah kapan saja.</p>
                      </div>

                      {/* Dropdown for fast select */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-stone-700 block uppercase font-mono">Akses Cepat</label>
                        <select
                          id="package-step-select"
                          value={selectedPkg?.id || ''}
                          onChange={(e) => handlePackageChange(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                        >
                          {TOUR_PACKAGES.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.name} ({formatPrice(pkg.price)} {pkg.category === 'mobil' ? '/12 Jam' : '/pax'})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Responsive Grid Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
                        {TOUR_PACKAGES.map((pkg) => {
                          const isSelected = selectedPkg?.id === pkg.id;
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => handlePackageChange(pkg.id)}
                              className={`p-4 rounded-2xl border text-left flex gap-3 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-50/50 border-amber-500 shadow-md ring-1 ring-amber-500'
                                  : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50/50 shadow-2xs'
                              }`}
                            >
                              <img 
                                src={pkg.image} 
                                alt={pkg.name} 
                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                              />
                              <div className="space-y-1 min-w-0">
                                <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate leading-tight">{pkg.name}</h5>
                                <span className="text-amber-700 font-extrabold text-xs block">
                                  {formatPrice(pkg.price)} <span className="text-[9px] text-stone-400 font-medium">{pkg.category === 'mobil' ? '/Mobil' : '/pax'}</span>
                                </span>
                                <div className="flex items-center gap-1.5 text-[9px] text-stone-500 font-bold">
                                  <span>⏱️ {pkg.duration}</span>
                                  <span>★ {pkg.rating.toFixed(1)}</span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: TANGGAL KEBERANGKATAN */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 2 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Pilih Tanggal Keberangkatan</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Pilih slot tanggal yang masih tersedia di bulan ini (Juli 2026).</p>
                      </div>

                      {/* Custom Mini-Calendar Widget */}
                      <div className="bg-stone-50 p-4 rounded-3xl border border-stone-200/70 max-w-md mx-auto space-y-4">
                        <div className="flex justify-between items-center px-2">
                          <h5 className="font-serif font-extrabold text-stone-900 tracking-wide text-sm sm:text-base">
                            Juli 2026
                          </h5>
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            High Season
                          </span>
                        </div>

                        {/* Calendar Header Weekdays */}
                        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest pb-1 border-b border-stone-200">
                          <div>Sen</div>
                          <div>Sel</div>
                          <div>Rab</div>
                          <div>Kam</div>
                          <div>Jum</div>
                          <div>Sab</div>
                          <div>Min</div>
                        </div>

                        {/* Calendar Grid of Month Days */}
                        <div className="grid grid-cols-7 gap-1.5">
                          {renderCalendarDays()}
                        </div>

                        {/* Legenda warna */}
                        <div className="flex justify-center gap-4 pt-2 text-[10px] font-mono font-bold border-t border-stone-200 text-stone-500">
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-white border border-stone-200" />
                            <span>Tersedia</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-red-50 border border-red-100 text-red-500 leading-none flex items-center justify-center text-[7px] font-extrabold">X</span>
                            <span>Penuh (Full Booked)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                            <span>Terpilih</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: JUMLAH PESERTA */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 3 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Tentukan Jumlah Peserta</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Masukkan rincian jumlah tamu dewasa dan anak-anak yang ikut serta.</p>
                      </div>

                      {selectedPkg?.category === 'mobil' ? (
                        <div className="p-6 bg-amber-50/40 rounded-2xl border border-amber-200/60 max-w-md mx-auto space-y-3">
                          <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
                            <Info size={20} />
                          </div>
                          <h5 className="font-bold text-stone-900 text-sm">Sewa Mobil (Flat Rate)</h5>
                          <p className="text-stone-600 text-xs leading-relaxed">
                            Karena Anda memilih sewa mobil harian ({selectedPkg.name}), tarif dihitung per unit mobil, bukan per orang. Jumlah peserta hanya diperlukan untuk kapasitas tempat duduk armada.
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-extrabold text-stone-700 uppercase">Perkiraan Penumpang:</span>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setPaxAdult(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 rounded-lg bg-white border border-stone-200 font-bold hover:bg-stone-50 flex items-center justify-center cursor-pointer text-stone-800"
                              >
                                -
                              </button>
                              <span className="text-sm font-extrabold text-stone-800 font-mono">{paxAdult}</span>
                              <button
                                type="button"
                                onClick={() => setPaxAdult(prev => Math.min(7, prev + 1))}
                                className="w-8 h-8 rounded-lg bg-white border border-stone-200 font-bold hover:bg-stone-50 flex items-center justify-center cursor-pointer text-stone-800"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-md mx-auto space-y-6">
                          {/* Dewasa Counter */}
                          <div className="bg-white border border-stone-200 rounded-2xl p-4 flex justify-between items-center shadow-2xs">
                            <div>
                              <h5 className="font-bold text-stone-900 text-sm sm:text-base">Dewasa</h5>
                              <p className="text-stone-400 text-xs leading-none mt-1">Usia 12 tahun ke atas</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setPaxAdult(prev => Math.max(selectedPkg?.minPax || 1, prev - 1))}
                                className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 hover:bg-stone-100 flex items-center justify-center font-extrabold text-lg cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-sm sm:text-base font-extrabold font-mono text-stone-900 w-6 text-center">
                                {paxAdult}
                              </span>
                              <button
                                type="button"
                                onClick={() => setPaxAdult(prev => Math.min(30, prev + 1))}
                                className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 hover:bg-stone-100 flex items-center justify-center font-extrabold text-lg cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Anak Counter */}
                          <div className="bg-white border border-stone-200 rounded-2xl p-4 flex justify-between items-center shadow-2xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-stone-900 text-sm sm:text-base">Anak-Anak</h5>
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase font-mono tracking-wide">
                                  Diskon 30%
                                </span>
                              </div>
                              <p className="text-stone-400 text-xs leading-none mt-1">Usia 2 - 12 tahun</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setPaxChild(prev => Math.max(0, prev - 1))}
                                className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 hover:bg-stone-100 flex items-center justify-center font-extrabold text-lg cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-sm sm:text-base font-extrabold font-mono text-stone-900 w-6 text-center">
                                {paxChild}
                              </span>
                              <button
                                type="button"
                                onClick={() => setPaxChild(prev => Math.min(20, prev + 1))}
                                className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 hover:bg-stone-100 flex items-center justify-center font-extrabold text-lg cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {selectedPkg?.minPax && (
                            <p className="text-xs text-amber-600 text-center font-medium">
                              ⚠️ Paket ini membutuhkan minimal <strong>{selectedPkg.minPax}</strong> peserta dewasa.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4: ADD-ONS OPSIONAL */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 4 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Tambah Fasilitas Opsional (Add-ons)</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Dapatkan kenyamanan ekstra selama liburan Anda dengan fasilitas premium kami.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Hotel Add-on */}
                        <button
                          type="button"
                          onClick={() => setAddOnExtraHotel(!addOnExtraHotel)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-44 transition-all cursor-pointer ${
                            addOnExtraHotel 
                              ? 'bg-amber-50/40 border-amber-500 ring-1 ring-amber-500 shadow-md' 
                              : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="w-9 h-9 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
                              <Hotel size={18} />
                            </div>
                            <h5 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">Extra Malam Hotel</h5>
                            <p className="text-[11px] text-stone-400 leading-relaxed">Tambah 1 malam di hotel mitra terbaik kami yang nyaman.</p>
                          </div>
                          <span className="font-extrabold text-xs sm:text-sm text-amber-700 font-mono mt-2">
                            + {formatPrice(extraHotelCost)} <span className="text-[9px] text-stone-400 font-normal">/booking</span>
                          </span>
                        </button>

                        {/* Airport Add-on */}
                        <button
                          type="button"
                          onClick={() => setAddOnAirportTransfer(!addOnAirportTransfer)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-44 transition-all cursor-pointer ${
                            addOnAirportTransfer 
                              ? 'bg-amber-50/40 border-amber-500 ring-1 ring-amber-500 shadow-md' 
                              : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
                              <Navigation size={18} />
                            </div>
                            <h5 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">Airport Transfer PP</h5>
                            <p className="text-[11px] text-stone-400 leading-relaxed">Penjemputan & Pengantaran Bandara Ngurah Rai PP.</p>
                          </div>
                          <span className="font-extrabold text-xs sm:text-sm text-amber-700 font-mono mt-2">
                            + {formatPrice(airportTransferCost)} <span className="text-[9px] text-stone-400 font-normal">/booking</span>
                          </span>
                        </button>

                        {/* Private Guide / Photographer Add-on */}
                        <button
                          type="button"
                          onClick={() => setAddOnPrivateGuide(!addOnPrivateGuide)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-44 transition-all cursor-pointer ${
                            addOnPrivateGuide 
                              ? 'bg-amber-50/40 border-amber-500 ring-1 ring-amber-500 shadow-md' 
                              : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
                              <Camera size={18} />
                            </div>
                            <h5 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">Private Guide & Foto</h5>
                            <p className="text-[11px] text-stone-400 leading-relaxed">Guide khusus yang siap memotret liburan terbaik Anda.</p>
                          </div>
                          <span className="font-extrabold text-xs sm:text-sm text-amber-700 font-mono mt-2">
                            + {formatPrice(privateGuideCost)} <span className="text-[9px] text-stone-400 font-normal">/booking</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: RINGKASAN HARGA */}
                  {currentStep === 5 && selectedPkg && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 5 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Rincian & Ringkasan Harga</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Berikut rincian tagihan transparan pemesanan liburan Anda.</p>
                      </div>

                      {/* Invoice style receipt */}
                      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 space-y-4 font-sans max-w-lg mx-auto shadow-sm">
                        <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
                          <div>
                            <h5 className="font-serif font-extrabold text-stone-800 text-sm sm:text-base">Invoice #NRB-2026</h5>
                            <p className="text-[10px] text-stone-400 font-mono">Diterbitkan: {selectedDate ? `${selectedDate} Juli 2026` : 'Juli 2026'}</p>
                          </div>
                          <span className="text-[10px] bg-amber-500 text-stone-950 font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider">
                            Draft Booking
                          </span>
                        </div>

                        {/* Rincian Line Items */}
                        <div className="space-y-3.5 text-xs text-stone-600">
                          {/* Paket Row */}
                          <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                              <span className="font-bold text-stone-800 block">{selectedPkg.name}</span>
                              <span className="text-[10px] text-stone-400">
                                {selectedPkg.category === 'mobil' 
                                  ? 'Sewa Flat 12 Jam per unit' 
                                  : `${paxAdult} Dewasa × ${formatPrice(selectedPkg.price)}`}
                              </span>
                            </div>
                            <span className="font-bold text-stone-800 font-mono">
                              {formatPrice(selectedPkg.category === 'mobil' ? selectedPkg.price : selectedPkg.price * paxAdult)}
                            </span>
                          </div>

                          {/* Anak-anak Row */}
                          {selectedPkg.category !== 'mobil' && paxChild > 0 && (
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5">
                                <span className="font-bold text-stone-800 block">Peserta Anak-Anak</span>
                                <span className="text-[10px] text-stone-400">
                                  {paxChild} Anak-Anak × {formatPrice(selectedPkg.price * 0.7)} (Diskon 30%)
                                </span>
                              </div>
                              <span className="font-bold text-stone-800 font-mono">
                                {formatPrice((selectedPkg.price * 0.7) * paxChild)}
                              </span>
                            </div>
                          )}

                          {/* Add-on Extra Hotel */}
                          {addOnExtraHotel && (
                            <div className="flex justify-between items-center">
                              <span>🏨 Fasilitas Extra Malam Hotel</span>
                              <span className="font-bold text-stone-800 font-mono">{formatPrice(extraHotelCost)}</span>
                            </div>
                          )}

                          {/* Add-on Airport Transfer */}
                          {addOnAirportTransfer && (
                            <div className="flex justify-between items-center">
                              <span>🚗 Airport Transfer Ngurah Rai PP</span>
                              <span className="font-bold text-stone-800 font-mono">{formatPrice(airportTransferCost)}</span>
                            </div>
                          )}

                          {/* Add-on Private Guide */}
                          {addOnPrivateGuide && (
                            <div className="flex justify-between items-center">
                              <span>📷 Private Guide & Professional Photographer</span>
                              <span className="font-bold text-stone-800 font-mono">{formatPrice(privateGuideCost)}</span>
                            </div>
                          )}

                          {/* Rombongan Group Discount */}
                          {getGroupDiscount() > 0 && (
                            <div className="flex justify-between items-center text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                              <span className="flex items-center gap-1">🎁 Promo Rombongan (Min 4 Orang)</span>
                              <span className="font-mono">- {formatPrice(getGroupDiscount())}</span>
                            </div>
                          )}
                        </div>

                        {/* Grand Total */}
                        <div className="border-t border-stone-200 pt-4 flex justify-between items-center">
                          <span className="text-sm font-extrabold text-stone-950 uppercase tracking-wider font-mono">Total Akhir (IDR)</span>
                          <span className="text-xl sm:text-2xl font-serif font-extrabold text-amber-700 font-mono">
                            {formatPrice(calculateGrandTotal())}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: DATA DIRI */}
                  {currentStep === 6 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 6 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Lengkapi Data Diri Anda</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Mohon isi informasi kontak Anda untuk mengirimkan voucher digital dan koordinasi driver.</p>
                      </div>

                      <div className="space-y-4 max-w-md mx-auto">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-stone-700 block uppercase font-mono">Nama Lengkap</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                              <User size={16} />
                            </span>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Contoh: Reyhan Ridwan"
                              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-semibold"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-stone-700 block uppercase font-mono">Alamat Email</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                              <Mail size={16} />
                            </span>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="reyhan@gmail.com"
                              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                            />
                          </div>
                        </div>

                        {/* WA Phone Input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-stone-700 block uppercase font-mono">No. WhatsApp Aktif</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                              <Phone size={16} />
                            </span>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Contoh: 085123456789"
                              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: METODE PEMBAYARAN */}
                  {currentStep === 7 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-600 uppercase">Langkah 7 dari 8</span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">Pilih Metode Pembayaran</h4>
                        <p className="text-stone-500 text-xs sm:text-sm">Pilih opsi pembayaran yang paling membuat Anda nyaman dan tenang.</p>
                      </div>

                      {/* Part 1: Booking type (DP vs Full) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                        {/* Radio Option 1: DP 30% */}
                        <button
                          type="button"
                          onClick={() => setPaymentOption('dp')}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer ${
                            paymentOption === 'dp'
                              ? 'bg-amber-50/40 border-amber-500 ring-1 ring-amber-500 shadow-md'
                              : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                paymentOption === 'dp' ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
                              }`}>
                                {paymentOption === 'dp' && <span className="w-1.5 h-1.5 bg-stone-950 rounded-full" />}
                              </span>
                              <h5 className="font-bold text-stone-900 text-xs sm:text-sm leading-none">DP 30% (Uang Muka)</h5>
                            </div>
                            <p className="text-[10px] text-stone-400 leading-relaxed pl-6">
                              Bayar uang muka 30% saja untuk mengamankan slot, sisanya saat penjemputan/trip.
                            </p>
                          </div>
                          <span className="font-extrabold text-xs sm:text-sm text-amber-700 pl-6 font-mono">
                            Bayar: {formatPrice(calculateGrandTotal() * 0.3)}
                          </span>
                        </button>

                        {/* Radio Option 2: Full payment */}
                        <button
                          type="button"
                          onClick={() => setPaymentOption('full')}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer ${
                            paymentOption === 'full'
                              ? 'bg-amber-50/40 border-amber-500 ring-1 ring-amber-500 shadow-md'
                              : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                paymentOption === 'full' ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
                              }`}>
                                {paymentOption === 'full' && <span className="w-1.5 h-1.5 bg-stone-950 rounded-full" />}
                              </span>
                              <h5 className="font-bold text-stone-900 text-xs sm:text-sm leading-none">Full Payment (Lunas)</h5>
                            </div>
                            <p className="text-[10px] text-stone-400 leading-relaxed pl-6">
                              Lunasi seluruh tagihan perjalanan sekarang agar liburan tenang.
                            </p>
                          </div>
                          <span className="font-extrabold text-xs sm:text-sm text-amber-700 pl-6 font-mono">
                            Bayar: {formatPrice(calculateGrandTotal())}
                          </span>
                        </button>
                      </div>

                      {/* Part 2: Saluran Pembayaran (Midtrans vs Manual Transfer) */}
                      <div className="space-y-2 max-w-xl mx-auto pt-2 border-t border-stone-100">
                        <label className="text-xs font-bold text-stone-700 block uppercase font-mono">Saluran Pembayaran</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Midtrans Channel */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('midtrans')}
                            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                              paymentMethod === 'midtrans'
                                ? 'bg-amber-50/50 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                                : 'bg-white border-stone-200 hover:border-amber-200'
                            }`}
                          >
                            <span className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              paymentMethod === 'midtrans' ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
                            }`}>
                              {paymentMethod === 'midtrans' && <span className="w-1.5 h-1.5 bg-stone-950 rounded-full" />}
                            </span>
                            <div>
                              <h5 className="font-bold text-stone-900 text-xs sm:text-sm">⚡ Midtrans Payment Gateway</h5>
                              <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                                QRIS (GoPay/Dana/OVO), Virtual Account, Kartu Kredit. Otomatis & instan!
                              </p>
                            </div>
                          </button>

                          {/* Manual Channel */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('manual')}
                            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                              paymentMethod === 'manual'
                                ? 'bg-amber-50/50 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                                : 'bg-white border-stone-200 hover:border-amber-200'
                            }`}
                          >
                            <span className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              paymentMethod === 'manual' ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
                            }`}>
                              {paymentMethod === 'manual' && <span className="w-1.5 h-1.5 bg-stone-950 rounded-full" />}
                            </span>
                            <div>
                              <h5 className="font-bold text-stone-900 text-xs sm:text-sm">🏦 Transfer Bank Manual</h5>
                              <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                                Transfer manual ke rekening BCA/Mandiri kami. Verifikasi manual oleh tim CS kami via WhatsApp.
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Midtrans Info Box */}
                      {paymentMethod === 'midtrans' && (
                        <div className="bg-amber-50/30 border border-amber-200/60 p-5 rounded-2xl max-w-xl mx-auto space-y-4 text-xs leading-relaxed text-stone-700 shadow-2xs">
                          <div className="flex items-center gap-2 text-stone-900 font-bold uppercase tracking-wider text-[11px] font-mono border-b border-stone-200 pb-2">
                            <CreditCard size={15} className="text-amber-600" />
                            <span>Gerbang Pembayaran Instan Midtrans</span>
                          </div>
                          <p>
                            Pembayaran dienkripsi secara aman melalui <strong>Midtrans</strong>. Anda dapat membayar menggunakan:
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-1 rounded-lg text-[9px] border border-stone-200/60">QRIS (GoPay, OVO, ShopeePay, Dana, LinkAja)</span>
                            <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-1 rounded-lg text-[9px] border border-stone-200/60">Virtual Account (BCA, Mandiri, BNI, BRI, Permata)</span>
                            <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-1 rounded-lg text-[9px] border border-stone-200/60">Kartu Kredit & Debit (Visa, Mastercard, JCB)</span>
                            <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-1 rounded-lg text-[9px] border border-stone-200/60">Gerai Alfamart / Indomaret</span>
                          </div>
                          <p className="text-[10px] text-amber-700 font-medium italic">
                            *Setelah mengklik "Bayar Sekarang" di bawah, jendela pembayaran interaktif Midtrans Snap akan langsung terbuka secara instan.
                          </p>
                        </div>
                      )}

                      {/* Bank Transfer Instructions Box */}
                      {paymentMethod === 'manual' && (
                        <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl max-w-xl mx-auto space-y-3 text-xs leading-relaxed text-stone-600">
                          <div className="flex items-center gap-2 text-stone-800 font-bold uppercase tracking-wider text-[11px] font-mono border-b border-stone-200 pb-2">
                            <CreditCard size={15} className="text-amber-600" />
                            <span>Instruksi Transfer Rekening</span>
                          </div>
                          <p>
                            Silakan transfer nominal pembayaran sebesar <strong className="text-amber-700 font-mono text-sm">{formatPrice(calculateRequiredPayment())}</strong> ke salah satu rekening resmi di bawah:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="bg-white p-3 rounded-xl border border-stone-200/60 flex items-center gap-2.5">
                              <span className="bg-blue-600 text-white font-extrabold px-2 py-1 rounded text-[10px] tracking-wider leading-none">BCA</span>
                              <div>
                                <span className="text-[10px] text-stone-400 block font-bold uppercase leading-none">Nomor Rekening</span>
                                <span className="font-mono font-bold text-stone-800">135-0822-124</span>
                                <span className="text-[9px] text-stone-400 block">a.n Wisanggeni Tour Agency</span>
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-stone-200/60 flex items-center gap-2.5">
                              <span className="bg-amber-600 text-stone-950 font-extrabold px-1.5 py-1 rounded text-[9px] tracking-wider leading-none uppercase">MANDIRI</span>
                              <div>
                                <span className="text-[10px] text-stone-400 block font-bold uppercase leading-none">Nomor Rekening</span>
                                <span className="font-mono font-bold text-stone-800">145-00-1282124</span>
                                <span className="text-[9px] text-stone-400 block">a.n Wisanggeni Tour Agency</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] text-amber-600 font-medium italic">
                            *Setelah transfer, simpan bukti struk transfer Anda untuk diunggah/dikirimkan ke tim CS kami melalui link WhatsApp konfirmasi setelah langkah ini.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 8: KONFIRMASI / TICKET */}
                  {currentStep === 8 && selectedPkg && (
                    <div className="space-y-4 text-center">
                      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce mb-3">
                        <CheckCircle2 size={32} />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">Konfirmasi Booking Berhasil!</h4>
                        <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                          Terima kasih, <strong className="text-stone-800">{name}</strong>! Voucher digital boarding pass Anda telah berhasil diterbitkan.
                        </p>
                      </div>

                      {/* Digital Boarding Pass Ticket (Full Details) */}
                      <div className="w-full max-w-md bg-white border border-dashed border-stone-200 rounded-3xl overflow-hidden shadow-xl mx-auto relative text-left">
                        {/* Side notches representing physical ticket punches */}
                        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-50 rounded-full border-r border-stone-200" />
                        <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-50 rounded-full border-l border-stone-200" />

                        {/* Ticket Header */}
                        <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white p-4 sm:p-5 flex justify-between items-center">
                          <div>
                            <h4 className="font-serif font-extrabold tracking-wide text-base sm:text-lg">Wisanggeni Tour</h4>
                            <p className="text-[10px] uppercase opacity-75 font-medium">Layanan Tour & Rental Terpercaya</p>
                          </div>
                          <div className="text-right">
                            <Ticket className="inline-block text-amber-500 shrink-0" size={24} />
                            <p className="text-[10px] font-mono mt-1 text-amber-500 font-bold">{ticketNumber}</p>
                          </div>
                        </div>

                        {/* Ticket Body */}
                        <div className="p-5 sm:p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-3 border-b border-stone-100 pb-3">
                            <div>
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Nama Traveler</span>
                              <span className="text-stone-800 font-bold text-xs sm:text-sm truncate block">{name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">No. HP / WA</span>
                              <span className="text-stone-800 font-mono text-xs sm:text-sm font-medium">{phone}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 border-b border-stone-100 pb-3">
                            <div>
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Paket Pilihan</span>
                              <span className="text-stone-800 font-bold text-xs sm:text-sm block truncate">{selectedPkg.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Keberangkatan</span>
                              <span className="text-stone-800 font-mono text-xs sm:text-sm font-medium">{selectedDate} Juli 2026</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 border-b border-stone-100 pb-3">
                            <div>
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Jumlah Peserta</span>
                              <span className="text-stone-800 font-semibold text-xs sm:text-sm">
                                {selectedPkg.category === 'mobil' ? 'Sewa Mobil' : `${paxAdult} Dewasa, ${paxChild} Anak`}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Metode Bayar</span>
                              <span className="text-emerald-700 font-bold text-xs uppercase bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                                {paymentOption === 'dp' ? 'Uang Muka 30%' : 'Lunas (100%)'}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1">
                            <div>
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Jumlah Transfer</span>
                              <span className="text-base sm:text-lg font-extrabold text-amber-700 font-mono">
                                {formatPrice(calculateRequiredPayment())}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-stone-400 uppercase font-bold block leading-none mb-1">Total Biaya Akhir</span>
                              <span className="text-stone-600 font-bold text-xs sm:text-sm font-mono">{formatPrice(calculateGrandTotal())}</span>
                            </div>
                          </div>

                          {/* Stamp status */}
                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="text-[9px] text-stone-400 font-semibold uppercase block leading-none">Status</span>
                              {paymentMethod === 'midtrans' ? (
                                midtransPaymentStatus === 'success' ? (
                                  <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2.5 py-1 rounded-md inline-block uppercase tracking-wider animate-pulse">
                                    ✓ LUNAS (MIDTRANS)
                                  </span>
                                ) : midtransPaymentStatus === 'pending' ? (
                                  <span className="text-[10px] bg-amber-500 text-stone-950 font-extrabold px-2.5 py-1 rounded-md inline-block uppercase tracking-wider">
                                    ⌛ MENUNGGU BAYAR
                                  </span>
                                ) : (
                                  <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded-md inline-block uppercase tracking-wider">
                                    PENDING PAYMENT
                                  </span>
                                )
                              ) : (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
                                  VOUCHER PENDING VERIFICATION
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col items-center">
                              {/* Fake barcode/QR for visual authenticity */}
                              <div className="w-14 h-14 bg-stone-50 p-1 rounded-md border border-stone-200 flex flex-wrap gap-1 justify-center items-center">
                                <div className="w-5 h-5 bg-stone-900 rounded-xs" />
                                <div className="w-5 h-5 bg-stone-900 rounded-xs" />
                                <div className="w-5 h-5 bg-stone-900 rounded-xs" />
                                <div className="w-3 h-3 bg-stone-400 rounded-xs" />
                              </div>
                              <span className="text-[8px] text-stone-400 font-mono mt-1">E-TICKET</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Midtrans Status Helper Box in Confirmation screen */}
                      {paymentMethod === 'midtrans' && (
                        <div className="max-w-md mx-auto p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-left space-y-2.5 mb-2 text-xs">
                          <h5 className="font-bold text-stone-900 text-[11px] uppercase font-mono tracking-wide text-amber-700 flex items-center gap-1.5">
                            <CreditCard size={14} /> Status Transaksi Midtrans
                          </h5>
                          
                          {midtransMessage && (
                            <p className="text-[10px] text-amber-800 leading-normal font-medium bg-amber-100/50 p-2 rounded-lg">
                              💡 {midtransMessage}
                            </p>
                          )}

                          {midtransPaymentStatus === 'success' ? (
                            <p className="text-emerald-700 font-bold">
                              ✓ Pembayaran Anda telah terverifikasi LUNAS oleh sistem otomatis Midtrans. Tiket Anda aktif sepenuhnya!
                            </p>
                          ) : midtransPaymentStatus === 'pending' ? (
                            <p className="text-amber-700 font-semibold">
                              ⌛ Menunggu Pembayaran. Silakan selesaikan transaksi sesuai instruksi pada aplikasi e-wallet atau bank virtual account Anda.
                            </p>
                          ) : (
                            <div className="space-y-2 text-stone-600">
                              <p className="text-[11px] leading-relaxed">
                                Jendela pembayaran aman Midtrans Snap telah dibuat. Jika jendela popup tidak terbuka, silakan gunakan tombol di bawah ini:
                              </p>
                              
                              <div className="flex flex-wrap gap-2 pt-0.5">
                                {midtransRedirectUrl && (
                                  <a
                                    href={midtransRedirectUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wide transition-all shadow-xs"
                                  >
                                    Bayar Sekarang ↗
                                  </a>
                                )}
                                
                                {midtransMessage && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMidtransPaymentStatus('success');
                                    }}
                                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wide transition-all shadow-xs"
                                  >
                                    Simulasikan Sukses ✓
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action buttons step 8 */}
                      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                        <button
                          id="submit-whatsapp-final"
                          onClick={handleWhatsAppShare}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                        >
                          <Phone size={16} /> Kirim ke WhatsApp Agency
                        </button>
                        <button
                          onClick={onClose}
                          className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 px-6 rounded-2xl transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                        >
                          Tutup Dialog
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Stepper Footer Controls (Back / Next) */}
          {currentStep < 8 && (
            <div className="bg-stone-50 p-4 border-t border-stone-200/60 flex justify-between items-center px-6">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all ${
                  currentStep === 1
                    ? 'text-stone-300 cursor-not-allowed'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-150 cursor-pointer'
                }`}
              >
                <ArrowLeft size={16} /> Kembali
              </button>

              <button
                type="button"
                disabled={isPaymentLoading}
                onClick={handleNextStep}
                className="bg-stone-900 hover:bg-stone-800 active:scale-95 text-amber-400 font-extrabold py-2.5 px-5 sm:px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 group transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {isPaymentLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
                    Menghubungkan...
                  </>
                ) : (
                  <>
                    {currentStep === 7 
                      ? (paymentMethod === 'midtrans' ? 'Bayar Sekarang ⚡' : 'Selesaikan Booking') 
                      : 'Langkah Berikutnya'}
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
