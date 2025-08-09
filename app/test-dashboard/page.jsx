"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/src/store";

export default function TestDashboard() {
  const [callCounts, setCallCounts] = useState({
    fetchBalance: 0,
    fetchSpend: 0,
    fetchTransactionStats: 0,
    fetchTransactions: 0,
    fetchRecentTransactions: 0,
    fetchStats: 0,
  });

  const {
    user,
    fetchBalance,
    fetchSpend,
    fetchTransactionStats,
    fetchTransactions,
    fetchRecentTransactions,
    fetchStats,
    total_balance,
    total_spend,
    transactions,
    recent_transactions,
    stats,
    transactionStats,
  } = useStore();

  // Mock user for testing
  useEffect(() => {
    if (!user) {
      useStore.getState().setUser({
        id: "test-user-id",
        email: "test@example.com",
        name: "Test User",
      });
    }
  }, [user]);

  // Test the same calls that dashboard makes
  useEffect(() => {
    if (user) {
      console.log("Making API calls...");

      // Increment counters to track how many times each function is called
      setCallCounts((prev) => ({
        ...prev,
        fetchBalance: prev.fetchBalance + 1,
      }));
      fetchBalance();

      setCallCounts((prev) => ({
        ...prev,
        fetchSpend: prev.fetchSpend + 1,
      }));
      fetchSpend();

      setCallCounts((prev) => ({
        ...prev,
        fetchTransactionStats: prev.fetchTransactionStats + 1,
      }));
      fetchTransactionStats();

      setCallCounts((prev) => ({
        ...prev,
        fetchTransactions: prev.fetchTransactions + 1,
      }));
      fetchTransactions();

      setCallCounts((prev) => ({
        ...prev,
        fetchRecentTransactions: prev.fetchRecentTransactions + 1,
      }));
      fetchRecentTransactions();

      setCallCounts((prev) => ({
        ...prev,
        fetchStats: prev.fetchStats + 1,
      }));
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard API Test</h1>

      {/* User Status */}
      <div className="bg-white rounded-lg p-4 mb-6 border">
        <h2 className="text-xl font-semibold mb-2">User Status</h2>
        <p>User: {user ? `${user.name} (${user.email})` : "Not logged in"}</p>
      </div>

      {/* API Call Counts */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-6 border">
        <h2 className="text-xl font-semibold mb-2">API Call Counts</h2>
        <p className="text-sm text-gray-600 mb-2">
          These should remain at 1 if infinite calls are fixed:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(callCounts).map(([func, count]) => (
            <div
              key={func}
              className={`p-2 rounded ${
                count > 1
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              <span className="font-mono">{func}:</span>
              <span className="font-bold ml-1">{count}</span>
              {count > 1 && (
                <span className="text-red-500 ml-1">⚠️ INFINITE CALLS!</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Data Status */}
      <div className="bg-white rounded-lg p-4 mb-6 border">
        <h2 className="text-xl font-semibold mb-2">Data Status</h2>
        <div className="space-y-1">
          <p>Balance: {total_balance}</p>
          <p>Spend: {total_spend}</p>
          <p>Transactions: {transactions.length} items</p>
          <p>Recent Transactions: {recent_transactions.length} items</p>
          <p>Stats: {stats.length} items</p>
          <p>Transaction Stats: {transactionStats ? "Loaded" : "Not loaded"}</p>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>
          Refresh this page to test again. Watch the API Call Counts - they
          should stay at 1 if the infinite calls issue is fixed.
        </p>
      </div>
    </div>
  );
}
