import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addTransaction as addTransactionToAPI,
  getTransactions as getTransactionsFromAPI,
  getBalance as getBalanceFromAPI,
  getSpend,
  getRecentTransactions,
  getExpenseStatistics,
  getDebitTotals,
} from "@/utils/database";
import { transactionAPI } from "@/utils/api";
import { signOut as signOutFromAuth } from "@/utils/auth";

export const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      loading: false,
      _loadingOperations: 0,

      // Transaction state
      total_balance: 0,
      total_spend: 0,
      stats: [],
      recent_transactions: [],
      transactions: [],
      debits: [],

      // Inside your Zustand store:
      dashboardInitialized: false,
      setDashboardInitialized: (value) => set({ dashboardInitialized: value }),

      // Transactions page initialization flag
      transactionsInitialized: false,
      setTransactionsInitialized: (value) => set({ transactionsInitialized: value }),

      // Pagination and filters
      pagination: {
        total: 0,
        offset: 0,
        limit: 50,
      },
      filters: {
        transaction_type: "",
        category: "",
        start_date: "",
        end_date: "",
        limit: 50,
        offset: 0,
      },

      // Transaction statistics
      transactionStats: {
        totalIncome: 0,
        totalExpenses: 0,
        netBalance: 0,
        categoryBreakdown: [],
        monthlyTrends: [],
      },

      // Actions
      setUser: (user) => {
        set({
          user,
          dashboardInitialized: false, // Reset dashboard initialization when user changes
          transactionsInitialized: false, // Reset transactions initialization when user changes
        });
      },
      setLoading: (loading) => set({ loading }),
      setFilters: (filters) => set({ filters }),

      // Loading management for multiple concurrent operations
      _loadingOperations: 0,
      incrementLoading: () => {
        const current = get()._loadingOperations + 1;
        set({ _loadingOperations: current, loading: current > 0 });
      },
      decrementLoading: () => {
        const current = Math.max(0, get()._loadingOperations - 1);
        set({ _loadingOperations: current, loading: current > 0 });
      },

      // Authentication actions
      signOut: async () => {
        try {
          await signOutFromAuth();
          set({
            user: null,
            transactions: [],
            recent_transactions: [],
            total_balance: 0,
            total_spend: 0,
            stats: [],
            debits: [],
            dashboardInitialized: false, // Reset dashboard initialization on signout
            transactionsInitialized: false, // Reset transactions initialization on signout
            transactionStats: {
              totalIncome: 0,
              totalExpenses: 0,
              netBalance: 0,
              categoryBreakdown: [],
              monthlyTrends: [],
            },
          });
        } catch (error) {
          console.error("Sign out error:", error);
          throw error;
        }
      },

      // Transaction actions
      addTransaction: async (transaction) => {
        const { user } = get();
        if (!user) {
          console.error("No user found - please sign in first");
          return;
        }
        try {
          const newTransaction = await addTransactionToAPI(
            user.id,
            transaction
          );
          if (newTransaction) {
            set((state) => ({
              transactions: [...state.transactions, newTransaction],
            }));
          }
          return newTransaction;
        } catch (e) {
          console.error("Error adding transaction:", e);
          throw e;
        }
      },

      updateTransaction: async (transactionId, updates) => {
        try {
          const response = await transactionAPI.updateTransaction(
            transactionId,
            updates
          );
          if (response.success && response.data) {
            set((state) => ({
              transactions: state.transactions.map((t) =>
                t.id === transactionId ? response.data : t
              ),
              recent_transactions: state.recent_transactions.map((t) =>
                t.id === transactionId ? response.data : t
              ),
            }));
            return response.data;
          }
        } catch (error) {
          console.error("Error updating transaction:", error);
          throw error;
        }
      },

      deleteTransaction: async (transactionId) => {
        try {
          const response = await transactionAPI.deleteTransaction(
            transactionId
          );
          if (response.success) {
            set((state) => ({
              transactions: state.transactions.filter(
                (t) => t.id !== transactionId
              ),
              recent_transactions: state.recent_transactions.filter(
                (t) => t.id !== transactionId
              ),
            }));
          }
        } catch (error) {
          console.error("Error deleting transaction:", error);
          throw error;
        }
      },

      fetchTransactions: async (customFilters) => {
        const { user, filters, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          const finalFilters = customFilters || filters;
          const result = await getTransactionsFromAPI(user.id, finalFilters);

          if (result && result.data) {
            set({
              transactions: result.data,
              pagination: {
                total: result.total || result.data.length,
                offset: finalFilters.offset || 0,
                limit: finalFilters.limit || 50,
              },
            });
          } else {
            set({ transactions: result || [] });
          }
        } catch (error) {
          console.error("Error fetching transactions:", error);
          set({ transactions: [] });
        } finally {
          decrementLoading();
        }
      },

      fetchRecentTransactions: async () => {
        const { user, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          const transactions = await getRecentTransactions(user.id, 8);
          set({ recent_transactions: transactions || [] });
        } catch (error) {
          console.error("Error fetching recent transactions:", error);
          set({ recent_transactions: [] });
        } finally {
          decrementLoading();
        }
      },

      fetchBalance: async () => {
        const { user, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          const balance = await getBalanceFromAPI(user.id);
          set({ total_balance: balance || 0 });
        } catch (error) {
          console.error("Error fetching balance:", error);
          set({ total_balance: 0 });
        } finally {
          decrementLoading();
        }
      },

      fetchSpend: async () => {
        const { user, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          const spend = await getSpend(user.id);
          set({ total_spend: spend || 0 });
        } catch (error) {
          console.error("Error fetching spend:", error);
          set({ total_spend: 0 });
        } finally {
          decrementLoading();
        }
      },

      fetchStats: async () => {
        const { user, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          const stats = await getExpenseStatistics(user.id);
          console.log("stats---", stats);
          set({ stats: stats || [] });
        } catch (error) {
          console.error("Error fetching stats:", error);
          set({ stats: [] });
        } finally {
          decrementLoading();
        }
      },

      fetchDebits: async () => {
        const { user, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          const debits = await getDebitTotals(user.id);
          console.log("debits---", debits);
          set({ debits: debits || [] });
        } catch (error) {
          console.error("Error fetching debits:", error);
          set({ debits: [] });
        } finally {
          decrementLoading();
        }
      },

      // Dashboard initialization - fetches all necessary data
      initializeDashboard: async () => {
        const {
          user,
          dashboardInitialized,
          setDashboardInitialized,
          fetchBalance,
          fetchSpend,
          fetchTransactions,
          fetchRecentTransactions,
          fetchStats,
          fetchDebits,
        } = get();

        if (!user) return;
        if (dashboardInitialized) return; // ✅ Prevent re-runs

        setDashboardInitialized(true); // Mark as initialized before fetching

        try {
          await Promise.allSettled([
            fetchBalance(),
            fetchSpend(),
            fetchTransactions(),
            fetchRecentTransactions(),
            fetchStats(),
            fetchDebits(),
          ]);
        } catch (error) {
          console.error("Error initializing dashboard:", error);
        }
      },

      // Transactions page initialization - fetches transaction data
      initializeTransactions: async (filters = {}) => {
        const {
          user,
          transactionsInitialized,
          setTransactionsInitialized,
          fetchTransactions,
        } = get();

        if (!user) return;
        if (transactionsInitialized) return; // ✅ Prevent re-runs

        setTransactionsInitialized(true); // Mark as initialized before fetching

        try {
          await fetchTransactions(filters);
        } catch (error) {
          console.error("Error initializing transactions:", error);
        }
      },

      fetchTransactionStats: async () => {
        const { user, incrementLoading, decrementLoading } = get();
        if (!user) return;

        try {
          incrementLoading();
          // This would ideally call a dedicated stats API endpoint
          // For now, we'll calculate from the existing data
          const transactions = await getTransactionsFromAPI(user.id);

          if (transactions && Array.isArray(transactions)) {
            const totalIncome = transactions
              .filter((t) => t.transaction_type === "income")
              .reduce((sum, t) => sum + (t.amount || 0), 0);

            const totalExpenses = transactions
              .filter((t) => t.transaction_type === "expense")
              .reduce((sum, t) => sum + (t.amount || 0), 0);

            const categoryBreakdown = transactions.reduce((acc, t) => {
              const category = t.category || "Uncategorized";
              if (!acc[category]) {
                acc[category] = { income: 0, expenses: 0, total: 0 };
              }
              if (t.transaction_type === "income") {
                acc[category].income += t.amount || 0;
              } else {
                acc[category].expenses += t.amount || 0;
              }
              acc[category].total =
                acc[category].income - acc[category].expenses;
              return acc;
            }, {});

            set({
              transactionStats: {
                totalIncome,
                totalExpenses,
                netBalance: totalIncome - totalExpenses,
                categoryBreakdown: Object.entries(categoryBreakdown).map(
                  ([name, data]) => ({
                    name,
                    ...data,
                  })
                ),
                monthlyTrends: [], // Would need more complex calculation
              },
            });
          }
        } catch (error) {
          console.error("Error fetching transaction stats:", error);
        } finally {
          decrementLoading();
        }
      },
    }),
    {
      name: "user-storage", // unique name for localStorage key
      partialize: (state) => ({ user: state.user }), // only persist the user object
    }
  )
);
