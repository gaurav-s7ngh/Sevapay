import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronDown, ChevronUp, Download, AlertTriangle, TrendingDown } from 'lucide-react';
import { useTaxCalculator } from '../../hooks/useTaxCalculator';

export default function TaxVisualizer({ cart, isOpen, onToggle, isDesktop = false, regime, setRegime }) {
  const { 
    totalDonation, 
    taxSaved, 
    effectiveCost, 
    taxBefore, 
    taxAfter, 
    income, 
    setIncome 
  } = useTaxCalculator(cart, regime);

  const costPercent = totalDonation > 0 ? Math.max((effectiveCost / totalDonation) * 100, 0) : 0;
  const savePercent = totalDonation > 0 ? Math.min((taxSaved / totalDonation) * 100, 100) : 0;

  const VisualizerContent = () => (
    <div className="p-5 md:p-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 text-emerald-700">
              <div className="bg-emerald-100 p-1.5 rounded-lg">
                <Calculator size={18} />
              </div>
              <span className="font-black text-sm uppercase tracking-wide">80G Tax Engine</span>
           </div>
        </div>

        <div>
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Your Est. Annual Income</label>
           <select 
             value={income} 
             onChange={(e) => setIncome(Number(e.target.value))}
             className="w-full bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
           >
             <option value={400000}>Up to ₹5L (Zero Tax Bracket)</option>
             <option value={800000}>₹8,00,000 (20% Slab)</option>
             <option value={1200000}>₹12,00,000 (30% Slab)</option>
             <option value={2000000}>₹20,00,000 (Highest Slab)</option>
           </select>
        </div>
      </div>

      {regime === 'new' && (
        <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex gap-3 items-start">
            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
                <p className="text-xs font-bold text-amber-800">No 80G Benefit in New Regime</p>
                <p className="text-[10px] text-amber-700 leading-tight">Switch to the Old Regime to claim these tax deductions.</p>
            </div>
        </div>
      )}

      {/* The Dynamic Progressive Math Breakdown */}
      {regime === 'old' && totalDonation > 0 && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Original Tax Liability</span>
            <span className="text-slate-400 line-through decoration-red-400">₹{taxBefore.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-1"><TrendingDown size={14}/> New Tax Liability</span>
            <span className="text-emerald-700 font-black">₹{taxAfter.toLocaleString()}</span>
          </div>
          {taxAfter === 0 && taxBefore > 0 && (
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded">
              🎉 Your donation dropped your income below ₹5L! (Sec 87A Rebate Applied)
            </div>
          )}
        </div>
      )}

      {/* Visual Bar Chart */}
      <div className="space-y-2">
         <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <motion.div initial={{ width: 0 }} animate={{ width: `${costPercent}%` }} transition={{ duration: 0.5 }} className="h-full bg-slate-800" />
            <motion.div initial={{ width: 0 }} animate={{ width: `${savePercent}%` }} transition={{ duration: 0.5 }} className="h-full bg-emerald-500" />
         </div>
         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mt-2">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="text-slate-500">Real Cost (₹{effectiveCost.toLocaleString()})</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-600">Tax Saved (₹{taxSaved.toLocaleString()})</span>
             </div>
         </div>
      </div>

      {/* The Big Numbers Card */}
      <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-5 text-white shadow-xl shadow-slate-900/10">
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[50px] opacity-20 rounded-full translate-x-10 -translate-y-10" />
         <div className="relative z-10 flex items-center justify-between">
            <div>
               <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Total Tax Saved</p>
               <p className="text-2xl font-extrabold text-emerald-400">₹{taxSaved.toLocaleString()}</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Effective Cost</p>
               <p className="text-xl font-bold text-white">₹{effectiveCost.toLocaleString()}</p>
            </div>
         </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <motion.div layout className="mt-6 border border-slate-200 rounded-[2rem] bg-white overflow-hidden shadow-sm">
        <VisualizerContent />
      </motion.div>
    );
  }

  return (
    <div className="mt-4 border border-emerald-100 rounded-2xl bg-white/60 backdrop-blur-md overflow-hidden transition-all shadow-sm">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-50/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
            <Calculator size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">See Your Tax Savings</h4>
            <p className="text-[10px] text-slate-500 font-medium">Smart calculations based on your slab</p>
          </div>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-emerald-50 bg-white">
            <VisualizerContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}