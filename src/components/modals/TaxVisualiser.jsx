import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronDown, ChevronUp, Download, AlertTriangle } from 'lucide-react';
import { useTaxCalculator } from '../../hooks/useTaxCalculator';

export default function TaxVisualizer({ amount, isOpen, onToggle, isDesktop = false }) {
  const { saved, effectiveCost, income, setIncome, regime, setRegime } = useTaxCalculator(amount);

  const costPercent = Math.max((effectiveCost / amount) * 100, 0);
  const savePercent = Math.min((saved / amount) * 100, 100);

  const VisualizerContent = () => (
    <div className="p-5 md:p-6 space-y-6">
      {/* 1. Header & Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 text-indigo-600">
              <div className="bg-indigo-100 p-1.5 rounded-lg">
                <Calculator size={18} />
              </div>
              <span className="font-bold text-sm uppercase tracking-wide">80G Tax Calculator</span>
           </div>
           
           <div className="flex bg-slate-100 p-1 rounded-lg">
              {['old', 'new'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRegime(r)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${
                    regime === r ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {r} Regime
                </button>
              ))}
           </div>
        </div>

        <div>
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Your Annual Income Slab</label>
           <select 
             value={income} 
             onChange={(e) => setIncome(Number(e.target.value))}
             className="w-full bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
           >
             <option value={500000}>Up to ₹5 Lakhs</option>
             <option value={1000000}>₹5L - ₹10L</option>
             <option value={1500000}>₹10L - ₹15L</option>
             <option value={2000000}>Above ₹15L (Highest Slab)</option>
           </select>
        </div>
      </div>

      {/* Warning for New Regime */}
      {regime === 'new' && (
        <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex gap-3 items-start">
            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
                <p className="text-xs font-bold text-amber-800">No 80G Benefit in New Regime</p>
                <p className="text-[10px] text-amber-700 leading-tight">Current Indian tax laws do not allow 80G deductions under the New Tax Regime.</p>
            </div>
        </div>
      )}

      {/* 2. Visual Bar Chart */}
      <div className="space-y-2">
         <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-500">Total Donation</span>
            <span className="text-slate-900">₹{amount.toLocaleString()}</span>
         </div>
         <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${costPercent}%` }} 
              transition={{ duration: 0.5 }}
              className="h-full bg-slate-800"
            />
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${savePercent}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-emerald-500"
            />
         </div>
         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mt-2">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="text-slate-500">You Pay</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-600">Govt Pays back</span>
             </div>
         </div>
      </div>

      {/* 3. The Big Numbers Card */}
      <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-5 text-white shadow-xl shadow-slate-900/10">
         <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[50px] opacity-30 rounded-full translate-x-10 -translate-y-10" />
         
         <div className="relative z-10 flex items-center justify-between">
            <div>
               <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Total Tax Saved</p>
               <p className="text-2xl font-extrabold text-emerald-400">₹{saved.toLocaleString()}</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Real Cost to You</p>
               <p className="text-xl font-bold text-white">₹{effectiveCost.toLocaleString()}</p>
            </div>
         </div>
         
         <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400">
            <Download size={12} />
            <span>Automated 80G Certificate included</span>
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
    <div className="mt-4 border border-indigo-100 rounded-2xl bg-white/60 backdrop-blur-md overflow-hidden transition-all shadow-sm">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-indigo-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <Calculator size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Calculate Tax Savings</h4>
            <p className="text-[10px] text-slate-500 font-medium">Save up to 50% under 80G</p>
          </div>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-indigo-50 bg-white"
          >
            <VisualizerContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}