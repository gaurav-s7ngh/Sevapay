import { useState, useEffect } from 'react';

export function useTaxCalculator(amount, regime = 'old') {
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    if (!amount || amount <= 0) {
      setSaved(0);
      return;
    }

    if (regime === 'new') {
      // Under the New Tax Regime in India, Chapter VI-A deductions (including 80G) are generally NOT allowed.
      setSaved(0);
    } else {
      // Old Regime Calculation: Assuming user falls in 30% tax bracket 
      // and the NGO offers a 50% deduction under section 80G.
      // Savings = Amount * 50% (deductible portion) * 30% (tax rate)
      const estimatedSavings = amount * 0.5 * 0.3;
      setSaved(estimatedSavings);
    }
  }, [amount, regime]);

  return { saved };
}