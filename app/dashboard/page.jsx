"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate";
import AddTransaction from "@/src/components/organisms/AddTransaction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BalanceCard from "@/src/components/molecules/BalanceCard";
import TransactionCard from "@/src/components/molecules/TransactionCard";
import { useStore } from "@/src/store";

const TransactionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const { user } = useStore();
  const displayedBalance = 0;

  // const name = user?.displayName;
  const name = "Hello";

  const [transactions, setTransactions] = useState([]);

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
          {/* <Image
            className="rounded-full object-contain"
            src={user?.photoURL}
            alt="profile"
            width={50}
            height={50}
          /> */}
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
        {/* <AddTransaction
          isOpen={isOpen}
          balance={balance}
          setIsOpen={setIsOpen}
          // fetchTransactions={fetchTransactions}
        /> */}
      </div>
      {/* <DockDemo /> */}
    </div>
  );
};

export default TransactionPage;
