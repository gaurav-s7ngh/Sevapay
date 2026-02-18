import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Heart, Shield, TrendingUp } from 'lucide-react';

// --- CONFIGURATION ---
const PRESETS = [
  { value: 100, label: "🌱 Seed", impact: "3 meals provided" },
  { value: 500, label: "📚 Learn", impact: "1 week of school" },
  { value: 1000, label: "💊 Care", impact: "Medical kit funded" },
  { value: 2500, label: "🏥 Heal", impact: "Full surgery sponsor" },
];

// --- SUB-COMPONENT: TRANSPARENCY BREAKDOWN ---
// This is your "Innovation" - Real-time fund splitting visualization
const TransparencyBreakdown = ({ amount }) => {
  if (!amount) return null;

  // Logic: 70% Direct Aid, 20% Logistics/Ops, 10% Platform/Fees
  const aid = Math.round(amount * 0.7);
  const ops = Math.round(amount * 0.2);
  const fees = amount - aid - ops;

  return (
    <div className="mt-6 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/60 backdrop-blur-sm">
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-emerald-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Smart Allocation
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 shadow-sm flex items-center gap-1">
           <Shield size={10} /> Verified
        </span>
      </div>
      
      {/* 1. The Stacked Bar Graph Animation */}
      <div className="flex h-3 w-full rounded-full overflow-hidden mb-4 bg-slate-200">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: "70%" }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-emerald-500 h-full relative group" 
        >
          {/* Tooltip logic can go here */}
        </motion.div>
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: "20%" }} 
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="bg-blue-500 h-full" 
        />
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: "10%" }} 
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="bg-slate-400 h-full" 
        />
      </div>

      {/* 2. The Numerical Legend */}
      <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-200/60">
        <div className="px-1">
           <div className="text-lg font-bold text-slate-900 tracking-tight">₹{aid.toLocaleString()}</div>
           <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Direct Aid</div>
        </div>
        <div className="px-1">
           <div className="text-lg font-bold text-slate-900 tracking-tight">₹{ops.toLocaleString()}</div>
           <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Logistics</div>
        </div>
        <div className="px-1">
           <div className="text-lg font-bold text-slate-900 tracking-tight">₹{fees.toLocaleString()}</div>
           <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Platform</div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function AmountSelection({ formData, setFormData, onNext }) {
  
  // Handle manual input change
  const handleCustomChange = (e) => {
    const val = e.target.value;
    setFormData({ 
      ...formData, 
      amount: val === '' ? '' : parseInt(val) 
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-indigo-100 p-2 rounded-full">
           <Heart size={18} className="text-indigo-600 fill-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Select Contribution</h2>
      </div>
      
      {/* 1. Preset Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {PRESETS.map((preset) => {
          const isSelected = formData.amount === preset.value;
          return (
            <motion.button
              key={preset.value}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, amount: preset.value })}
              className={`
                relative p-4 rounded-2xl text-left border transition-all duration-300 overflow-hidden group
                ${isSelected 
                  ? "border-indigo-500 bg-indigo-50/80 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500" 
                  : "border-slate-200 bg-white/60 hover:border-indigo-300 hover:bg-white hover:shadow-md"
                }
              `}
            >
              {/* Checkmark Badge */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-3 right-3 bg-indigo-600 rounded-full p-1"
                  >
                    <Check size={10} className="text-white" strokeWidth={4} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block transition-colors ${isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                {preset.label}
              </span>
              <div className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">
                ₹{preset.value.toLocaleString()}
              </div>
              <div className={`text-[10px] font-medium inline-block px-2 py-0.5 rounded-md transition-colors ${isSelected ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                {preset.impact}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* 2. Custom Amount Input */}
      <div className="mb-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block pl-1">
          Custom Amount
        </label>
        <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg group-focus-within:text-indigo-500 transition-colors">
              ₹
            </span>
            <input 
                type="number"
                value={formData.amount}
                onChange={handleCustomChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-4 text-xl font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                placeholder="0"
            />
        </div>
      </div>

      {/* 3. The "Innovation": Real-time Transparency Breakdown */}
      <AnimatePresence>
        {formData.amount > 0 && (
           <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.3 }}
           >
              <TransparencyBreakdown amount={formData.amount} />
           </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Continue Button */}
      <div className="mt-auto pt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!formData.amount || formData.amount <= 0}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
        >
          <span>Continue</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}