import React from "react";
import { format } from "date-fns";
import { IndianRupeeIcon } from "lucide-react";

const TransactionCard = ({ transaction, handleDelete }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return format(date, "dd MMM yyyy, hh:mm a"); // Example: "08 Feb 2025, 08:03 PM"
  };
  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-2 mt-0 bg-white rounded-lg  border-gray-100"
    >
      <div>
        <h3 className="font-medium text-gray-900">{transaction.description}</h3>
        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
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
        <div className="font-medium flex items-center text-gray-900">
          <IndianRupeeIcon
            size={16}
            // className={`${
            //   transaction.type === "Income"
            //     ? "text-emerald-800"
            //     : "text-rose-800"
            // }`}
          />
          <div className="">{transaction.amount}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
