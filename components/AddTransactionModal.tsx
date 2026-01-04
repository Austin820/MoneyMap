
import React, { useState } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { CATEGORIES } from '../constants';

interface AddTransactionModalProps {
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onAdd }) => {
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<Category>(Category.FOOD);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    onAdd({
      amount: parsedAmount,
      type,
      category,
      note,
      date
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40 animate-in fade-in duration-300">
      <div className="bg-[#f7f9fc] w-full max-w-md p-6 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-google font-bold text-[#1a1c1e]">New Transaction</h2>
          <button onClick={onClose} className="p-2 text-[#44474e] hover:bg-gray-200 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selector */}
          <div className="flex p-1 bg-[#e0e2e8] rounded-2xl">
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                type === TransactionType.EXPENSE ? 'bg-[#001d35] text-white shadow' : 'text-[#44474e]'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                type === TransactionType.INCOME ? 'bg-[#001d35] text-white shadow' : 'text-[#44474e]'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-sm font-medium text-[#44474e] mb-1">Amount ($)</label>
            <input
              type="number"
              required
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-4 rounded-2xl border border-[#c4c7cf] focus:ring-2 focus:ring-[#001d35] focus:outline-none text-xl font-google font-bold"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-[#44474e] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full p-4 rounded-2xl border border-[#c4c7cf] focus:ring-2 focus:ring-[#001d35] focus:outline-none bg-white"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-[#44474e] mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 rounded-2xl border border-[#c4c7cf] focus:ring-2 focus:ring-[#001d35] focus:outline-none bg-white"
            />
          </div>

          {/* Note Field */}
          <div>
            <label className="block text-sm font-medium text-[#44474e] mb-1">Note (Optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What was this for?"
              className="w-full p-4 rounded-2xl border border-[#c4c7cf] focus:ring-2 focus:ring-[#001d35] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#001d35] text-white rounded-2xl font-google font-bold text-lg shadow-lg hover:bg-[#002d50] transition-colors mt-4"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
