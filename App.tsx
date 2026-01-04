
import React, { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionType, Category, FinanceSummary } from './types';
import { storageService } from './services/storage';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState<FinanceSummary>({
    balance: 0,
    income: 0,
    expenses: 0
  });

  const loadData = useCallback(() => {
    const data = storageService.getTransactions();
    setTransactions(data);
    
    const income = data
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = data
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
      
    setSummary({
      income,
      expenses,
      balance: income - expenses
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    storageService.saveTransaction(transaction);
    loadData();
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    storageService.deleteTransaction(id);
    loadData();
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-[#f7f9fc] shadow-lg relative overflow-hidden">
      {/* App Bar */}
      <header className="px-6 pt-10 pb-4 bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-google font-bold text-[#1a1c1e]">MoneyMap</h1>
        <p className="text-[#44474e] text-sm">Manage your local finances</p>
      </header>

      <main className="px-6 space-y-6 mt-4">
        <Dashboard summary={summary} />
        
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-google font-medium text-[#1a1c1e]">Recent Transactions</h2>
        </div>

        <TransactionList 
          transactions={transactions} 
          onDelete={handleDeleteTransaction}
        />
      </main>

      {/* FAB - Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#d3e3fd] text-[#001d35] rounded-2xl shadow-xl hover:bg-[#c2d9f7] transition-all flex items-center justify-center transform active:scale-95 z-20"
        title="Add Transaction"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <AddTransactionModal 
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default App;
