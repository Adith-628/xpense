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
    <Card className="rounded-2xl bg-[#ECEBFF]/50">
      <CardContent className="flex w-full flex-col p-4 gap-6">
        <div className="flex justify-between items-center w-full">
          <div className="">
            <div className="text-lg text-gray-700 font-semibold">
              Total Balance
            </div>
            <motion.div
              className="text-4xl flex items-center font-semibold "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LucideIndianRupee className="w-7 h-7 text-black" />
              <div className="">{displayedBalance}.20</div>
            </motion.div>
          </div>
          <div className="">
            <Image
              unoptimized
              src="/wallet3.png"
              width={35}
              height={35}
              className="w-16"
              alt="visa"
            />
          </div>
        </div>
        <div className="flex w-full justify-between items-center gap-4">
          <div className="">
            <div className="flex text-sm items-center gap-1 text-gray-600">
              <ArrowDownCircle className="w-4 h-4  text-gray-400  rounded-full" />
              <span>Income</span>
            </div>
            <div className="flex items-center font-semibold gap-0.5">
              <IndianRupee className="w-4 h-4 text-black  rounded-full" />
              {displayedSpend}
            </div>
          </div>
          <div className="">
            <div className="flex text-sm  items-center gap-1 text-gray-600">
              <ArrowUpCircle className="w-4 h-4 text-gray-400  rounded-full" />
              <span>Expenses</span>
            </div>
            <div className="font-semibold flex items-center justify-end">
              <IndianRupee className="w-4 h-4 text-black  rounded-full" />
              {displayedSpend}
            </div>
          </div>
        </div>

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
