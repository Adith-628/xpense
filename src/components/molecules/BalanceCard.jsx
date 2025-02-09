"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, IndianRupee } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/src/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BalanceCard = ({ balance, spend }) => {
  const [displayedBalance, setDisplayedBalance] = useState(0);
  const [displayedSpend, setDisplayedSpend] = useState(0);
  const { fetchDebits, debits } = useStore();
  const [duration, setDuration] = useState("");

  useEffect(() => {
    fetchDebits();
  }, []);

  useEffect(() => {
    debits?.map((debit) => {
      if (debit.period == duration) {
        setDisplayedSpend(debit.total);
      }
    });
  }, [duration]);

  useEffect(() => {
    if (balance !== null) {
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
  }, [balance]);

  useEffect(() => {
    if (spend !== null) {
      let start = 0;
      const duration = 500; // animation duration in ms
      const increment = spend / (duration / 10); // update every 10ms

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
      <CardHeader className="flex  items-center justify-between pb-2">
        <div className="flex w-full items-center justify-between">
          <div className="text-3xl font-semibold">Account</div>
          <div className="">
            <Image src="/wallet3.png" width={35} height={35} alt="visa" />
          </div>
        </div>
        <div className="w-full flex gap-10">
          {/* <DollarSign className="w-4 h-4 text-gray-500" /> */}
        </div>
      </CardHeader>
      <CardContent className="flex w-full gap-10">
        <div className="">
          <CardTitle className="text-md font-medium text-gray-500">
            Balance
          </CardTitle>
          <motion.div
            className="text-5xl flex items-center font-semibold my-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IndianRupee className="w-9 h-9 text-gray-500" />
            <div className="">{displayedBalance}</div>
          </motion.div>
        </div>
        <div className="flex-1">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
