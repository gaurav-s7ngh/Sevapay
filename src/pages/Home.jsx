import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, CreditCard, Smartphone, CheckCircle2, Leaf, Globe, Calculator, ArrowRight, ArrowUp, Sparkles, Building2, Trophy, Medal, MessageSquare } from 'lucide-react';
import { useDonation } from '../hooks/useDonation';
import { useTaxCalculator } from '../hooks/useTaxCalculator';
import Navbar from '../components/Navbar';

// Data
const CAUSES = [
  { id: 1, title: "Plant Trees", desc: "Restore nature's balance", category: "Environment", unitCost: 100, icon: Leaf },
  { id: 2, title: "Provide Meals", desc: "Nourish communities", category: "Hunger", unitCost: 50, icon: Heart },
  { id: 3, title: "Fund Education", desc: "Empower minds", category: "Education", unitCost: 1000, icon: Globe },
];

const NGOS = [
  { name: "Green Earth Foundation", focus: "Environment", impact: "2M+ Trees Planted" },
  { name: "Akshaya Patra", focus: "Hunger", impact: "3M+ Daily Meals" },
  { name: "Teach For India", focus: "Education", impact: "100K+ Students" },
];

// Pure Leaderboard Data
const LEADERBOARD = [
  { rank: 1, name: "Aarav Sharma", amount: 1500000, cause: "Plant Trees" },
  { rank: 2, name: "Priya Patel", amount: 850000, cause: "Fund Education" },
  { rank: 3, name: "TechCorp India", amount: 500000, cause: "Provide Meals" },
  { rank: 4, name: "Rohan Gupta", amount: 250000, cause: "Plant Trees" },
  { rank: 5, name: "Anonymous", amount: 100000, cause: "Fund Education" },
  { rank: 6, name: "Neha Singh", amount: 75000, cause: "Provide Meals" },
];

