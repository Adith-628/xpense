import React, { useState, useEffect, useCallback } from "react";
import { useStore } from "@/src/store";
import { transactionAPI } from "@/utils/api";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";
import TransactionStats from "./TransactionStats";

const TransactionManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [localFilters, setLocalFilters] = useState({
    category: "",
    transaction_type: "",
    start_date: "",
    end_date: "",
    limit: 50,
    offset: 0,
  });

  const {
    user,
    transactions,
    loading,
    pagination,
    filters,
    setFilters,
    fetchTransactions,
    initializeTransactions,
    transactionsInitialized,
    addTransaction,
    updateTransaction: storeUpdateTransaction,
    deleteTransaction: storeDeleteTransaction,
  } = useStore();

  // Initialize transactions data when user is available
  const initializeTransactionsData = useCallback(() => {
    if (user?.id && initializeTransactions) {
      initializeTransactions(localFilters);
    }
  }, [user?.id, initializeTransactions, localFilters]);

  useEffect(() => {
    initializeTransactionsData();
  }, [initializeTransactionsData]);

  // Create new transaction - using store function
  const createTransaction = async (transactionData) => {
    try {
      const response = await addTransaction(transactionData);
      setShowForm(false);

      // Refresh transactions list
      if (transactionsInitialized) {
        await fetchTransactions(localFilters);
      }

      return response;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  // Update transaction - using store function
  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await storeUpdateTransaction(id, transactionData);
      setEditingTransaction(null);

      // Refresh transactions list
      if (transactionsInitialized) {
        await fetchTransactions(localFilters);
      }

      return response;
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  };

  // Delete transaction - using store function
  const deleteTransaction = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      await storeDeleteTransaction(id);

      // Refresh transactions list
      if (transactionsInitialized) {
        await fetchTransactions(localFilters);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...localFilters, ...newFilters, offset: 0 };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);

    // Only fetch if transactions are already initialized (to avoid duplicate calls)
    if (transactionsInitialized) {
      fetchTransactions(updatedFilters);
    }
  };

  // Handle pagination
  const handlePageChange = (newOffset) => {
    const updatedFilters = { ...localFilters, offset: newOffset };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);

    // Only fetch if transactions are already initialized
    if (transactionsInitialized) {
      fetchTransactions(updatedFilters);
    }
  };

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
      <TransactionStats filters={localFilters} />

      {/* Filters */}
      <TransactionFilters
        filters={localFilters}
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
          setLocalFilters(resetFilters);
          setFilters(resetFilters);

          // Only fetch if transactions are already initialized
          if (transactionsInitialized) {
            fetchTransactions(resetFilters);
          }
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
          transactions={transactions}
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
