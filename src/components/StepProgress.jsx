import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function StepProgress({ currentStep }) {
  const steps = [
    { id: 1, label: "Select Impact" },
    { id: 2, label: "Your Details" },
    { id: 3, label: "Confirm & Save" }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="relative flex justify-between items-center w-full px-4">
        
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />
        
        {/* Active Progress Track */}
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-1 bg-slate-900 -z-10 transition-all duration-500 rounded-full"
        />

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="relative flex flex-col items-center group cursor-default">
              {/* Circle Indicator */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? '#0f172a' : '#ffffff', // slate-900 : white
                  borderColor: isActive || isCompleted ? '#0f172a' : '#e2e8f0', // slate-900 : slate-200
                  scale: isActive ? 1.2 : 1
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm ${
                  isActive ? 'shadow-lg shadow-indigo-500/20' : ''
                }`}
              >
                {isCompleted ? (
                  <Check size={16} className="text-white" strokeWidth={3} />
                ) : (
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {step.id}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <div className="absolute top-12 w-32 text-center">
                <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-slate-900' : isCompleted ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-6" /> {/* Spacer for labels */}
    </div>
  );
}