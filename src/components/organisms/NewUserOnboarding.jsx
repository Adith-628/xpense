"use client";

import React from "react";
import { PlusCircleIcon, ArrowRightIcon } from "lucide-react";

const NewUserOnboarding = ({ onAddTransaction }) => {
  const features = [
    {
      title: "Track Income & Expenses",
      description: "Add transactions to monitor your financial flow",
      icon: "💰",
    },
    {
      title: "Categorize Spending",
      description: "Organize expenses by categories for better insights",
      icon: "📊",
    },
    {
      title: "View Analytics",
      description: "Get detailed statistics and visual charts",
      icon: "📈",
    },
    {
      title: "Monitor Balance",
      description: "Keep track of your net worth and spending patterns",
      icon: "⚖️",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Xpense!
          </h2>
          <p className="text-gray-600 text-lg">
            You're all set to start managing your finances. Let's add your first
            transaction to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-left"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <button
            onClick={onAddTransaction}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Your First Transaction
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>

          <p className="text-sm text-gray-500">
            Don't worry, you can always edit or delete transactions later
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">$0.00</div>
              <div className="text-sm text-gray-600">Total Balance</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$0.00</div>
              <div className="text-sm text-gray-600">Total Income</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$0.00</div>
              <div className="text-sm text-gray-600">Total Expenses</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your financial overview will appear here once you add transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewUserOnboarding;
