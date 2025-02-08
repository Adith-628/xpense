"use client";
import React, { useMemo } from "react";
import GradientGaugeChart from "../molecules/GaugeChart";

const TodaysExpense = ({ transactions }) => {
  // Get today's date in "YYYY-MM-DD" format
  const today = new Date().toISOString().split("T")[0];

  // Calculate total for today
  const todaysTotal = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.date === today)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  }, [transactions, today]);

  return (
    // <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
    //   <h2 className="text-2xl font-bold mb-4">Today's Expenses</h2>
    //   <div className="flex items-center justify-between border-b border-gray-700 pb-4">
    //     <span className="text-lg text-gray-300">Date:</span>
    //     <span className="text-lg font-medium text-blue-400">{today}</span>
    //   </div>
    //   <div className="mt-4 text-center">
    //     <p className="text-4xl font-bold text-green-400">
    //       ${todaysTotal.toLocaleString()}
    //     </p>
    //     <p className="text-gray-400 mt-2">Total spent today</p>
    //   </div>
    // </div>
    <div className="">
      <div className="">
        <GradientGaugeChart />
      </div>
      <div className=""></div>
    </div>
  );
};

export default TodaysExpense;
