"use client";

import { useStore } from "@/src/store";

export default function Balance() {
  const { transactions } = useStore();

  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalSpent = transactions.reduce(
    (acc, transaction) =>
      acc + (transaction.amount < 0 ? -transaction.amount : 0),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Current Balance</p>
          <p className="text-2xl font-bold text-green-600">
            ${balance.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Total Amount Spent</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
