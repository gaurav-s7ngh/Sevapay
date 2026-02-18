import { useState, useEffect } from 'react';

const INITIAL_DATA = {
  cart: [], // Now stores array of { id, title, unitCost, quantity, total }
  amount: 0, // Grand total
  fullName: '',
  email: '',
  pan: '',
};

export const useDonation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  
  // Load real history from localStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('sd_donation_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist history
  useEffect(() => {
    localStorage.setItem('sd_donation_history', JSON.stringify(history));
  }, [history]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  
  const resetFlow = () => {
    if (formData.amount > 0) {
      const newEntry = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        timestamp: new Date().toISOString()
      };
      setHistory(prev => [newEntry, ...prev]);
    }
    setStep(1);
    setFormData(INITIAL_DATA);
  };

  return { step, formData, setFormData, history, nextStep, prevStep, resetFlow };
};