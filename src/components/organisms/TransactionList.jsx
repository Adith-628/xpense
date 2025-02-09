"use client";

import { useStore } from "@/src/store";
import TransactionCard from "../molecules/TransactionCard";
import { useEffect } from "react";

export default function TransactionList() {
  const {
    transactions,
    recent_transactions,
    fetchTransactions,
    fetchRecentTransactions,
  } = useStore();

  useEffect(() => {
    fetchTransactions();
    fetchRecentTransactions();
  }, []);

  return (
    <div className="bg-white rounded-lg flex flex-col px-2 gap-2 py-2 my-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold ">Recent Transactions</h2>
        <h2 className="text-xs bg-[#ECEBFF] p-1 rounded-full px-2  text-gray-500">
          view all
        </h2>
      </div>
      <ul className="flex flex-col gap-2">
        {recent_transactions.map((transaction) => (
          <TransactionCard transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}
