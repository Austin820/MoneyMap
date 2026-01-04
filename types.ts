
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  RENT = 'Rent',
  OTHERS = 'Others'
}

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  date: string;
  note: string;
  type: TransactionType;
  createdAt: number;
}

export interface FinanceSummary {
  balance: number;
  income: number;
  expenses: number;
}
