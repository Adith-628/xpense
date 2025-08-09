"use client";
import React, { useEffect, useState, useCallback } from "react";
import BalanceCard from "@/src/components/molecules/BalanceCard";
import { useStore } from "@/src/store";
import TransactionList from "@/src/components/organisms/TransactionList";
import TransactionStats from "@/src/components/organisms/TransactionStats";
import Header from "@/src/components/organisms/Header";
import Chart from "@/src/components/organisms/Chart";
import NewUserOnboarding from "@/src/components/organisms/NewUserOnboarding";
import AddTransactionModal from "@/src/components/organisms/AddTransactionModal";

const HomePage = () => {
  const {
    user,
    total_spend,
    total_balance,
    loading,
    transactions = [],
    recent_transactions = [],
    initializeDashboard,
  } = useStore();

  const [userName, setUserName] = useState("");
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(
        user.fullName || user.name || user.email?.split("@")[0] || "User"
      );
      // Check if user has seen onboarding before
      const seenOnboarding =
        localStorage.getItem(`onboarding_seen_${user.id}`) === "true";
      setHasSeenOnboarding(seenOnboarding);
    }
  }, [user]);

  // Initialize dashboard data when user is available
  const initializeDashboardData = useCallback(() => {
    if (user?.id && initializeDashboard) {
      initializeDashboard();
    }
  }, [user?.id, initializeDashboard]);

  useEffect(() => {
    initializeDashboardData();
  }, [initializeDashboardData]);

  // Check if user is new (no transactions and hasn't seen onboarding)
  const isNewUser =
    !loading &&
    transactions.length === 0 &&
    recent_transactions.length === 0 &&
    !hasSeenOnboarding;

  const handleAddTransaction = () => {
    setIsAddTransactionOpen(true);
    // Mark onboarding as seen when user tries to add their first transaction
    if (user && !hasSeenOnboarding) {
      localStorage.setItem(`onboarding_seen_${user.id}`, "true");
      setHasSeenOnboarding(true);
    }
  };

  if (loading) {
    return (
      <div className="flex relative min-h-dvh pb-4 overflow-y-auto flex-col flex-1 gap-4 p-2 px-4 font-urbanist items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex relative min-h-dvh pb-4 overflow-y-auto flex-col flex-1 gap-4 p-2 px-4 font-urbanist items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to Xpense
          </h2>
          <p className="text-gray-600 mt-2">
            Please log in to view your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative min-h-dvh pb-4 overflow-y-auto flex-col flex-1 gap-4 p-2 px-4 font-urbanist">
      <Header />

      {isNewUser ? (
        // Show onboarding for new users with no transactions
        <div className="mt-4">
          <NewUserOnboarding onAddTransaction={handleAddTransaction} />
        </div>
      ) : (
        // Show normal dashboard for users with data
        <>
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
            <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-indigo-100 mt-1">
              Here's your financial overview
            </p>
          </div>

          {/* Balance Card */}
          <div className="">
            <BalanceCard balance={total_balance} spend={total_spend} />
          </div>

          {/* Transaction Statistics */}
          <TransactionStats />

          {/* Chart Component */}
          <Chart />

          {/* Recent Transactions */}
          <TransactionList />
        </>
      )}

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
      />
    </div>
  );
};

export default HomePage;
