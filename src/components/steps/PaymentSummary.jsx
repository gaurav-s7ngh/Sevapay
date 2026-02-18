import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useTaxCalculator } from '../../hooks/useTaxCalculator';

export default function PaymentSummary({ formData, onBack, onSuccess, isDesktop = false }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { saved } = useTaxCalculator(formData.amount);
  const cart = formData.cart || [];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">3. Confirm & Pay</h2>
        <p className="text-sm text-slate-500">Review your cart before donating.</p>
      </div>

      <div className="space-y-4 flex-grow overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
        {/* Cart Items List */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
           {cart.map((item, index) => (
             <div key={item.id} className={`p-4 flex justify-between items-center ${index !== cart.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</p>
                   <p className="font-bold text-slate-900">{item.title}</p>
                   <p className="text-xs text-slate-500">{item.quantity} units x ₹{item.unitCost}</p>
                </div>
                <div className="text-right font-bold text-slate-900">
                   ₹{item.total.toLocaleString()}
                </div>
             </div>
           ))}
           
           <div className="bg-slate-100 px-4 py-3 flex justify-between items-center border-t border-slate-200">
              <span className="text-slate-600 font-bold text-sm">Total Donation</span>
              <span className="text-xl font-extrabold text-slate-900">₹{formData.amount.toLocaleString()}</span>
           </div>
        </div>

        {/* Intelligence Breakdown */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
           <div>
             <div className="flex items-center gap-1.5 mb-1">
               <ShieldCheck size={14} className="text-emerald-500" />
               <span className="text-xs font-bold text-emerald-600 uppercase">Smart Benefit</span>
             </div>
             <p className="text-xs text-slate-500">Est. Tax Savings (80G)</p>
           </div>
           <div className="text-right">
             <span className="block text-emerald-600 font-bold">+ ₹{saved.toLocaleString()}</span>
             <span className="text-[10px] text-slate-400">Effective Cost: ₹{(formData.amount - saved).toLocaleString()}</span>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex gap-2 items-start p-3 mb-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-100 text-[11px] leading-tight">
             <AlertCircle size={14} className="shrink-0 mt-0.5" />
             <p>Payment gateway integration (Razorpay/PhonePe) will be enabled in production.</p>
        </div>

        <div className="flex gap-3">
            {!isDesktop && (
                <button
                onClick={onBack}
                disabled={isProcessing}
                className="px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                <ArrowLeft size={20} />
                </button>
            )}
            
            <button
            onClick={handlePay}
            disabled={isProcessing || !formData.amount}
            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-80 disabled:cursor-not-allowed"
            >
            {isProcessing ? (
                <>
                <Loader2 size={20} className="animate-spin" />
                <span>Processing...</span>
                </>
            ) : (
                <>
                <span>Pay ₹{formData.amount.toLocaleString()}</span>
                <ArrowRight size={18} />
                </>
            )}
            </button>
        </div>
      </div>
    </div>
  );
}