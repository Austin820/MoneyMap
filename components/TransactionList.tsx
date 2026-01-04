
import React from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[#74777f]">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="font-google font-medium">No transactions yet</p>
        <p className="text-sm">Tap the + button to add one</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <div 
          key={t.id} 
          className="bg-white p-4 rounded-2xl border border-[#c4c7cf] flex items-center justify-between group transition-all hover:bg-gray-50"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              t.type === TransactionType.INCOME ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {t.category.charAt(0)}
            </div>
            <div>
              <p className="font-google font-medium text-[#1a1c1e]">{t.note || t.category}</p>
              <p className="text-xs text-[#74777f]">{t.date} • {t.category}</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className={`font-google font-bold ${
              t.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'
            }`}>
              {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toLocaleString()}
            </p>
            <button 
              onClick={() => onDelete(t.id)}
              className="text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
