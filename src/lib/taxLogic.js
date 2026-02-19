export const TAX_REGIMES = {
  OLD: 'old',
  NEW: 'new',
};

/**
 * Calculates progressive tax under the Old Tax Regime.
 * Slabs (Before 4% Cess):
 * 0 - 2.5L      -> 0%
 * 2.5L - 5L     -> 5%
 * 5L - 10L      -> 20%
 * Above 10L     -> 30%
 */
export const calculateOldRegimeTax = (income) => {
  if (income <= 250000) return 0;

  let tax = 0;

  if (income > 1000000) {
    tax += (income - 1000000) * 0.30;
    tax += 500000 * 0.20; // Max tax for 5L-10L bracket (1,000,00)
    tax += 250000 * 0.05; // Max tax for 2.5L-5L bracket (12,500)
  } else if (income > 500000) {
    tax += (income - 500000) * 0.20;
    tax += 250000 * 0.05;
  } else if (income > 250000) {
    tax += (income - 250000) * 0.05;
  }

  // Apply Section 87A Rebate (If taxable income is <= 5L, tax rebate up to ₹12,500)
  if (income <= 500000) {
    tax = Math.max(0, tax - 12500);
  }

  // Add 4% Health & Education Cess
  const cess = tax * 0.04;
  
  return Math.round(tax + cess);
};

/**
 * Modular function to calculate the total 80G deductible amount.
 * Handles the "10% of Adjusted Gross Income" Qualifying Limit.
 */
export const calculate80GDeductible = (cart, adjustedGrossIncome) => {
  let deductibleWithoutLimit = 0;
  let donationSubjectToLimit = 0;

  cart.forEach(item => {
    // Assumption based on standard 80G rules:
    // 100% deduction funds (e.g., PM CARES, National Children's Fund) have NO qualifying limit
    if (item.deductionRate === 100) {
      deductibleWithoutLimit += item.total;
    } 
    // 50% deduction funds (e.g., Standard NGOs) ARE subject to the 10% AGI qualifying limit
    else if (item.deductionRate === 50) {
      donationSubjectToLimit += item.total;
    }
  });

  // Calculate Qualifying Limit (10% of Income)
  const qualifyingLimit = adjustedGrossIncome * 0.10;
  
  // Cap the eligible 50% donation amount to the qualifying limit
  const eligibleDonationUnderLimit = Math.min(donationSubjectToLimit, qualifyingLimit);
  
  // Apply the 50% deduction rate to the capped eligible amount
  const deductibleWithLimit = eligibleDonationUnderLimit * 0.50;

  return deductibleWithoutLimit + deductibleWithLimit;
};

/**
 * Main Engine: Calculates overall tax savings based on real Indian tax math.
 */
export const calculateTaxSavings = (cart = [], annualIncome = 1000000, regime = 'old') => {
  const totalDonation = cart.reduce((sum, item) => sum + item.total, 0);

  // If New Regime or no donation, return base metrics with 0 savings
  if (regime === TAX_REGIMES.NEW || totalDonation === 0) {
    return { 
      totalDonation,
      deductibleAmount: 0,
      taxBefore: 0, // Not applicable for savings calculation
      taxAfter: 0,
      taxSaved: 0,
      effectiveCost: totalDonation
    };
  }

  // Calculate allowable deduction based on item types and income limits
  const deductibleAmount = calculate80GDeductible(cart, annualIncome);

  // Calculate tax dynamically before and after the deduction
  const taxBefore = calculateOldRegimeTax(annualIncome);
  const taxAfter = calculateOldRegimeTax(annualIncome - deductibleAmount);
  
  // Final savings and effective out-of-pocket cost
  const taxSaved = taxBefore - taxAfter;

  return {
    totalDonation,
    deductibleAmount,
    taxBefore,
    taxAfter,
    taxSaved,
    effectiveCost: totalDonation - taxSaved
  };
};