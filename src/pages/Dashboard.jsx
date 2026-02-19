import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, Leaf, Heart, Globe, ShieldCheck, Layers, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useDonation } from '../hooks/useDonation';

export default function Dashboard() {
  const { history } = useDonation();
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handlePrintReceipt = (txn) => {
    setSelectedReceipt(txn);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Dynamically calculate lifetime stats from actual history
  const totalDonated = history.reduce((sum, txn) => sum + txn.amount, 0);
  // Approximating total tax saved (assuming ~15% for old regime average on 80G)
  const totalTaxSaved = history.reduce((sum, txn) => sum + Math.round(txn.amount * 0.15), 0);

  // Helper function to get the correct icon based on cause title
  const getCauseIcon = (title) => {
    if (!title) return Leaf;
    if (title.toLowerCase().includes('tree')) return Leaf;
    if (title.toLowerCase().includes('meal')) return Heart;
    if (title.toLowerCase().includes('education')) return Globe;
    return Leaf;
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

        {/* Dynamic Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="botanical-card p-6">
            <p className="text-sm font-bold text-[#4A5E40] uppercase tracking-wider mb-2">Total Donated</p>
            <p className="text-4xl font-black text-[#1A1F16]">₹{totalDonated.toLocaleString()}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="botanical-card p-6">
            <p className="text-sm font-bold text-[#4A5E40] uppercase tracking-wider mb-2">Est. Tax Saved</p>
            <p className="text-4xl font-black text-[#6B8060]">₹{totalTaxSaved.toLocaleString()}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="botanical-card p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#4A5E40] uppercase tracking-wider mb-2">Consolidated 80G</p>
              <p className="text-lg font-bold text-[#1A1F16]">FY 2025-26</p>
            </div>
            <button 
              disabled={history.length === 0}
              className="w-12 h-12 bg-[#6B8060]/10 text-[#6B8060] rounded-xl flex items-center justify-center hover:bg-[#6B8060] hover:text-[#F5F2EB] transition-colors disabled:opacity-50 disabled:hover:bg-[#6B8060]/10 disabled:hover:text-[#6B8060]"
            >
              <Download size={24} />
            </button>
          </motion.div>
        </div>

        {/* Real-time Ledger Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="botanical-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#6B8060]/10 border-b border-[#6B8060]/20">
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Date & ID</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Cause(s)</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider">Amount</th>
                  <th className="p-5 text-xs font-bold text-[#4A5E40] uppercase tracking-wider text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6B8060]/10">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-[#4A5E40]">
                      <AlertCircle className="mx-auto mb-3 opacity-50" size={32} />
                      <p className="font-bold text-lg">No impact made yet.</p>
                      <p className="text-sm mt-1">Head to the home page to make your first donation!</p>
                    </td>
                  </tr>
                ) : (
                  history.map((txn, idx) => {
                    // Handle dynamic cause logic (single vs multiple cart items)
                    const isMulti = txn.cart && txn.cart.length > 1;
                    const primaryCause = txn.cart && txn.cart.length > 0 ? txn.cart[0].title : 'Donation';
                    const causeText = isMulti ? `Multiple Causes (${txn.cart.length})` : primaryCause;
                    const CauseIcon = isMulti ? Layers : getCauseIcon(primaryCause);
                    
                    // Generate pseudo-ID if not explicitly set (using timestamp suffix)
                    const displayTxnId = `TXN-${txn.id.toString().slice(-6).toUpperCase()}`;

                    return (
                      <tr key={txn.id || idx} className="hover:bg-[#EAE3D2]/50 transition-colors">
                        <td className="p-5">
                          <p className="font-bold text-[#1A1F16]">{txn.date}</p>
                          <p className="text-xs text-[#4A5E40] font-mono">{displayTxnId}</p>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#6B8060]/10 flex items-center justify-center text-[#6B8060]">
                              <CauseIcon size={14} />
                            </div>
                            <div>
                              <span className="font-bold text-[#1A1F16] block">{causeText}</span>
                              {isMulti && (
                                <span className="text-[10px] text-[#4A5E40] font-bold uppercase tracking-widest block">
                                  {txn.cart.map(c => c.title).join(' • ')}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-5 font-black text-[#1A1F16]">₹{txn.amount.toLocaleString()}</td>
                        <td className="p-5 text-right">
                          <button 
                            onClick={() => handlePrintReceipt({...txn, displayTxnId})}
                            className="inline-flex items-center gap-2 text-[#4A5E40] hover:text-[#6B8060] font-bold text-sm transition-colors py-2 px-4 rounded-lg hover:bg-[#6B8060]/10"
                          >
                            <Receipt size={16} /> <span className="hidden sm:inline">Download</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* 🧾 HIDDEN DYNAMIC RECEIPT FOR PRINTING */}
      {selectedReceipt && (
        <div id="print-receipt" className="hidden print:block bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-[#6B8060]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldCheck size={200} />
            </div>

            <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-8 relative z-10">
               <div>
                 <h2 className="text-3xl font-black text-[#1A1F16]">80G Tax Receipt</h2>
                 <p className="text-gray-500 mt-1 font-medium">Official certificate for tax deduction claims.</p>
               </div>
               <div className="text-right">
                 <h3 className="text-xl font-extrabold tracking-tight text-[#1A1F16]">
                  Seva<span className="text-[#6B8060]">Pay</span>
                 </h3>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 text-sm relative z-10">
               <div>
                 <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Donor Details</p>
                 <p className="font-bold text-[#1A1F16] text-xl mb-1">{selectedReceipt.fullName}</p>
                 <p className="text-gray-600 mb-1">{selectedReceipt.email}</p>
                 <p className="text-gray-600 font-mono mt-2 bg-gray-50 inline-block px-3 py-1 rounded-md border border-gray-100">PAN: {selectedReceipt.pan || 'Not Provided'}</p>
               </div>
               <div className="text-right">
                 <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Grand Total</p>
                 <p className="font-black text-4xl text-[#6B8060] mb-2">₹{selectedReceipt.amount.toLocaleString()}</p>
                 <p className="text-gray-600 font-medium">{selectedReceipt.date}</p>
                 <p className="text-gray-400 font-mono text-xs mt-2">Txn ID: {selectedReceipt.displayTxnId}</p>
               </div>
            </div>

            {/* Iterating over the specific multi-cart array for this transaction */}
            <div className="mb-10 pt-4 border-t border-gray-100 relative z-10">
              <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-3">Itemized Impact Breakdown</p>
              <div className="space-y-2">
                {selectedReceipt.cart?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <span className="text-gray-700 font-medium">{item.quantity}x {item.title}</span>
                    <span className="font-bold text-gray-900">₹{item.total.toLocaleString()}</span>
                  </div>
                ))}
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