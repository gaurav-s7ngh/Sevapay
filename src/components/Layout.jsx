import React from 'react';
import Navbar from './Navbar';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              Smart<span className="text-indigo-500">Donate</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Empowering change through transparent, outcome-based giving. Join over 14,000 donors making a real difference today.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors"><Icon size={20} /></a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">How it Works</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Browse Causes</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Impact Dashboard</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Legal & Compliance</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Secure Giving</h4>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <p className="text-xs mb-3">All donations are 100% secure and eligible for 80G tax benefits.</p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                <Heart size={12} fill="currentColor" />
                Verified NGOs
              </div>
              <div className="mt-4 text-[10px] text-slate-500">
                Payment Integration Coming Soon (Razorpay/PhonePe)
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} SmartDonate Foundation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}