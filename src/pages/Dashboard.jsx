import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Download, Heart } from 'lucide-react';
import { useDonation } from '../hooks/useDonation';

export default function Dashboard() {
  const { history } = useDonation(); // Use the hook to access shared history

  // Calculate real totals
  const totalDonated = history.reduce((sum, item) => sum + item.amount, 0);
  const totalUnits = history.reduce((sum, item) => sum + item.units, 0);
  const totalTaxSaved = Math.round(totalDonated * 0.15);

  const stats = [
    { 
      label: "Total Donated", 
      value: `₹${totalDonated.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "Impact Created", 
      value: `${totalUnits} Units`, 
      icon: Heart, 
      color: "text-rose-600", 
      bg: "bg-rose-50" 
    },
    { 
      label: "Tax Saved (80G)", 
      value: `₹${totalTaxSaved.toLocaleString()}`, 
      icon: Download, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-8">
        
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Your Impact Dashboard</h1>
                <p className="text-slate-500 mt-1">Track your contributions and download tax certificates.</p>
            </div>
            <button className="hidden md:block bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition">
                Export Report
            </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
                    <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 80G Certificate Section */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-slate-900/10">
           <div className="mb-4 md:mb-0 text-center md:text-left">
             <h3 className="font-bold text-xl mb-1">FY 2024-25 Tax Certificate</h3>
             <p className="text-sm text-slate-400">Consolidated 80G receipt for all your donations.</p>
           </div>
           <button 
             disabled={history.length === 0}
             className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-slate-100 transition-colors flex items-center gap-2"
           >
             <Download size={18} />
             Download Summary
           </button>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg">Contribution History</h3>
          </div>
          
          <div className="divide-y divide-slate-100">
            {history.length === 0 ? (
              <div className="p-16 text-center">
                <Heart size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-medium">No contributions found yet.</p>
                <a href="/donate" className="text-indigo-600 font-bold mt-2 hover:underline inline-block">
                  Make your first donation
                </a>
              </div>
            ) : (
                <div className="w-full text-left">
                    <div className="hidden md:grid grid-cols-4 px-6 py-3 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div>Cause</div>
                        <div>Date</div>
                        <div>Impact</div>
                        <div className="text-right">Amount</div>
                    </div>
                    {history.map((item) => (
                        <div key={item.id} className="p-6 md:py-4 md:px-6 flex flex-col md:grid md:grid-cols-4 gap-2 md:gap-0 items-start md:items-center hover:bg-slate-50 transition-colors">
                            <div className="font-bold text-slate-900">{item.causeTitle}</div>
                            <div className="text-sm text-slate-500">{item.date}</div>
                            <div className="text-sm text-slate-600">
                                <span className="inline-block px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">{item.units} Units</span>
                            </div>
                            <div className="text-right w-full md:w-auto">
                                <span className="font-bold text-indigo-600">₹{item.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}