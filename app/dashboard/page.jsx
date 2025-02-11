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
  const { user, fetchBalance, total_spend, fetchSpend, total_balance } =
    useStore();
  // const displayedBalance = 0;

  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  useEffect(() => {
    fetchBalance();
    fetchSpend();
  }, []);

  const [transactions, setTransactions] = useState([]);

  return (
    <div className="flex relative min-h-dvh pb-4 overflow-y-auto flex-col flex-1 gap-4 p-2 px-4 font-urbanist">
      <Header />
      <div className="">
        <BalanceCard balance={total_balance} spend={total_spend} />
      </div>

      {/* <Chart /> */}
      {/* <DailyExpense transactions={transactions} /> */}
      <TransactionList />
      {/* <AddTransactionButton /> */}

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
