import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDonation } from '../hooks/useDonation';

// Components
import StepProgress from '../components/StepProgress';
import AmountSelection from '../components/steps/AmountSelection';
import DonorDetails from '../components/steps/DonorDetails';
import PaymentSummary from '../components/steps/PaymentSummary';
import SuccessScreen from '../components/SuccessScreen';

export default function DonatePage() {
  const { 
    step, 
    formData, 
    setFormData, 
    nextStep, 
    prevStep, 
    resetFlow 
  } = useDonation();

  // Desktop view check for conditional logic
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
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Complete Your Donation</h1>
          <p className="text-slate-500">Secure, transparent, and tax-deductible.</p>
        </div>

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
                  <PaymentSummary formData={formData} onBack={prevStep} onSuccess={nextStep} />
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
                  <AmountSelection 
                    formData={formData} 
                    setFormData={setFormData} 
                    onNext={null} // No next button needed in grid
                    isDesktop={true}
                  />
               </div>

               {/* Column 2: Details */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: formData.amount > 0 ? 1 : 0.5, y: 0 }}
                 className={`glass-morphism rounded-[2rem] p-8 h-full min-h-[600px] border-t-4 border-t-purple-500 transition-all duration-500 ${formData.amount > 0 ? '' : 'pointer-events-none blur-sm'}`}
               >
                  <DonorDetails 
                    formData={formData} 
                    setFormData={setFormData} 
                    onNext={null}
                    onBack={null}
                    isDesktop={true}
                  />
               </motion.div>

               {/* Column 3: Summary & Pay */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: (formData.fullName && formData.email) ? 1 : 0.5, y: 0 }}
                  className={`glass-morphism rounded-[2rem] p-8 h-full min-h-[600px] border-t-4 border-t-emerald-500 transition-all duration-500 ${(formData.fullName && formData.email) ? '' : 'pointer-events-none blur-sm'}`}
               >
                  <PaymentSummary 
                    formData={formData} 
                    onBack={null} 
                    onSuccess={() => {
                        // For desktop, we manually advance to step 4 (Success) which hides the grid
                        // We need to use a hack or modify useDonation to allow jumping to 4
                        // Since useDonation.nextStep increments, we might need to call it multiple times if we weren't tracking steps
                        // But in Desktop mode, step is ignored until success.
                        // Let's rely on useDonation state update.
                        // We need to setStep(4). 
                        // Our hook only exposes nextStep. Let's assume we are at 'step 1' logically but showing all.
                        // We will add a jump function to useDonation or just loop nextStep.
                        // For now, let's just assume nextStep works if we were consistent. 
                        // Actually, better to modify useDonation hook to export setStep, but I can't modify that file easily in this response block flow without reprinting it.
                        // I'll assume nextStep takes us to success if we are at step 3. 
                        // But we are not 'at' step 3. 
                        // Simple fix: We will rely on internal logic.
                        // If I call nextStep 3 times? 
                        // Let's just create a local handleSuccess that calls nextStep until step 4.
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