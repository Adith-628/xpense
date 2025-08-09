import React, { useState, useEffect, useCallback } from "react";
import { useStore } from "@/src/store";
import { transactionAPI } from "@/utils/api";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";
import TransactionStats from "./TransactionStats";

const TransactionManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    transaction_type: "",
    start_date: "",
    end_date: "",
    limit: 50,
    offset: 0,
  });
  const [pagination, setPagination] = useState({
    limit: 50,
    offset: 0,
    total: 0,
  });

  const { user } = useStore();

  // Fetch transactions based on filters
  const fetchTransactions = useCallback(
    async (newFilters = filters) => {
      if (!user) return;

      setLoading(true);
      try {
        // Clean up filters - remove empty values
        const cleanFilters = Object.entries(newFilters).reduce(
          (acc, [key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );

        const response = await transactionAPI.getTransactions(cleanFilters);

        if (response.success) {
          setTransactions(response.data || []);
          setFilteredTransactions(response.data || []);
          if (response.pagination) {
            setPagination(response.pagination);
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    },
    [user, filters]
  );

  // Create new transaction
  const createTransaction = async (transactionData) => {
    try {
      const response = await transactionAPI.createTransaction(transactionData);

      if (response.success) {
        await fetchTransactions(); // Refresh list
        setShowForm(false);
        return response;
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  // Update transaction
  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await transactionAPI.updateTransaction(
        id,
        transactionData
      );

      if (response.success) {
        await fetchTransactions(); // Refresh list
        setEditingTransaction(null);
        return response;
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await transactionAPI.deleteTransaction(id);

      if (response.success) {
        await fetchTransactions(); // Refresh list
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, offset: 0 };
    setFilters(updatedFilters);
    fetchTransactions(updatedFilters);
  };

  // Handle pagination
  const handlePageChange = (newOffset) => {
    const updatedFilters = { ...filters, offset: newOffset };
    setFilters(updatedFilters);
    fetchTransactions(updatedFilters);
  };

  // Initial load
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Transaction
        </button>
      </div>

      {/* Stats Summary */}
      <TransactionStats filters={filters} />

      {/* Filters */}
      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={() => {
          const resetFilters = {
            category: "",
            transaction_type: "",
            start_date: "",
            end_date: "",
            limit: 50,
            offset: 0,
          };
          setFilters(resetFilters);
          fetchTransactions(resetFilters);
        }}
      />

      {/* Transaction Form Modal */}
      {(showForm || editingTransaction) && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={
            editingTransaction
              ? (data) => updateTransaction(editingTransaction.id, data)
              : createTransaction
          }
          onCancel={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading transactions...</p>
        </div>
      )}

      {/* Transaction List */}
      {!loading && (
        <TransactionList
          transactions={filteredTransactions}
          onEdit={setEditingTransaction}
          onDelete={deleteTransaction}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TransactionManager;
