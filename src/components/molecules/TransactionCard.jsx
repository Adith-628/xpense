import React from "react";

const TransactionCard = ({ transaction, handleDelete }) => {
  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100"
    >
      <div>
        <h3 className="font-medium text-gray-900">{transaction.description}</h3>
        {/* <p className="text-sm text-gray-500">{transaction.date}</p> */}
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`px-2  py-1 text-xs rounded-full ${
            transaction.category === "Need"
              ? "bg-emerald-100 text-emerald-800"
              : transaction.category === "Want"
              ? "bg-amber-100 text-amber-800"
              : "bg-indigo-100 text-indigo-800"
          }`}
        >
          {transaction.category}
        </span>
        <span className="font-medium text-gray-900">${transaction.amount}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
