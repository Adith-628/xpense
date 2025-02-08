"use client";
import AddTransactionButton from "@/src/components/organisms/AddTransactionButton";
import Balance from "@/src/components/organisms/Balance";
import Chart from "@/src/components/organisms/Chart";
import Header from "@/src/components/organisms/Header";
import TransactionList from "@/src/components/organisms/TransactionList";
import { useStore } from "@/src/store";
import { useEffect } from "react";

export default function Dashboard() {
  const { fetchTransactions } = useStore();
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Balance />
            <TransactionList />
            <AddTransactionButton />
          </div>
          <div>
            <Chart />
          </div>
        </div>
      </main>
    </div>
  );
}
