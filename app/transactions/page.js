"use client";
import TransactionCard from "@/src/components/molecules/TransactionCard";
import Header from "@/src/components/organisms/Header";
import { useStore } from "@/src/store";
import React, { useEffect } from "react";

const TransactionsPage = () => {
  const { transactions, fetchTransactions } = useStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-svh font-fira w-screen overflow-x-hidden p-2">
      <Header />
      <div className="px-2">
        <div className="text-2xl my-4 font-semibold text-slate-800">
          Transaction History
        </div>
        <div>
          {transactions.map((transaction) => (
            <TransactionCard transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
