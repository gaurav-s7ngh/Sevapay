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
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col h-full
        ${isSelected 
          ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-600' 
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
        }`}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-slate-100 w-full">
        <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3 mt-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
            {cause.category}
          </span>
          {isSelected && (
            <div className="bg-indigo-600 text-white p-1 rounded-full">
               <Check size={12} strokeWidth={3} />
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">{cause.title}</h3>
        <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed flex-grow">{cause.desc}</p>

        <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Cost per Unit</div>
            <div className="text-xl font-extrabold text-slate-900">₹{cause.unitCost.toLocaleString()}</div>
          </div>

          {/* Quantity Controls */}
          {isSelected ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg shadow-lg"
            >
              <button onClick={handleDecrement} className="p-2 text-white hover:bg-white/20 rounded-md transition"><Minus size={14} /></button>
              <span className="font-bold text-white w-6 text-center text-sm tabular-nums">{quantity}</span>
              <button onClick={handleIncrement} className="p-2 text-white hover:bg-white/20 rounded-md transition"><Plus size={14} /></button>
            </motion.div>
          ) : (
             <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                <Plus size={20} />
             </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}