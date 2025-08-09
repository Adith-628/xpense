"use client";

import React, { useState, useEffect, useCallback } from "react";
import { transactionAPI } from "@/utils/api";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSignIcon,
  HashIcon,
} from "lucide-react";

const TransactionStats = ({ filters = {} }) => {
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch statistics summary
  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      // Create filter params for stats API with safe access
      const statsFilters = {};
      if (filters?.start_date) statsFilters.start_date = filters.start_date;
      if (filters?.end_date) statsFilters.end_date = filters.end_date;

      // Fetch summary stats
      const summaryResponse = await transactionAPI.getStatsSummary(
        statsFilters
      );
      if (summaryResponse.success) {
        setStats(summaryResponse.data);
      }

      // Fetch category stats
      const categoryResponse = await transactionAPI.getStatsCategories({
        ...statsFilters,
        transaction_type: filters?.transaction_type || undefined,
      });
      if (categoryResponse.success) {
        setCategoryStats(categoryResponse.data || []);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }, [filters?.start_date, filters?.end_date, filters?.transaction_type]);

  // Refetch when filters change
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state for new users
  if (!stats || stats.transaction_count === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Transaction Data
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Start adding transactions to see your financial statistics
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Show placeholder cards */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200 opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">
                    Total Income
                  </p>
                  <p className="text-2xl font-bold text-green-700">$0.00</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">
                    Total Expenses
                  </p>
                  <p className="text-2xl font-bold text-red-700">$0.00</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">
                    Net Balance
                  </p>
                  <p className="text-2xl font-bold text-blue-700">$0.00</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Transactions
                  </p>
                  <p className="text-2xl font-bold text-gray-700">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Income */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(stats?.total_income)}
                </p>
              </div>
              <ArrowUpIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {formatCurrency(stats?.total_expenses)}
                </p>
              </div>
              <ArrowDownIcon className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* Net Balance */}
          <div
            className={`rounded-lg p-4 border ${
              (stats?.net_balance || 0) >= 0
                ? "bg-blue-50 border-blue-200"
                : "bg-orange-50 border-orange-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    (stats?.net_balance || 0) >= 0
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                >
                  Net Balance
                </p>
                <p
                  className={`text-2xl font-bold ${
                    (stats?.net_balance || 0) >= 0
                      ? "text-blue-700"
                      : "text-orange-700"
                  }`}
                >
                  {formatCurrency(stats?.net_balance)}
                </p>
              </div>
              <DollarSignIcon
                className={`h-8 w-8 ${
                  (stats?.net_balance || 0) >= 0
                    ? "text-blue-500"
                    : "text-orange-500"
                }`}
              />
            </div>
          </div>

          {/* Transaction Count */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Transactions
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {stats?.transaction_count || 0}
                </p>
              </div>
              <HashIcon className="h-8 w-8 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {categoryStats.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Category Breakdown
          </h3>

          <div className="space-y-3">
            {categoryStats.slice(0, 10).map((category, index) => {
              const percentage = stats?.total_expenses
                ? (
                    (category.total_amount / stats.total_expenses) *
                    100
                  ).toFixed(1)
                : 0;

              return (
                <div
                  key={category.category}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        category.transaction_type === "income"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium text-gray-900">
                      {category.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({category.transaction_count} transactions)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(category.total_amount)}
                    </div>
                    <div className="text-sm text-gray-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          {categoryStats.length > 10 && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                ... and {categoryStats.length - 10} more categories
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionStats;
