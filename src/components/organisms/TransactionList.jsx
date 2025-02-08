"use client";

import { useStore } from "@/src/store";

export default function TransactionList() {
  const { transactions } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Expense History</h2>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
            <span
              className={`font-semibold ${
                transaction.amount < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              ${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
