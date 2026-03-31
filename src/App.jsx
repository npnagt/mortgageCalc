import { useMemo, useState } from 'react';

function calculateMortgage(principal, downPaymentPercent, annualRate, years) {
  const loanAmount = principal * (1 - downPaymentPercent / 100);
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (months <= 0 || loanAmount <= 0) {
    return {
      loanAmount: 0,
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0
    };
  }

  const monthlyPayment = monthlyRate > 0
    ? loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)))
    : loanAmount / months;

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest
  };
}

function App() {
  const [principal, setPrincipal] = useState(300000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [annualRate, setAnnualRate] = useState(4.25);
  const [years, setYears] = useState(30);

  const values = useMemo(
    () => calculateMortgage(principal, downPaymentPercent, annualRate, years),
    [principal, downPaymentPercent, annualRate, years]
  );

  return (
    <div className="app-shell">
      <div className="calculator-card">
        <h1>Mortgage Calculator</h1>
        <p>Estimate your monthly mortgage payment quickly and easily.</p>

        <label>
          Principal Amount
          <input
            type="number"
            min="0"
            value={principal}
            onChange={(event) => setPrincipal(Number(event.target.value))}
          />
        </label>

        <label>
          Down Payment (%)
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={downPaymentPercent}
            onChange={(event) => setDownPaymentPercent(Number(event.target.value))}
          />
        </label>

        <label>
          Interest Rate (%)
          <input
            type="number"
            min="0"
            step="0.01"
            value={annualRate}
            onChange={(event) => setAnnualRate(Number(event.target.value))}
          />
        </label>

        <label>
          Duration (Years)
          <input
            type="number"
            min="1"
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
          />
        </label>

        <section className="results">
          <div className="result-item">
            <span>Loan Amount</span>
            <strong>${values.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="result-item">
            <span>Monthly Payment</span>
            <strong>${values.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="result-item">
            <span>Total Payment</span>
            <strong>${values.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="result-item">
            <span>Total Interest</span>
            <strong>${values.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
