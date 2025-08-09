"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/src/store";
import TransactionListView from "./TransactionListView";
import TransactionForm from "./TransactionForm";
import TransactionFilters from "./TransactionFilters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import AddTransactionModal from "./AddTransactionModal";

export default function TransactionList() {
  const {
    transactions,
    recent_transactions,
    loading,
    fetchTransactions,
    fetchRecentTransactions,
    deleteTransaction,
    pagination,
    filters,
    setFilters,
  } = useStore();

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
    fetchRecentTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle edit transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditDialog(true);
  };

  // Handle delete transaction
  const handleDeleteTransaction = async (transactionId) => {
    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      await deleteTransaction(transactionId);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Handle form success
  const handleFormSuccess = () => {
    setShowEditDialog(false);
    setEditingTransaction(null);
    fetchTransactions();
    fetchRecentTransactions();
  };

  // Handle pagination
  const handlePageChange = (newOffset) => {
    if (setFilters) {
      setFilters({ ...filters, offset: newOffset });
    }
  };

  return (
    <div className="bg-white rounded-lg flex flex-col px-2 gap-2 py-2 my-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex gap-2 items-center">
          Recent Transactions
          <span>
            <PlusCircleIcon
              onClick={() => setIsModalOpen(true)}
              className="w-4 h-4 text-indigo-400 cursor-pointer"
            />
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-xs bg-[#ECEBFF] border border-indigo-400/20 p-1 rounded-full px-2 text-gray-500 hover:bg-indigo-100"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <Link
            href={"/transactions"}
            className="text-xs bg-[#ECEBFF] border border-indigo-400/20 p-1 rounded-full px-2 text-gray-500"
          >
            view all
          </Link>
        </div>
      </div>

      {/* Enhanced Filters */}
      {showFilters && filters && setFilters && (
        <div className="mb-4">
          <TransactionFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      )}

      {/* Enhanced Transaction List */}
      {showFilters ? (
        <TransactionListView
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {recent_transactions && recent_transactions.length > 0 ? (
            recent_transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      transaction.transaction_type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.transaction_type === "income" ? "+" : "-"}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.category}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.transaction_type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.transaction_type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No recent transactions
            </div>
          )}
        </div>
      )}

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Edit Transaction Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm
            transaction={editingTransaction}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowEditDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
