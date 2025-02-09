"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate";
import AddTransaction from "@/src/components/organisms/AddTransaction";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import BalanceCard from "@/src/components/molecules/BalanceCard";
import TransactionCard from "@/src/components/molecules/TransactionCard";
import { useStore } from "@/src/store";
import TransactionList from "@/src/components/organisms/TransactionList";
import AddTransactionModal from "@/src/components/organisms/AddTransactionModal";
import AddTransactionButton from "@/src/components/organisms/AddTransactionButton";
import Header from "@/src/components/organisms/Header";
import Chart from "@/src/components/organisms/Chart";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const { user, fetchBalance, total_spend, fetchSpend, total_balance } =
    useStore();
  // const displayedBalance = 0;

  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    fetchBalance();
    fetchSpend();
  }, []);

  const [transactions, setTransactions] = useState([]);

  return (
    <div className="flex relative min-h-dvh pb-14 overflow-y-auto flex-col flex-1 gap-4 p-2 px-4 font-urbanist">
      <div className="font-fira flex justify-between items-center">
        {/* <div className="text-4xl flex items-center gap-1.5 py-4 ">
          <span className="text-slate-500 tracking-tight">
            Hi,{""}
            {userName}{" "}
          </span>
          <span className="font-bold text-slate-950">
            <TextGenerateEffect
              className="font-bold text-4xl"
              duration={1}
              filter={false}
              words={userName}
            />
          </span>
        </div> */}
        <Header />
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

      <div className="">
        <BalanceCard balance={total_balance} spend={total_spend} />
      </div>

      <Chart />
      {/* <DailyExpense transactions={transactions} /> */}
      <TransactionList />
      <AddTransactionButton />

      {/* <div className="flex flex-col gap-4">
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
        /> 
      </div> */}
      {/* <DockDemo /> */}
    </div>
  );
};

export default HomePage;
