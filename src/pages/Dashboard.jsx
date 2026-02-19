import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, Leaf, Heart, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';

// Mock Transaction Data
const TRANSACTIONS = [
  { id: "TXN-847291", date: "Oct 24, 2025", cause: "Plant Trees", amount: 5000, regime: "Old", taxSaved: 750, status: "Success", icon: Leaf },
  { id: "TXN-392810", date: "Sep 12, 2025", cause: "Provide Meals", amount: 1500, regime: "Old", taxSaved: 225, status: "Success", icon: Heart },
  { id: "TXN-102938", date: "Jun 05, 2025", cause: "Fund Education", amount: 10000, regime: "New", taxSaved: 0, status: "Success", icon: Globe },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#EAE3D2] font-sans pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-black text-[#1A1F16] mb-2">My Impact History</h1>
          <p className="text-[#4A5E40] text-lg">Track your donations, download receipts, and view your tax savings.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="botanical-card p-6">
            <p className="text-sm font-bold text-[#4A5E40] uppercase tracking-wider mb-2">Total Donated</p>
            <p className="text-4xl font-black text-[#1A1F16]">₹16,500</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="botanical-card p-6">
            <p className="text-sm font-bold text-[#4A5E40] uppercase tracking-wider mb-2">Total Tax Saved</p>
            <p className="text-4xl font-black text-[#6B8060]">₹975</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="botanical-card p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#4A5E40] uppercase tracking-wider mb-2">80G Certificate</p>
              <p className="text-lg font-bold text-[#1A1F16]">FY 2025-26</p>
            </div>
            <button className="w-12 h-12 bg-[#6B8060]/10 text-[#6B8060] rounded-xl flex items-center justify-center hover:bg-[#6B8060] hover:text-[#F5F2EB] transition-colors">
              <Download size={24} />
            </button>
          </motion.div>
        </div>

        {/* Ledger Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="botanical-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#6B8060]/10 border-b border-[#6B8060]/20">
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Date & ID</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Cause</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Amount</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Tax Saved</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6B8060]/10">
                {TRANSACTIONS.map((txn, idx) => {
                  const Icon = txn.icon;
                  return (
                    <tr key={idx} className="hover:bg-[#EAE3D2]/50 transition-colors">
                      <td className="p-5">
                        <p className="font-bold text-[#1A1F16]">{txn.date}</p>
                        <p className="text-xs text-[#4A5E40]">{txn.id}</p>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#6B8060]/10 flex items-center justify-center text-[#6B8060]">
                            <Icon size={14} />
                          </div>
                          <span className="font-bold text-[#1A1F16]">{txn.cause}</span>
                        </div>
                      </td>
                      <td className="p-5 font-black text-[#1A1F16]">₹{txn.amount.toLocaleString()}</td>
                      <td className="p-5">
                        <span className="inline-block px-3 py-1 bg-[#6B8060]/10 text-[#6B8060] text-xs font-bold rounded-full">
                          {txn.taxSaved > 0 ? `₹${txn.taxSaved}` : 'N/A'}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="inline-flex items-center gap-2 text-[#4A5E40] hover:text-[#6B8060] font-bold text-sm transition-colors">
                          <Receipt size={16} /> <span className="hidden sm:inline">Download</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}