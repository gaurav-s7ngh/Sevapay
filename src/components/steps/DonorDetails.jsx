import React from 'react';
import { User, Mail, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';

export default function DonorDetails({ formData, setFormData, onNext, onBack, isDesktop = false }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValid = formData.fullName && formData.email;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">2. Your Details</h2>
        <p className="text-sm text-slate-500">For your 80G tax receipt.</p>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative group">
          <User className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* PAN Input */}
        <div className="relative group">
          <CreditCard className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input
            type="text"
            name="pan"
            placeholder="PAN (Optional)"
            value={formData.pan}
            onChange={handleChange}
            maxLength={10}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all uppercase"
          />
          <span className="absolute right-4 top-4 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
            80G
          </span>
        </div>
      </div>
      
      {/* Decorative content for desktop empty space */}
      {isDesktop && (
          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
             <p className="text-xs text-indigo-800 leading-relaxed">
                <strong>Why do we need this?</strong> <br/>
                To generate your automated 80G Tax Certificate immediately after donation. Your data is encrypted.
             </p>
          </div>
      )}

      {!isDesktop && (
        <div className="mt-auto flex gap-3 pt-6">
          <button
            onClick={onBack}
            className="px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>Review</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}