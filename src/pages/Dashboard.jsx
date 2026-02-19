import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, Leaf, Heart, Globe, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

// Enriched Mock Transaction Data (Added donor info for receipts)
const TRANSACTIONS = [
  { id: "TXN-847291", date: "Oct 24, 2025", cause: "Plant Trees", amount: 5000, regime: "Old", taxSaved: 750, status: "Success", icon: Leaf, donorName: "Aarav Sharma", email: "aarav@example.com", pan: "ABCDE1234F" },
  { id: "TXN-392810", date: "Sep 12, 2025", cause: "Provide Meals", amount: 1500, regime: "Old", taxSaved: 225, status: "Success", icon: Heart, donorName: "Aarav Sharma", email: "aarav@example.com", pan: "ABCDE1234F" },
  { id: "TXN-102938", date: "Jun 05, 2025", cause: "Fund Education", amount: 10000, regime: "New", taxSaved: 0, status: "Success", icon: Globe, donorName: "Aarav Sharma", email: "aarav@example.com", pan: "ABCDE1234F" },
];

export default function Dashboard() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handlePrintReceipt = (txn) => {
    setSelectedReceipt(txn);
    // Use a tiny timeout to allow React to render the hidden receipt before triggering print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#EAE3D2] font-sans pt-32 pb-20 relative print:bg-white print:p-0">
      
      {/* CSS to isolate the receipt during printing */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-receipt, #print-receipt * { visibility: visible; }
          #print-receipt { position: absolute; left: 0; top: 0; width: 100%; max-width: 100%; padding: 40px; margin: 0; background: white; border: none; box-shadow: none; border-radius: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="no-print">
        <Navbar />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 no-print">
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
                        <button 
                          onClick={() => handlePrintReceipt(txn)}
                          className="inline-flex items-center gap-2 text-[#4A5E40] hover:text-[#6B8060] font-bold text-sm transition-colors py-2 px-4 rounded-lg hover:bg-[#6B8060]/10"
                        >
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

      {/* 🧾 HIDDEN RECEIPT FOR PRINTING */}
      {selectedReceipt && (
        <div id="print-receipt" className="hidden print:block bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-[#6B8060]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldCheck size={200} />
            </div>

            <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-8 relative z-10">
               <div>
                 <h2 className="text-3xl font-black text-[#1A1F16]">80G Tax Receipt</h2>
                 <p className="text-gray-500 mt-1 font-medium">Official certificate for tax deduction claims.</p>
                 <p className="text-[#6B8060] font-bold mt-2 flex items-center gap-1">
                   <selectedReceipt.icon size={16} /> Cause: {selectedReceipt.cause}
                 </p>
               </div>
               <div className="text-right">
                 <h3 className="text-xl font-extrabold tracking-tight text-[#1A1F16]">
                  Seva<span className="text-[#6B8060]">Pay</span>
                 </h3>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10 text-sm relative z-10">
               <div>
                 <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Donor Details</p>
                 <p className="font-bold text-[#1A1F16] text-xl mb-1">{selectedReceipt.donorName}</p>
                 <p className="text-gray-600 mb-1">{selectedReceipt.email}</p>
                 <p className="text-gray-600 font-mono mt-2 bg-gray-50 inline-block px-3 py-1 rounded-md border border-gray-100">PAN: {selectedReceipt.pan || 'Not Provided'}</p>
               </div>
               <div className="text-right">
                 <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Donation Summary</p>
                 <p className="font-black text-4xl text-[#6B8060] mb-2">₹{selectedReceipt.amount.toLocaleString()}</p>
                 <p className="text-gray-600 font-medium">{selectedReceipt.date}</p>
                 <p className="text-gray-400 font-mono text-xs mt-2">Txn ID: {selectedReceipt.id}</p>
               </div>
            </div>

            <div className="bg-[#F5F2EB] rounded-2xl p-6 border border-[#6B8060]/20 text-sm relative z-10">
              <p className="text-[#4A5E40] uppercase tracking-widest text-[10px] font-bold mb-4">NGO Details (Required for 80G Claim)</p>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Organization Name</span>
                  <span className="font-bold text-gray-800">SevaPay Foundation</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">80G Registration Number</span>
                  <span className="font-bold text-gray-800 font-mono tracking-wide">80G-DEL-2023-9876</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">NGO PAN</span>
                  <span className="font-bold text-gray-800 font-mono tracking-wide">AAATN1234E</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Registered Address</span>
                  <span className="font-bold text-gray-800 leading-snug block">123, Green Valley, Cyber Hub, Delhi, India</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-10 flex flex-col items-center justify-center">
               <p className="text-xs text-gray-400 max-w-sm">This is a computer-generated receipt and does not require a physical signature.</p>
            </div>
        </div>
      )}

    </div>
  );
}