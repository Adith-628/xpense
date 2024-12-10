"use client";

import AddTransaction from "@/src/components/organisms/AddTransaction";
import { fetchBalance } from "@/src/features/transaction/asyncFn";
import { credit, debit } from "@/src/features/transaction/transactionSlice";
import { deleteTransaction } from "@/utils/api/deleteTransaction";
import { getUserTransactions } from "@/utils/api/getUserTransactions";
import { updateBalance } from "@/utils/api/updateBalance";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { balance, status, error } = useSelector((state) => state.transaction);
  const { user } = useSelector((state) => state.user);
  const name = user?.name;
  console.log(user, "----");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const userId = "USER_ID_HERE"; // Replace with dynamic user ID
    dispatch(fetchBalance(userId));
  }, [dispatch]);

  const fetchTransactions = async () => {
    const response = await getUserTransactions("xnzZNrWNO48O5Vx3Ha5y");
    if (response.status === "success") {
      setTransactions(response.data); // Assuming response.data is an array
    } else {
      console.log("Error fetching transactions", response.error);
    }
  };

  const handleDelete = async (data) => {
    // Add logic to delete transaction
    try {
      const res = await deleteTransaction(data.id);
      if (res.status === "success") {
        await updateBalance(
          "xnzZNrWNO48O5Vx3Ha5y",
          data.amount,
          data.type,
          true
        );
        dispatch(fetchBalance());
        fetchTransactions();
      }

      alert("Transaction deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-2 font-urbanist">
      <div className="font-fira flex justify-between items-center">
        <div className="text-4xl py-4 font-medium">
          Hi,{""}
          <span className="font-bold"> {name}</span>
        </div>
        <div className="">
          {/* profile image */}
          <Image
            className="rounded-full object-contain"
            src={user?.photoURL}
            alt="profile"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="">
        <h1 className="font-urbanist">
          Balance:{" "}
          {status == "loading"
            ? "loading.."
            : balance !== null
            ? `$${balance}`
            : "Fetching..."}
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="">Transactions</div>
        <div className="">
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex gap-2 p-2 bg-gray-500 justify-start"
              >
                <div>{transaction.name}</div>
                <div>{transaction.amount}</div>
                <div className="">{transaction.type}</div>
                <Trash2Icon
                  className="cursor-pointer"
                  onClick={() => handleDelete(transaction)}
                />
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
      <div className="">
        <button onClick={() => setIsOpen(true)}>Add transaction</button>
        <AddTransaction
          isOpen={isOpen}
          balance={balance}
          setIsOpen={setIsOpen}
          fetchTransactions={fetchTransactions}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
