import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addTransaction as addTransactionToSupabase,
  getTransactions as getTransactionsFromSupabase,
} from "@/utils/database";

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
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
    }),
    {
      name: "user-storage", // unique name for localStorage key
      partialize: (state) => ({ user: state.user }), // only persist the user object
    }
  )
);
