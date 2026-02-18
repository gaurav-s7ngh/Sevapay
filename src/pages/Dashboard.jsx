import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Download, Heart, Calendar, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { useDonation } from '../hooks/useDonation';

export default function Dashboard() {
  const { history } = useDonation();

  // FIX: Calculate total units by iterating through the cart of each history item
  const totalDonated = history.reduce((sum, item) => sum + (item.amount || 0), 0);
  
  const totalUnits = history.reduce((sum, item) => {
    // Check if cart exists, then sum quantities of all items in that cart
    const cartUnits = item.cart ? item.cart.reduce((cSum, cItem) => cSum + (cItem.quantity || 0), 0) : 0;
    return sum + cartUnits;
  }, 0);

  const totalTaxSaved = Math.round(totalDonated * 0.15); // Est. 15% saving average

  const stats = [
    { 
      label: "Total Donated", 
      value: `₹${totalDonated.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    { 
      label: "Lives Impacted", 
      value: `${totalUnits} Units`, // Fixed NaN here
      icon: Heart, 
      color: "text-rose-600", 
      bg: "bg-rose-50",
      border: "border-rose-100"
    },
    { 
      label: "Tax Saved (80G)", 
      value: `₹${totalTaxSaved.toLocaleString()}`, 
      icon: Download, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Your Impact Journey</h1>
                <p className="text-slate-500 mt-1">Track your contributions and tax benefits.</p>
            </div>
            <button className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition flex items-center gap-2">
                <Download size={16} />
                <span>Tax Report</span>
            </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-2xl bg-white border ${stat.border} shadow-sm flex items-center gap-4`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Improved Visual History (Timeline) */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Calendar size={20} className="text-slate-400" />
            Contribution History
          </h3>
          
          {history.length === 0 ? (
             <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={24} className="text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-bold mb-1">Your journey begins here</h3>
                <p className="text-slate-500 text-sm mb-6">Make your first donation to see it appear on your timeline.</p>
                <a href="/donate" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                   Make an Impact
                </a>
             </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8 pb-4">
              {history.map((item, index) => {
                const isPhonePe = item.paymentMethod === 'phonepe';
                const PaymentIcon = isPhonePe ? Smartphone : CreditCard;
                
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 md:pl-12"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-sm" />

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                       {/* Card Header */}
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{item.date}</p>
                            <h4 className="text-lg font-bold text-slate-900">Donation of ₹{item.amount?.toLocaleString()}</h4>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${isPhonePe ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                             <PaymentIcon size={12} />
                             {isPhonePe ? 'PhonePe' : 'Razorpay'}
                          </div>
                       </div>

                       {/* Cause Items Grid */}
                       <div className="bg-slate-50 rounded-xl p-3 grid gap-2 mb-4">
                          {item.cart?.map((cItem, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                               <div className="flex items-center gap-2">
                                  <CheckCircle2 size={14} className="text-emerald-500" />
                                  <span className="font-medium text-slate-700">{cItem.title}</span>
                               </div>
                               <span className="text-slate-500 text-xs font-bold">x{cItem.quantity}</span>
                            </div>
                          ))}
                       </div>

                       {/* Footer Actions */}
                       <div className="flex gap-4 border-t border-slate-100 pt-3">
                          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                             <Download size={14} /> Download 80G Receipt
                          </button>
                       </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}