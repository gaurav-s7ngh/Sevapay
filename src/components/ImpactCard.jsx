import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';

export default function ImpactCard({ cause, isSelected, onSelect, quantity, onUpdateQuantity }) {
  const progress = (cause.raised / cause.goal) * 100;

  const handleIncrement = (e) => {
    e.stopPropagation();
    onUpdateQuantity(cause.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) onUpdateQuantity(cause.id, quantity - 1);
  };

  return (
    <motion.div
      layout
      onClick={() => onSelect(cause.id)}
      className={`relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer group flex flex-col
        ${isSelected 
          ? 'border-indigo-600 bg-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-600' 
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
        }`}
    >
      {/* Progress Bar - Thinner */}
      <div className="absolute top-0 left-0 h-0.5 bg-slate-100 w-full">
        <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
      </div>

      {/* COMPACT PADDING: p-3 instead of p-5 */}
      <div className="p-3 flex flex-col h-full">
        
        {/* Header: Tighter margin */}
        <div className="flex justify-between items-center mb-1">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
            {cause.category}
          </span>
          {isSelected && (
            <div className="bg-indigo-600 text-white p-0.5 rounded-full">
               <Check size={10} strokeWidth={3} />
            </div>
          )}
        </div>

        {/* Title & Desc: Tighter leading and margins */}
        <h3 className="text-sm font-bold text-slate-900 leading-tight mb-0.5">{cause.title}</h3>
        <p className="text-xs text-slate-500 mb-2 line-clamp-1 leading-relaxed">{cause.desc}</p>

        {/* Footer: Compact Price & Buttons */}
        <div className="pt-2 border-t border-slate-50 flex items-center justify-between mt-auto">
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Cost</div>
            <div className="text-sm font-extrabold text-slate-900">₹{cause.unitCost.toLocaleString()}</div>
          </div>

          {/* Quantity Controls - Compact */}
          {isSelected ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-md shadow-md"
            >
              <button onClick={handleDecrement} className="p-1 text-white hover:bg-white/20 rounded-sm transition"><Minus size={12} /></button>
              <span className="font-bold text-white w-5 text-center text-xs tabular-nums">{quantity}</span>
              <button onClick={handleIncrement} className="p-1 text-white hover:bg-white/20 rounded-sm transition"><Plus size={12} /></button>
            </motion.div>
          ) : (
             <button className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                <Plus size={14} />
             </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}