import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets ---
// Ensure you have a logo.png in src/assets/ or change this path
import logo from './assets/logo.png'; 

// --- Components ---
import LiveCounter from './components/LiveCounter';
import StepProgress from './components/StepProgress';
import AmountSelection from './components/steps/AmountSelection';
import DonorDetails from './components/steps/DonorDetails';
import PaymentSummary from './components/steps/PaymentSummary';
import SuccessScreen from './components/SuccessScreen';

export default function App() {
  // --- STATE ---
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: 1000,
    fullName: '',
    email: '',
    pan: '',
  });

  // --- ACTIONS ---
  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen relative font-sans selection:bg-indigo-500/20 selection:text-indigo-900 pb-20 overflow-x-hidden">
      
      {/* 1. Live Ticker (Floating Pill) */}
      <LiveCounter />

      <main className="max-w-lg mx-auto px-4 pt-4 relative z-10">
        
        {/* 2. Header Section */}
        {step < 4 && (
          <div className="text-center mb-8 relative">
            
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              {/* NOTE: If your logo is dark, add 'brightness-0 invert' to className to make it white */}
              <img 
                src={logo} 
                alt="Company Logo" 
                className="h-10 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" 
                onError={(e) => { e.target.style.display = 'none'; }} // Hides image if missing
              />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2"
            >
              Make an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Impact</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-medium"
            >
              100% Secure. Tax Exempt. Transparent.
            </motion.p>
          </div>
        )}

        {/* 3. The "Masterpiece" Glass Card */}
        <div className="relative group perspective-1000">
          
          {/* Ambient Background Glow (Behind Card) */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="glass-morphism rounded-[2rem] p-6 sm:p-10 relative overflow-hidden min-h-[580px] flex flex-col transition-all duration-300 ring-1 ring-white/60">
            
            {/* Progress Bar (Only show in steps 1-3) */}
            {step < 4 && <StepProgress currentStep={step} />}
            
            {/* Step Content Area */}
            <div className="flex-1 mt-4 relative">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: AMOUNT */}
                {step === 1 && (
                  <motion.div 
                    key="step1" 
                    initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }} 
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} 
                    exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full"
                  >
                    <AmountSelection 
                      formData={formData} 
                      setFormData={setFormData} 
                      onNext={nextStep} 
                    />
                  </motion.div>
                )}

                {/* STEP 2: DETAILS */}
                {step === 2 && (
                  <motion.div 
                    key="step2" 
                    initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }} 
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} 
                    exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full"
                  >
                    <DonorDetails 
                      formData={formData} 
                      setFormData={setFormData} 
                      onNext={nextStep} 
                      onBack={prevStep} 
                    />
                  </motion.div>
                )}

                {/* STEP 3: SUMMARY */}
                {step === 3 && (
                  <motion.div 
                    key="step3" 
                    initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }} 
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} 
                    exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full"
                  >
                    <PaymentSummary 
                      formData={formData} 
                      onBack={prevStep} 
                      onSuccess={nextStep} 
                    />
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS (No container padding for full explosion) */}
                {step === 4 && (
                  <motion.div 
                    key="step4" 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, type: "spring" }}
                    className="h-full flex flex-col justify-center"
                  >
                    <SuccessScreen formData={formData} />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 4. Footer Trust Signals */}
        {step < 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex justify-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
             {/* Visual Placeholders for "Stripe / Visa / Mastercard" */}
             <div className="h-6 w-12 bg-slate-800/10 rounded-md border border-slate-800/5"></div>
             <div className="h-6 w-12 bg-slate-800/10 rounded-md border border-slate-800/5"></div>
             <div className="h-6 w-12 bg-slate-800/10 rounded-md border border-slate-800/5"></div>
             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Secure
             </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}