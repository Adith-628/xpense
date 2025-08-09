import React from "react";
import {
  EditIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const TransactionListView = ({
  transactions = [],
  onEdit,
  onDelete,
  pagination,
  onPageChange,
}) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate pagination
  const totalPages = Math.ceil(
    (pagination?.total || 0) / (pagination?.limit || 50)
  );
  const currentPage =
    Math.floor((pagination?.offset || 0) / (pagination?.limit || 50)) + 1;

  // Handle pagination
  const handlePrevPage = () => {
    if (pagination?.offset > 0) {
      onPageChange(Math.max(0, pagination.offset - pagination.limit));
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.offset + pagination.limit < pagination.total) {
      onPageChange(pagination.offset + pagination.limit);
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <ArrowUpIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No transactions found
          </h3>
          <p className="text-gray-500 mb-4">
            Start tracking your expenses by creating your first transaction.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
          <span className="text-sm text-gray-500">
            {pagination?.total || transactions.length} total
          </span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Type Indicator */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.transaction_type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.transaction_type === "income" ? (
                    <ArrowUpIcon className="h-5 w-5" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5" />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {transaction.title}
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {transaction.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </span>
                    {transaction.description && (
                      <span className="text-sm text-gray-500 truncate max-w-xs">
                        {transaction.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount and Actions */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div
                    className={`text-lg font-semibold ${
                      transaction.transaction_type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.transaction_type === "income" ? "+" : "-"}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </div>
                  {transaction.created_at && (
                    <div className="text-xs text-gray-400">
                      Added {formatDate(transaction.created_at)}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit transaction"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete transaction"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {pagination.offset + 1} to{" "}
              {Math.min(pagination.offset + pagination.limit, pagination.total)}{" "}
              of {pagination.total} results
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={pagination.offset === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              <span className="text-sm text-gray-700 px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={
                  pagination.offset + pagination.limit >= pagination.total
                }
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionListView;
