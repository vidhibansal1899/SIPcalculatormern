import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';

export default function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    calculateSIP();
  }, []);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const n = parseFloat(years) * 12;
    const r = parseFloat(interestRate) / 100 / 12;

    const investedAmount = P * n;
    const futureValue = P * (((1 + r) ** n - 1) / r) * (1 + r);
    const estimatedReturn = futureValue - investedAmount;

    setTotalInvestment(investedAmount.toFixed(2));
    setTotalReturn(estimatedReturn.toFixed(2));
    setTotalValue(futureValue.toFixed(2));
  };

  const handleMonthlyInvestmentChange = (e) => {
    const monthlyRange = e.target.value * 1000;
    setMonthlyInvestment(monthlyRange);
    calculateSIP();
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
    calculateSIP();
  };

  const handleYearChange = (e) => {
    const yearRange = e.target.value / 2;
    setYears(yearRange);
    calculateSIP();
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsla(133,0%,0%,1)',
        backgroundImage: `
          radial-gradient(at 17% 13%, hsla(217,99%,68%,1) 0px, transparent 50%),
          radial-gradient(at 27% 10%, hsla(83,73%,60%,1) 0px, transparent 50%),
          radial-gradient(at 38% 67%, hsla(204,67%,66%,1) 0px, transparent 50%)
        `,
      }}
    >
      <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-lg rounded-xl p-8 w-[40vw] h-[80vh] text-white">
        <div className="text-3xl font-semibold mb-2 text-center">SIP Calculator</div>

        <div className="space-y-11">
          {/* Monthly Investment Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-md">Monthly Investment</div>
              <div className="bg-blue-100/30 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 text-right">
                ₹ {monthlyInvestment}
              </div>
            </div>
            <Slider
              value={monthlyInvestment / 1000}
              aria-label="Monthly Investment"
              onChange={handleMonthlyInvestmentChange}
              className="text-white"
            />
          </div>

          {/* Expected Return Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-md">Expected Return Rate (per annum)</div>
              <div className="bg-blue-100/30 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 text-right">
                {interestRate} %
              </div>
            </div>
            <Slider
              value={interestRate}
              aria-label="Interest Rate"
              onChange={handleInterestRateChange}
              className="text-white"
            />
          </div>

          {/* Time Period Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-md">Time Period</div>
              <div className="bg-blue-100/30 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 text-right">
                {years} Yr
              </div>
            </div>
            <Slider
              value={years * 2}
              aria-label="Years"
              onChange={handleYearChange}
              className="text-white"
            />
          </div>

          {/* Display Calculated Results */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <div className="text-md">Invested Amount</div>
              <div className="text-right font-semibold">₹ {totalInvestment}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-md">Est. Return</div>
              <div className="text-right font-semibold">₹ {totalReturn}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-md">Total Value</div>
              <div className="text-right font-semibold">₹ {totalValue}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}