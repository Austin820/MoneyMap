
import React from 'react';
import { FinanceSummary } from '../types';

interface DashboardProps {
  summary: FinanceSummary;
}

const Dashboard: React.FC<DashboardProps> = ({ summary }) => {
  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
      <div className="bg-[#001d35] text-white p-6 rounded-[2rem] shadow-md">
        <p className="text-sm opacity-80 uppercase tracking-wider font-medium">Total Balance</p>
        <h2 className="text-4xl font-google font-bold mt-1">
          ${summary.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
      </div>

      {/* Income/Expense Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-[#c4c7cf] flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-xs text-[#44474e] font-medium uppercase">Income</p>
          <p className="text-lg font-google font-bold text-green-700">
            +${summary.income.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[#c4c7cf] flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <p className="text-xs text-[#44474e] font-medium uppercase">Expenses</p>
          <p className="text-lg font-google font-bold text-red-700">
            -${summary.expenses.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
