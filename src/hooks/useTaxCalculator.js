import { useState, useMemo } from 'react';
import { calculateTaxSavings } from '../lib/taxLogic';

export const useTaxCalculator = (cart = [], regime = 'old') => {
  // Defaulting to ₹12,00,000 to show the 30% to 20% slab drop nicely
  const [income, setIncome] = useState(1200000); 

  const metrics = useMemo(() => {
    return calculateTaxSavings(cart, income, regime);
  }, [cart, income, regime]);

  return { 
    ...metrics, // Spreads: totalDonation, deductibleAmount, taxBefore, taxAfter, taxSaved, effectiveCost
    income, 
    setIncome 
  };
};