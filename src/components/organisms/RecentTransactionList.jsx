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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {recent_transactions && recent_transactions.length > 0 ? (
          recent_transactions.map((transaction, index) => (
            <TransactionCard
              key={transaction.id || index}
              transaction={transaction}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No transactions yet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Get started by adding your first transaction
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Transaction
            </button>
          </div>
        )}
      </div>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
