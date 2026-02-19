import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDonation } from '../hooks/useDonation';
import { ShieldCheck, Building2, Globe } from 'lucide-react';

// Components
import StepProgress from '../components/StepProgress';
import AmountSelection from '../components/steps/AmountSelection';
import DonorDetails from '../components/steps/DonorDetails';
import PaymentSummary from '../components/steps/PaymentSummary';
import SuccessScreen from '../components/SuccessScreen';

// 🌟 NEW: The NGO Deduction Directory
const NGOTaxDirectory = () => (
  <div className="mb-12 glass-morphism rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm bg-white/50">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-emerald-100 p-2.5 rounded-xl">
        <ShieldCheck size={24} className="text-emerald-700" />
      </div>
      <div>
        <h3 className="text-xl font-black text-slate-900">Official 80G Deduction Directory</h3>
        <p className="text-sm text-slate-500">Know your tax benefits before you build your cart.</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* 100% Bracket */}
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-xl shadow-sm">
          100% Exemption
        </div>
        <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-4">
          <Globe size={18} /> Govt. Backed Funds
        </h4>
        <div className="space-y-3">
           <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 flex justify-between items-center">
             <div>
               <span className="block font-bold text-slate-900">National Children's Fund</span>
               <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Fund Education</span>
             </div>
           </div>
        </div>
      </div>

      {/* 50% Bracket */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-xl shadow-sm">
          50% Exemption
        </div>
        <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-4">
          <Building2 size={18} /> Verified Private NGOs
        </h4>
        <div className="space-y-3">
           <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex justify-between items-center">
             <div>
               <span className="block font-bold text-slate-900">SankalpTaru Foundation</span>
               <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Plant Trees</span>
             </div>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex justify-between items-center">
             <div>
               <span className="block font-bold text-slate-900">Akshaya Patra</span>
               <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Provide Meals</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

export default function DonatePage() {
  const { 
    step, 
    formData, 
    setFormData, 
    nextStep, 
    prevStep, 
    resetFlow 
  } = useDonation();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Complete Your Donation</h1>
          <p className="text-slate-500">Secure, transparent, and tax-deductible.</p>
        </div>

        {/* 🌟 New NGO Directory inserted here */}
        {step === 1 && <NGOTaxDirectory />}

        {/* Mobile Wizard View */}
        <div className="md:hidden">
          <StepProgress currentStep={step} />
          <div className="glass-morphism rounded-[2rem] p-6 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <AmountSelection formData={formData} setFormData={setFormData} onNext={nextStep} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <DonorDetails formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <PaymentSummary formData={formData} setFormData={setFormData} onBack={prevStep} onSuccess={nextStep} />
                </motion.div>
              )}
              {step === 4 && (
                 <SuccessScreen formData={formData} onReset={resetFlow} onViewDashboard={() => window.location.href='/dashboard'} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
           {step === 4 ? (
              <div className="max-w-md mx-auto glass-morphism rounded-[2rem] p-12">
                 <SuccessScreen formData={formData} onReset={resetFlow} onViewDashboard={() => window.location.href='/dashboard'} />
              </div>
           ) : (
             <div className="grid grid-cols-3 gap-8 items-start">
               {/* Column 1: Selection */}
               <div className="glass-morphism rounded-[2rem] p-8 h-full min-h-[600px] border-t-4 border-t-indigo-500">
                  <AmountSelection formData={formData} setFormData={setFormData} onNext={null} isDesktop={true} />
               </div>

               {/* Column 2: Details */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: formData.amount > 0 ? 1 : 0.5, y: 0 }}
                 className={`glass-morphism rounded-[2rem] p-8 h-full min-h-[600px] border-t-4 border-t-purple-500 transition-all duration-500 ${formData.amount > 0 ? '' : 'pointer-events-none blur-sm'}`}
               >
                  <DonorDetails formData={formData} setFormData={setFormData} onNext={null} onBack={null} isDesktop={true} />
               </motion.div>

               {/* Column 3: Summary & Pay */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: (formData.fullName && formData.email) ? 1 : 0.5, y: 0 }}
                  className={`glass-morphism rounded-[2rem] p-8 h-full min-h-[600px] border-t-4 border-t-emerald-500 transition-all duration-500 ${(formData.fullName && formData.email) ? '' : 'pointer-events-none blur-sm'}`}
               >
                  <PaymentSummary 
                    formData={formData} 
                    setFormData={setFormData}
                    onBack={null} 
                    onSuccess={() => {
                        let current = step;
                        while(current < 4) {
                            nextStep();
                            current++;
                        }
                    }} 
                    isDesktop={true}
                  />
               </motion.div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}