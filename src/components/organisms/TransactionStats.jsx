"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/src/store";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const TransactionStats = () => {
  const { user, transactions = [], loading, dashboardInitialized } = useStore();
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    transactionCount: 0,
  });

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const totalIncome = transactions
        .filter((t) => t.transaction_type === "income")
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

      const totalExpenses = transactions
        .filter((t) => t.transaction_type === "expense")
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

      const netBalance = totalIncome - totalExpenses;
      const transactionCount = transactions.length;

      setStats({
        totalIncome,
        totalExpenses,
        netBalance,
        transactionCount,
      });
    }
  }, [transactions]);

  if (loading) {
    return (
      <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-indigo-100 rounded-lg">
          <PieChart className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Quick Stats</h3>
      </div>

      <div className="space-y-3">
        {/* Total Income */}
        <motion.div
          className="flex items-center justify-between p-3 bg-green-50/80 rounded-xl border border-green-200/50 hover:bg-green-100/80 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-700">Total Income</p>
              <p className="text-base font-bold text-green-800">
                ₹{stats.totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Total Expenses */}
        <motion.div
          className="flex items-center justify-between p-3 bg-red-50/80 rounded-xl border border-red-200/50 hover:bg-red-100/80 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-500 rounded-lg group-hover:bg-red-600 transition-colors">
              <TrendingDown className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-700">Total Expenses</p>
              <p className="text-base font-bold text-red-800">
                ₹{stats.totalExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Net Balance */}
        <motion.div
          className={`flex items-center justify-between p-3 rounded-xl border hover:shadow-lg transition-all duration-300 cursor-pointer group ${
            stats.netBalance >= 0
              ? "bg-blue-50/80 border-blue-200/50 hover:bg-blue-100/80"
              : "bg-orange-50/80 border-orange-200/50 hover:bg-orange-100/80"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg transition-colors ${
                stats.netBalance >= 0
                  ? "bg-blue-500 group-hover:bg-blue-600"
                  : "bg-orange-500 group-hover:bg-orange-600"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p
                className={`text-xs font-medium ${
                  stats.netBalance >= 0 ? "text-blue-700" : "text-orange-700"
                }`}
              >
                Net Balance
              </p>
              <p
                className={`text-base font-bold ${
                  stats.netBalance >= 0 ? "text-blue-800" : "text-orange-800"
                }`}
              >
                ₹{Math.abs(stats.netBalance).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Transaction Count */}
        <motion.div
          className="flex items-center justify-center p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {stats.transactionCount}
            </p>
            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
              Total Transactions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionStats;
