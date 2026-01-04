
import { Transaction } from '../types';
// Fix: STORAGE_KEY is exported from constants.ts, not types.ts
import { STORAGE_KEY } from '../constants';

export const storageService = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTransaction: (transaction: Transaction): void => {
    const transactions = storageService.getTransactions();
    transactions.unshift(transaction); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  },

  deleteTransaction: (id: string): void => {
    const transactions = storageService.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};