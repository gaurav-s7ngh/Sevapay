import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, CreditCard, Smartphone } from 'lucide-react';
import { useTaxCalculator } from '../../hooks/useTaxCalculator';

export default function PaymentSummary({ formData, setFormData, onBack, onSuccess, isDesktop = false }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); 
  const cart = formData.cart || [];
  
  // 🌟 NEW: Consuming the progressive variables from the updated hook
  const { taxSaved, effectiveCost } = useTaxCalculator(cart, 'old');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (setFormData) {
        setFormData(prev => ({ ...prev, paymentMethod: paymentMethod }));
      }
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">3. Confirm & Pay</h2>
        <p className="text-sm text-slate-500">Review your cart before donating.</p>
      </div>

      <div className="space-y-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
        
        {/* Cart Items List */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
           {cart.map((item, index) => (
             <div key={item.id} className={`p-4 flex justify-between items-center ${index !== cart.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</p>
                   <p className="font-bold text-slate-900">{item.title}</p>
                   <p className="text-xs text-slate-500">{item.quantity} units x ₹{item.unitCost}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="font-bold text-slate-900">₹{item.total.toLocaleString()}</span>
                   {/* 🌟 NEW: Dynamic deduction badge based on your updated CAUSES array */}
                   {/* Change 80G to Deductible */}
<span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 ${item.deductionRate === 100 ? 'bg-amber-400 text-amber-900' : 'bg-emerald-500 text-white'}`}>
  {item.deductionRate || 50}% Deductible
</span>
                </div>
             </div>
           ))}
           
           <div className="bg-slate-100 px-4 py-3 flex justify-between items-center border-t border-slate-200">
              <span className="text-slate-600 font-bold text-sm">Total Donation</span>
              <span className="text-xl font-extrabold text-slate-900">₹{formData.amount?.toLocaleString()}</span>
           </div>
        </div>

        {/* Intelligence Breakdown */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
           <div>
             <div className="flex items-center gap-1.5 mb-1">
               <ShieldCheck size={14} className="text-emerald-600" />
               <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Smart Benefit</span>
             </div>
             <p className="text-xs text-slate-500">Est. Tax Savings (80G)</p>
           </div>
           <div className="text-right">
             <span className="block text-emerald-600 font-black text-lg">- ₹{taxSaved?.toLocaleString() || 0}</span>
             <span className="text-[10px] font-bold text-slate-500">Effective Cost: ₹{effectiveCost?.toLocaleString() || formData.amount}</span>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-2">
           <h3 className="text-sm font-bold text-slate-900 mb-2">Select Payment Method</h3>
           <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setPaymentMethod('razorpay')}
                className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  paymentMethod === 'razorpay' 
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                   <CreditCard size={16} />
                </div>
                <span className={`text-sm font-bold ${paymentMethod === 'razorpay' ? 'text-blue-700' : 'text-slate-600'}`}>Razorpay</span>
              </div>

              <div 
                onClick={() => setPaymentMethod('phonepe')}
                className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  paymentMethod === 'phonepe' 
                    ? 'bg-purple-50 border-purple-500 ring-1 ring-purple-500 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                   <Smartphone size={16} />
                </div>
                <span className={`text-sm font-bold ${paymentMethod === 'phonepe' ? 'text-purple-700' : 'text-slate-600'}`}>PhonePe</span>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
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
            className={`flex-1 py-4 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-80 disabled:cursor-not-allowed ${
               paymentMethod === 'phonepe' ? 'bg-purple-600 shadow-purple-500/20' : 'bg-slate-900'
            }`}
            >
            {isProcessing ? (
                <>
                <Loader2 size={20} className="animate-spin" />
                <span>Processing...</span>
                </>
            ) : (
                <>
                <span>Pay ₹{formData.amount?.toLocaleString()}</span>
                <ArrowRight size={18} />
                </>
            )}
            </button>
        </div>
      </div>
    </div>
  );
}