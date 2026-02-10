/**
 * Formats a number into Vietnamese Currency style (e.g., 5.000.000.000 ₫)
 */
export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

/**
 * Shortens large numbers for display (e.g., 5 Tỷ, 500 Triệu)
 */
export const formatShort = (val: number) => {
  if (val >= 1000000000) return (val / 1000000000).toFixed(1) + ' Tỷ';
  if (val >= 1000000) return (val / 1000000).toFixed(0) + ' Triệu';
  return val.toLocaleString('vi-VN');
};

/**
 * Parses a locale string back to number (e.g., "5.000.000" -> 5000000)
 */
export const parseLocaleNumber = (stringNumber: string) => {
  return parseInt(stringNumber.replace(/\./g, '')) || 0;
};

/**
 * Calculates loan details based on inputs
 */
export const calculateLoanDetails = (
  propertyValue: number,
  loanPercent: number,
  loanTerm: number,
  interestRate: number,
) => {
  const principal = (propertyValue * loanPercent) / 100;
  const monthlyRate = interestRate / 100 / 12;
  const months = loanTerm * 12;

  // Simple estimation for "First Month": Principal/Months + Principal * MonthlyRate
  const principalPerMonth = principal / months;
  const firstMonthInterest = principal * monthlyRate;
  const firstMonthTotal = principalPerMonth + firstMonthInterest;

  // Total Interest Approximation (Reducing Balance) formula
  // Approx Total Interest = (Principal * Rate * (Months + 1)) / 24
  // Note: This assumes linear principal repayment
  const approxTotalInterest = (principal * (interestRate / 100) * (loanTerm + 1 / 12)) / 2;

  const totalPayment = principal + approxTotalInterest;

  return {
    loanAmount: principal,
    monthlyPay: firstMonthTotal,
    totalInterest: approxTotalInterest,
    totalPayment: totalPayment,
  };
};
