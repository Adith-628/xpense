"use client";

import { useStore } from "@/src/store";
import TransactionCard from "../molecules/TransactionCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import AddTransactionModal from "./AddTransactionModal";

export default function TransactionList() {
  const {
    transactions,
    recent_transactions,
    fetchTransactions,
    fetchRecentTransactions,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchRecentTransactions();
  }, []);

  return (
    <div className="bg-white rounded-lg flex flex-col px-2 gap-2 py-2 my-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex gap-2 items-center ">
          Recent Transactions
          <span>
            <PlusCircleIcon
              onClick={() => setIsModalOpen(true)}
              className="w-4 h-4 text-indigo-400"
            />
          </span>
        </h2>
        <Link
          href={"/transactions"}
          className="text-xs bg-[#ECEBFF] border border-indigo-400/20 p-1 rounded-full px-2  text-gray-500"
        >
          view all
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {recent_transactions.map((transaction) => (
          <TransactionCard transaction={transaction} />
        ))}
      </div>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