// Dedicated Comments Data
const COMMENTS = [
  { name: "John D.", text: "Keep up the amazing work! For a greener tomorrow.", time: "10 mins ago" },
  { name: "Sarah W.", text: "Happy to help the kids get back to school.", time: "1 hour ago" },
  { name: "Anonymous", text: "Small steps lead to big changes.", time: "3 hours ago" },
  { name: "Amit K.", text: "Dedicated to my grandfather.", time: "5 hours ago" },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const { formData, setFormData, resetFlow } = useDonation();
  const [taxRegime, setTaxRegime] = useState('old'); 
  const { saved } = useTaxCalculator(formData.amount, taxRegime);

  const [count, setCount] = useState(14205432);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [customQty, setCustomQty] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + Math.floor(Math.random() * 5)), 3500);
    const handleScroll = () => setShowScrollTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAmountSelect = (causeId, qty) => {
    const cause = CAUSES.find(c => c.id === causeId);
    setFormData(prev => ({
      ...prev,
      cart: [{ id: cause.id, title: cause.title, unitCost: cause.unitCost, quantity: qty, total: cause.unitCost * qty }],
      amount: cause.unitCost * qty
    }));
  };

  const handleCustomQtyChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setCustomQty(e.target.value);
    if (formData.cart?.[0]) {
      handleAmountSelect(formData.cart[0].id, val);
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  const resetDonation = () => {
    setIsSuccess(false);
    setCustomQty('');
    setIsCustomMode(false);
    resetFlow();
    setFormData({ amount: 0, cart: [], fullName: '', email: '', pan: '' });
  };

  const scrollToDonate = () => document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' });

  const isFormValid = formData.amount > 0 && formData.fullName && formData.email;
  const activeCause = CAUSES.find(c => c.id === formData.cart?.[0]?.id);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#EAE3D2] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="botanical-card p-10 max-w-lg w-full text-center relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-28 h-28 bg-[#6B8060] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#6B8060]/40">
            <CheckCircle2 size={60} className="text-[#F5F2EB]" />
          </motion.div>
          
          <h2 className="text-4xl font-black text-[#1A1F16] mb-3">Impact Cultivated!</h2>
          <p className="text-[#4A5E40] mb-8 text-lg">Thank you, <span className="font-bold text-[#1A1F16]">{formData.fullName}</span>. You just funded <span className="font-bold text-[#1A1F16]">{formData.cart[0].quantity}x {formData.cart[0].title}</span>.</p>
          
          <div className="bg-[#EAE3D2] rounded-2xl p-6 mb-8 text-left border border-[#6B8060]/20">
            <p className="text-sm text-[#4A5E40] font-bold uppercase tracking-widest mb-2">Transaction Receipt</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-black text-[#1A1F16]">₹{formData.amount.toLocaleString()}</p>
                {saved > 0 && <p className="text-sm text-[#4A5E40] font-bold mt-1">+ ₹{saved.toLocaleString()} Est. Tax Saved</p>}
              </div>
              <Sparkles className="text-[#6B8060]" size={30} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={resetDonation} className="py-4 botanical-btn-primary rounded-2xl font-black flex items-center justify-center gap-2 text-sm">
              Donate Again <ArrowRight size={16} />
            </button>
            <button onClick={() => window.location.href='/history'} className="py-4 bg-[#EAE3D2] border-2 border-[#6B8060] text-[#1A1F16] hover:bg-[#dfd7c3] transition-colors rounded-2xl font-black flex items-center justify-center gap-2 text-sm">
              View History
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAE3D2] font-sans relative">
      <Navbar />

      <section className="pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center relative z-10">
        <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-64 h-64 bg-[#6B8060]/10 rounded-full blur-[80px] -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F2EB] border border-[#6B8060]/30 text-[#4A5E40] font-bold text-sm mb-8 shadow-sm">
            <Leaf size={16} className="text-[#6B8060]" /> Nurturing Change Worldwide
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[#1A1F16] tracking-tighter mb-8 leading-[1.1]">
            Grow the Good. <br />
            <span className="text-[#6B8060]">Rooted in Action.</span>
          </h1>
          
          <div className="botanical-card p-8 md:p-10 inline-block mb-12">
            <p className="text-sm md:text-base font-bold text-[#4A5E40] uppercase tracking-[0.2em] mb-4">Total Impact Created</p>
            <div className="flex justify-center items-center gap-2 md:gap-3">
              {count.toString().split('').map((num, i) => (
                <motion.div key={`${i}-${num}`} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-12 h-16 md:w-20 md:h-24 bg-[#EAE3D2] border border-[#6B8060]/20 rounded-xl flex items-center justify-center shadow-inner">
                  <span className="text-4xl md:text-6xl font-black text-[#1A1F16]">{num}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Donation Section */}
      <section id="donate-section" className="max-w-[1400px] mx-auto px-6 py-12 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-16">
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6B8060] text-[#F5F2EB] flex items-center justify-center font-black text-xl shadow-md">1</div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1A1F16]">Choose Your Impact</h2>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {CAUSES.map(cause => {
                  const isSelected = activeCause?.id === cause.id;
                  const Icon = cause.icon;
                  return (
                    <motion.div whileHover={{ y: -4 }} key={cause.id} onClick={() => { handleAmountSelect(cause.id, 1); setIsCustomMode(false); }} 
                      className={`cursor-pointer p-6 rounded-[2rem] transition-all duration-300 border-2 ${isSelected ? `bg-[#F5F2EB] border-[#6B8060] shadow-lg shadow-[#6B8060]/10` : 'bg-[#F5F2EB]/60 border-transparent hover:border-[#6B8060]/30 hover:bg-[#F5F2EB]'}`}>
                      <Icon className={`mb-4 ${isSelected ? `text-[#6B8060]` : 'text-[#4A5E40]/60'}`} size={36} />
                      <h3 className="text-xl font-bold text-[#1A1F16] mb-1">{cause.title}</h3>
                      <p className="text-[#4A5E40] text-xs font-medium mb-3">{cause.desc}</p>
                      <div className={`text-sm font-black ${isSelected ? `text-[#4A5E40]` : 'text-[#1A1F16]'}`}>₹{cause.unitCost.toLocaleString()} / unit</div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {activeCause && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="botanical-card p-8">
                    <p className="font-bold text-[#1A1F16] mb-5 text-lg">How many units of <span className="text-[#4A5E40]">{activeCause.title}</span>?</p>
                    <div className="flex flex-wrap gap-3">
                      {[1, 5, 10, 50, 100].map(qty => (
                        <button key={qty} onClick={() => { setIsCustomMode(false); handleAmountSelect(activeCause.id, qty); }} 
                          className={`px-6 py-4 rounded-2xl font-black text-lg transition-all ${!isCustomMode && formData.cart[0]?.quantity === qty ? 'bg-[#6B8060] text-[#F5F2EB] shadow-md' : 'bg-[#EAE3D2] text-[#4A5E40] hover:bg-[#dfd7c3] border border-[#6B8060]/20'}`}>
                          {qty}
                        </button>
                      ))}
                      
                      {!isCustomMode ? (
                        <button onClick={() => { setIsCustomMode(true); setCustomQty(''); }} className="px-6 py-4 rounded-2xl font-black text-lg bg-[#EAE3D2] text-[#4A5E40] hover:bg-[#dfd7c3] border border-[#6B8060]/20 transition-all">
                          Custom
                        </button>
                      ) : (
                        <div className="relative flex items-center">
                          <input type="number" min="1" autoFocus value={customQty} onChange={handleCustomQtyChange} placeholder="Enter qty" 
                            className="w-32 px-6 py-4 bg-[#F5F2EB] border-2 border-[#6B8060] rounded-2xl font-black text-[#1A1F16] text-lg focus:outline-none" />
                          <span className="absolute right-4 text-[#4A5E40] font-bold text-sm pointer-events-none">units</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={`space-y-8 transition-opacity duration-500 ${formData.amount > 0 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4A5E40] text-[#F5F2EB] flex items-center justify-center font-black text-xl shadow-md">2</div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1A1F16]">Your Details & Tax</h2>
              </div>
              
              <div className="botanical-card p-8 space-y-6">
                
                <div className="bg-[#EAE3D2] p-6 rounded-2xl border border-[#6B8060]/20 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="text-[#4A5E40]" />
                    <h3 className="font-bold text-[#1A1F16]">Select Tax Regime (For 80G Deductions)</h3>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setTaxRegime('old')} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${taxRegime === 'old' ? 'border-[#4A5E40] bg-[#4A5E40]/10 text-[#1A1F16]' : 'border-transparent bg-[#F5F2EB] text-[#4A5E40] hover:border-[#6B8060]/40'}`}>
                      Old Regime <span className="block text-xs font-normal opacity-80">Tax Benefits Applicable</span>
                    </button>
                    <button onClick={() => setTaxRegime('new')} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${taxRegime === 'new' ? 'border-[#4A5E40] bg-[#4A5E40]/10 text-[#1A1F16]' : 'border-transparent bg-[#F5F2EB] text-[#4A5E40] hover:border-[#6B8060]/40'}`}>
                      New Regime <span className="block text-xs font-normal opacity-80">No 80G Benefits</span>
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-[#4A5E40] uppercase tracking-wider mb-2 block">Full Name</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="botanical-input" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#4A5E40] uppercase tracking-wider mb-2 block">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="botanical-input" placeholder="jane@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#4A5E40] uppercase tracking-wider mb-2 block">PAN Number (For Receipt)</label>
                    <input type="text" value={formData.pan} onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})} maxLength={10} className="botanical-input uppercase" placeholder="ABCDE1234F" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 botanical-card p-8 md:p-10 border-t-4 border-t-[#6B8060]">
              <h3 className="text-2xl font-black text-[#1A1F16] mb-8 border-b border-[#6B8060]/20 pb-6">Donation Summary</h3>
              
              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-[#4A5E40]">
                  <span className="font-medium text-lg">Contribution</span>
                  <span className="font-black text-[#1A1F16] text-xl">₹{formData.amount.toLocaleString()}</span>
                </div>
                
                <div className="bg-[#6B8060]/10 border border-[#6B8060]/30 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-[#4A5E40] font-bold text-sm">Est. Tax Savings</span>
                    <span className="block text-[#4A5E40]/80 text-xs font-medium mt-0.5">
                      {taxRegime === 'old' ? 'Under Old Regime (80G)' : 'Not applicable in New Regime'}
                    </span>
                  </div>
                  <span className={`font-black text-xl ${saved > 0 ? 'text-[#4A5E40]' : 'text-[#4A5E40]/50'}`}>
                    - ₹{saved?.toLocaleString() || 0}
                  </span>
                </div>

                <div className="h-px bg-[#6B8060]/20 w-full my-6" />
                
                <div className="flex justify-between items-end">
                  <span className="text-[#4A5E40] font-bold uppercase tracking-wider text-sm">Net Cost to You</span>
                  <div className="text-right">
                    <span className="text-5xl font-black text-[#1A1F16] tracking-tight">₹{Math.max(0, formData.amount - (saved || 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <p className="text-xs font-bold text-[#4A5E40] uppercase tracking-widest">Select Payment Method</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setPaymentMethod('razorpay')} className={`py-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold transition-all border-2 ${paymentMethod === 'razorpay' ? 'border-[#6B8060] bg-[#EAE3D2] text-[#1A1F16]' : 'border-transparent bg-[#EAE3D2]/50 text-[#4A5E40] hover:bg-[#EAE3D2]'}`}><CreditCard size={24}/> Razorpay</button>
                  <button onClick={() => setPaymentMethod('phonepe')} className={`py-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold transition-all border-2 ${paymentMethod === 'phonepe' ? 'border-[#6B8060] bg-[#EAE3D2] text-[#1A1F16]' : 'border-transparent bg-[#EAE3D2]/50 text-[#4A5E40] hover:bg-[#EAE3D2]'}`}><Smartphone size={24}/> PhonePe</button>
                </div>
              </div>

              <button 
                onClick={handlePay} 
                disabled={!isFormValid || isProcessing}
                className="w-full py-6 botanical-btn-primary rounded-2xl font-black text-xl disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
              >
                {isProcessing ? "Processing..." : <><ShieldCheck size={28} /> Confirm ₹{formData.amount.toLocaleString()}</>}
              </button>
              
              <p className="text-center text-xs text-[#4A5E40] mt-6 font-medium flex items-center justify-center gap-2">
                <ShieldCheck size={16} /> 100% Secure & Encrypted
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section (Purely Competitive) */}
      <section className="bg-[#F5F2EB] py-24 border-t border-[#6B8060]/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1F16] mb-4 flex items-center justify-center gap-3">
              <Trophy className="text-[#6B8060]" size={40} /> Top Cultivators
            </h2>
            <p className="text-[#4A5E40] text-lg max-w-2xl mx-auto">The individuals and organizations making the largest impact.</p>
          </div>
          
          <div className="bg-[#EAE3D2] rounded-[2rem] border border-[#6B8060]/20 overflow-hidden shadow-sm">
            {LEADERBOARD.map((donor, idx) => {
              const isTop3 = donor.rank <= 3;
              return (
                <div key={idx} className={`flex items-center justify-between p-6 ${idx !== LEADERBOARD.length - 1 ? 'border-b border-[#6B8060]/10' : ''} hover:bg-[#F5F2EB]/50 transition-colors`}>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center font-black text-xl">
                      {donor.rank === 1 ? <Medal size={36} className="text-yellow-600" /> : 
                       donor.rank === 2 ? <Medal size={32} className="text-slate-400" /> : 
                       donor.rank === 3 ? <Medal size={28} className="text-amber-700" /> : 
                       <span className="text-[#4A5E40] opacity-50">#{donor.rank}</span>}
                    </div>
                    <div>
                      <h3 className={`font-black text-lg ${isTop3 ? 'text-[#1A1F16]' : 'text-[#4A5E40]'}`}>{donor.name}</h3>
                      <p className="text-[#6B8060] text-sm font-bold uppercase">{donor.cause}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black ${isTop3 ? 'text-2xl text-[#1A1F16]' : 'text-xl text-[#4A5E40]'}`}>₹{donor.amount.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner NGOs Section */}
      <section className="py-24 border-t border-[#6B8060]/20">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1F16] mb-4">Our Root Partners</h2>
            <p className="text-[#4A5E40] text-lg max-w-2xl mx-auto">Verified, high-impact organizations on the ground.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {NGOS.map((ngo, idx) => (
              <div key={idx} className="botanical-card p-8">
                <div className="w-20 h-20 mx-auto bg-[#EAE3D2] rounded-2xl flex items-center justify-center shadow-inner mb-6 text-[#6B8060]">
                  <Building2 size={40} />
                </div>
                <h3 className="text-xl font-black text-[#1A1F16] mb-2">{ngo.name}</h3>
                <p className="text-sm font-bold text-[#6B8060] uppercase tracking-wider mb-2">{ngo.focus}</p>
                <p className="text-[#4A5E40]">{ngo.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Comments Wall */}
      <section className="bg-[#1A1F16] py-24 text-[#F5F2EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-[#6B8060]/30 pb-8">
            <div>
              <h2 className="text-4xl font-black flex items-center gap-3 mb-2">
                <MessageSquare className="text-[#6B8060]" size={36} /> Community Wall
              </h2>
              <p className="text-[#A3B19B] text-lg">Words of encouragement from our recent donors.</p>
            </div>
            <button onClick={scrollToDonate} className="mt-6 md:mt-0 px-6 py-3 bg-[#6B8060] hover:bg-[#A3B19B] text-[#1A1F16] font-bold rounded-xl transition-colors">
              Add Your Voice
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMENTS.map((comment, idx) => (
              <div key={idx} className="bg-[#EAE3D2]/10 p-6 rounded-[2rem] border border-[#6B8060]/30">
                <p className="text-[#F5F2EB] text-lg mb-4 italic leading-relaxed">"{comment.text}"</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold text-[#6B8060]">{comment.name}</span>
                  <span className="text-[#A3B19B] text-xs">{comment.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToDonate}
            className="fixed bottom-8 right-8 z-50 px-6 py-4 botanical-btn-primary rounded-full font-bold flex items-center gap-2 shadow-2xl"
          >
            <ArrowUp size={20} /> Donate Now
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}