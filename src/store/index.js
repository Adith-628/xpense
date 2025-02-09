import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addTransaction as addTransactionToSupabase,
  getTransactions as getTransactionsFromSupabase,
  getBalance as getBalanceFromSupabase,
  getSpend,
  getRecentTransactions,
  getExpenseStatistics,
} from "@/utils/database";

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      total_balance: 0,
      total_spend: 0,
      stats: [],
      recent_transactions: [],
      transactions: [],
      setUser: (user) => set({ user }),
      addTransaction: async (transaction) => {
        const { user } = get();
        if (!user) {
          console.error("No user found - please sign in first");
          return;
        }
        try {
          const newTransaction = await addTransactionToSupabase(
            user.id,
            transaction
          );
          if (newTransaction) {
            set((state) => ({
              transactions: [...state.transactions, newTransaction],
            }));
          }
        } catch (e) {
          console.error("Error adding transaction:", e);
          throw e;
        }
      },
      fetchTransactions: async () => {
        const { user } = get();
        if (!user) return;

        const transactions = await getTransactionsFromSupabase(user.id);
        set({ transactions });
      },
      fetchRecentTransactions: async () => {
        const { user } = get();
        if (!user) return;

        const transactions = await getRecentTransactions(user.id, 8);
        set({ recent_transactions: transactions });
      },

      fetchBalance: async () => {
        const { user } = get();
        if (!user) return;

        const balance = await getBalanceFromSupabase(user.id);
        set({ total_balance: balance });
      },
      fetchSpend: async () => {
        const { user } = get();
        if (!user) return;

        const spend = await getSpend(user.id);
        set({ total_spend: spend });
      },
      fetchStats: async () => {
        const { user } = get();
        if (!user) return;

        const stats = await getExpenseStatistics(user.id);
        console.log("stats---", stats);
        set({ stats });
      },
    }),
    {
      name: "user-storage", // unique name for localStorage key
      partialize: (state) => ({ user: state.user }), // only persist the user object
    }
  )
);
