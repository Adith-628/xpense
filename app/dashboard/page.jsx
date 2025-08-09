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
  const [defaultTransactionType, setDefaultTransactionType] =
    useState("expense");
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

  const handleAddTransaction = (type = "expense") => {
    setDefaultTransactionType(type);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="flex relative min-h-dvh pb-4 overflow-y-auto flex-col flex-1 gap-4 p-3 md:p-4 font-urbanist max-w-7xl mx-auto">
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
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-4 md:p-5 text-white shadow-xl border border-white/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold mb-1">
                    Welcome back, {userName}! 👋
                  </h1>
                  <p className="text-indigo-100 text-sm md:text-base">
                    Here's your financial overview for today
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="text-right">
                    <p className="text-indigo-200 text-xs">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column - Balance Card */}
              <div className="lg:col-span-8">
                <BalanceCard
                  balance={total_balance}
                  spend={total_spend}
                  onAddTransaction={handleAddTransaction}
                />
              </div>

              {/* Right Column - Quick Stats */}
              <div className="lg:col-span-4">
                <TransactionStats />
              </div>
            </div>

            {/* Chart and Recent Transactions */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              {/* Chart Section */}
              <div className="xl:col-span-7">
                <Chart />
              </div>

              {/* Recent Transactions Section */}
              <div className="xl:col-span-5">
                <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Recent Transactions
                    </h2>
                    <button
                      onClick={() => handleAddTransaction("expense")}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-medium"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="overflow-hidden">
                    <TransactionList onAddTransaction={handleAddTransaction} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Global Add Transaction Modal - Outside main container for proper overlay */}
      <AddTransactionModal
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        defaultType={defaultTransactionType}
      />
    </div>
  );
};

export default HomePage;
