"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate";
import AddTransaction from "@/src/components/organisms/AddTransaction";
import { fetchBalance } from "@/src/features/transaction/asyncFn";
import { deleteTransaction } from "@/utils/api/deleteTransaction";
import { getUserTransactions } from "@/utils/api/getUserTransactions";
import { updateBalance } from "@/utils/api/updateBalance";
import withAuth from "@/utils/protectedRoute/withAuth";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { DockDemo } from "@/src/components/molecules/Footer";
import TransationsTable from "@/src/components/organisms/TransationsTable";
import DailyExpense from "@/src/components/organisms/DailyExpenses";
import BalanceCard from "@/src/components/molecules/BalanceCard";
import TransactionCard from "@/src/components/molecules/TransactionCard";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { balance, status, error } = useSelector((state) => state.transaction);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const name = user?.displayName;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const userId = "USER_ID_HERE"; // Replace with dynamic user ID
    dispatch(fetchBalance(userId));
  }, [dispatch]);

  const fetchTransactions = async () => {
    const response = await getUserTransactions("xnzZNrWNO48O5Vx3Ha5y");
    if (response.status === "success") {
      setTransactions(response.data); // Assuming response.data is an array
      console.log("Transactions fetched successfully", response.data);
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
  const [displayedBalance, setDisplayedBalance] = useState(0);

  useEffect(() => {
    if (status !== "loading" && balance !== null) {
      let start = 0;
      const duration = 500; // animation duration in ms
      const increment = balance / (duration / 10); // update every 10ms

      const timer = setInterval(() => {
        start += increment;
        if (start >= balance) {
          start = balance;
          clearInterval(timer);
        }
        setDisplayedBalance(parseFloat(start.toFixed(2)));
      }, 10);

      return () => clearInterval(timer); // cleanup on unmount
    }
  }, [balance, status]);

  return (
    <div className="flex relative min-h-screen overflow-y-auto flex-col flex-1 gap-4 px-4 font-urbanist">
      <div className="font-fira flex py-4 justify-between items-center">
        <div className="text-4xl flex items-center gap-1.5 py-4 ">
          <span className="text-slate-500 tracking-tight">Hi,{""}</span>
          <span className="font-bold text-slate-950">
            <TextGenerateEffect
              className="font-bold text-4xl"
              duration={1}
              filter={false}
              words={name}
            />
          </span>
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

      {/* Balance Card */}
      {/* <div className="">
          Balance:{" "}
          <span>
            {status === "loading" ? (
              <div className="text-sm">Loading....</div>
            ) : balance !== null ? (
              <motion.div
                className="text-5xl font-semibold my-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ${displayedBalance}
              </motion.div>
            ) : (
              "Fetching..."
            )}
          </span>
        </div> */}
      <div className="">
        <BalanceCard balance={displayedBalance} />
      </div>

      {/* <DailyExpense transactions={transactions} /> */}
      {/* <TransationsTable transactions={transactions} /> */}
      <div className="flex flex-col gap-4">
        <div className="font-bold text-lg"> Transactions</div>
        <div className="flex flex-col gap-2">
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
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
      {/* <DockDemo /> */}
    </div>
  );
};

export default withAuth(TransactionPage);
