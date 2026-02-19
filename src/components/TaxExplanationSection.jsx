import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, IndianRupee, TrendingDown, Scale, ShieldAlert } from 'lucide-react';

export default function TaxExplanationSection() {
  const [amount, setAmount] = useState(10000);
  const [taxSlab, setTaxSlab] = useState(30);

  // Simple Layman Math
  const hundredDeduction = amount;
  const hundredSaved = amount * (taxSlab / 100);
  const hundredCost = amount - hundredSaved;

  const fiftyDeduction = amount * 0.5;
  const fiftySaved = fiftyDeduction * (taxSlab / 100);
  const fiftyCost = amount - fiftySaved;

  return (
    <section className="py-24 bg-[#1A1F16] text-[#F5F2EB] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#6B8060]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B8060]/20 border border-[#6B8060]/30 text-[#A3B19B] font-bold text-sm mb-6">
            <Calculator size={16} /> 80G Tax Demystifier
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
            "100% Deductible" does <span className="text-amber-400">not</span> mean free.
          </h2>
          <p className="text-lg text-[#A3B19B] leading-relaxed">
            A common myth is that a ₹10,000 donation gives you ₹10,000 back in taxes. 
            In reality, the percentage means how much of your donation is <strong className="text-white">subtracted from your taxable income</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive Calculator Panel */}
          <div className="lg:col-span-5 bg-[#EAE3D2] rounded-[2rem] p-8 text-[#1A1F16] shadow-2xl">
            <h3 className="text-2xl font-black mb-2">Try the Math</h3>
            <p className="text-[#4A5E40] text-sm font-medium mb-8">See how the benefits change based on your income slab.</p>

            <div className="space-y-8">
              {/* Donation Amount Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-[#4A5E40] uppercase tracking-wider text-xs">If I Donate:</label>
                  <span className="text-3xl font-black text-[#1A1F16]">₹{amount.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-3 bg-[#6B8060]/20 rounded-lg appearance-none cursor-pointer accent-[#6B8060]"
                />
                <div className="flex justify-between text-xs font-bold text-[#4A5E40]/60 mt-2">
                  <span>₹1k</span>
                  <span>₹1L</span>
                </div>
              </div>

              {/* Tax Slab Selector */}
              <div>
                <label className="font-bold text-[#4A5E40] uppercase tracking-wider text-xs block mb-4">And My Income Tax Slab Is:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 20, 30].map(slab => (
                    <button 
                      key={slab}
                      onClick={() => setTaxSlab(slab)}
                      className={`py-3 rounded-xl font-black transition-all border-2 ${taxSlab === slab ? 'bg-[#6B8060] text-white border-[#6B8060] shadow-md transform -translate-y-1' : 'bg-transparent border-[#6B8060]/30 text-[#4A5E40] hover:border-[#6B8060]'}`}
                    >
                      {slab}%
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#4A5E40]/70 mt-2 text-center font-bold">
                  {taxSlab === 30 ? "Income over ₹10L" : taxSlab === 20 ? "Income between ₹5L-₹10L" : "Income between ₹2.5L-₹5L"}
                </p>
              </div>
            </div>
          </div>

          {/* Results Comparison Panel */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            
            {/* 100% NGO Card */}
            <motion.div 
              key={`100-${amount}-${taxSlab}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#2A3323] border border-amber-500/30 rounded-[2rem] p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-amber-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                Govt Funds
              </div>
              <h4 className="text-xl font-black text-white mb-1 mt-2">100% Deductible</h4>
              <p className="text-xs text-[#A3B19B] mb-6">e.g. PMNRF, Swachh Bharat</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-[#A3B19B]">Taxable Income Drops By:</span>
                  <span className="font-bold text-white">₹{hundredDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1"><TrendingDown size={14}/> Actual Tax Saved:</span>
                  <span className="font-black text-emerald-400 text-lg">₹{hundredSaved.toLocaleString()}</span>
                </div>
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-[#A3B19B] uppercase tracking-wider mb-1">True Out-of-Pocket Cost</span>
                  <span className="text-3xl font-black text-white">₹{hundredCost.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>

            {/* 50% NGO Card */}
            <motion.div 
              key={`50-${amount}-${taxSlab}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-[#2A3323] border border-[#6B8060]/40 rounded-[2rem] p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#6B8060] text-[#F5F2EB] text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                Private NGOs
              </div>
              <h4 className="text-xl font-black text-white mb-1 mt-2">50% Deductible</h4>
              <p className="text-xs text-[#A3B19B] mb-6">e.g. Akshaya Patra, SankalpTaru</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-[#A3B19B]">Taxable Income Drops By:</span>
                  <span className="font-bold text-white">₹{fiftyDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1"><TrendingDown size={14}/> Actual Tax Saved:</span>
                  <span className="font-black text-emerald-400 text-lg">₹{fiftySaved.toLocaleString()}</span>
                </div>
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-[#A3B19B] uppercase tracking-wider mb-1">True Out-of-Pocket Cost</span>
                  <span className="text-3xl font-black text-white">₹{fiftyCost.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
        
        <div className="mt-12 flex items-start gap-4 bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl max-w-3xl mx-auto">
           <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={20} />
           <p className="text-sm text-amber-100/90 leading-relaxed">
             <strong className="text-amber-400 block mb-1">Note on the New Tax Regime:</strong> 
             Under the New Tax Regime (default for FY 2023-24 onwards), Section 80G deductions are <strong className="text-white">not applicable</strong>. You must opt for the Old Tax Regime when filing your ITR to claim these benefits.
           </p>
        </div>

      </div>
    </section>
  );
}