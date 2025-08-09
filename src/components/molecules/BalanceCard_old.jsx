"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  IndianRupee,
  LucideIndianRupee,
} from "lucide-react";
import Image from "next/image";
import { useStore } from "@/src/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BalanceCard = ({ balance = 0, spend = 0 }) => {
  const [displayedBalance, setDisplayedBalance] = useState(0);
  const [displayedSpend, setDisplayedSpend] = useState(0);
  const { fetchDebits, debits = [], dashboardInitialized } = useStore();
  const [duration, setDuration] = useState("");

  useEffect(() => {
    // Only fetch debits if dashboard hasn't been initialized
    if (!dashboardInitialized) {
      fetchDebits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (debits && debits.length > 0) {
      debits.forEach((debit) => {
        if (debit.period === duration) {
          setDisplayedSpend(debit.total || 0);
        }
      });
    }
  }, [duration, debits]);

  useEffect(() => {
    if (balance !== null && balance !== undefined) {
      let start = 0;
      const animationDuration = 500; // animation duration in ms
      const increment = balance / (animationDuration / 10); // update every 10ms

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
  }, [balance]);

  useEffect(() => {
    if (spend !== null && spend !== undefined) {
      let start = 0;
      const animationDuration = 500; // animation duration in ms
      const increment = spend / (animationDuration / 10); // update every 10ms

      const timer = setInterval(() => {
        start += increment;
        if (start >= spend) {
          start = spend;
          clearInterval(timer);
        }
        setDisplayedSpend(parseFloat(start.toFixed(2)));
      }, 10);

      return () => clearInterval(timer); // cleanup on unmount
    }
  }, [spend]);

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Total Balance</p>
          <motion.div
            className="text-3xl md:text-4xl flex items-center font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LucideIndianRupee className="w-6 h-6 md:w-8 md:h-8" />
            <span>{displayedBalance.toLocaleString()}</span>
          </motion.div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
          <Image
            unoptimized
            src="/wallet3.png"
            width={32}
            height={32}
            className="w-8 h-8 filter brightness-0 invert"
            alt="wallet"
          />
        </div>
      </div>

      {/* Income & Expenses */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50/80 rounded-xl p-4 border border-green-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-500 rounded-lg">
              <ArrowDownCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-green-700">Income</span>
          </div>
          <div className="flex items-center font-bold text-green-800">
            <IndianRupee className="w-4 h-4" />
            <span className="text-lg">{displayedBalance.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-red-50/80 rounded-xl p-4 border border-red-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-red-500 rounded-lg">
              <ArrowUpCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-red-700">Expenses</span>
          </div>
          <div className="flex items-center font-bold text-red-800">
            <IndianRupee className="w-4 h-4" />
            <span className="text-lg">{displayedSpend.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 p-3 bg-indigo-100/80 hover:bg-indigo-200/80 rounded-xl border border-indigo-200/50 transition-colors">
          <ArrowDownCircle className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">Add Income</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-purple-100/80 hover:bg-purple-200/80 rounded-xl border border-purple-200/50 transition-colors">
          <ArrowUpCircle className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">Add Expense</span>
        </button>
      </div>
    </div>
  );

        {/* <div className="flex-1">
          <CardTitle className="text-md flex justify-between w-full items-center gap-2 font-medium text-gray-500">
            <div className="">Spend</div>
            <Select onValueChange={setDuration} className="w-[80px] text-xs ">
              <SelectTrigger className="w-fit h-fit py-1 px-2 text-xs rounded-full focus:outline-indigo-200 focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Monthly" />
              </SelectTrigger>
              <SelectContent className="w-fit  rounded-xl">
                <SelectItem value="daily" className="rounded-lg text-xs">
                  Daily
                </SelectItem>
                <SelectItem value="weekly" className="rounded-lg text-xs">
                  Weekly
                </SelectItem>
                <SelectItem value="monthly" className="rounded-lg text-xs">
                  Monthly
                </SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>

          <motion.div
            className="text-5xl flex items-center font-semibold my-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IndianRupee className="w-9 h-9 text-gray-500" />

            <div className="">{displayedSpend}</div>
          </motion.div>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
