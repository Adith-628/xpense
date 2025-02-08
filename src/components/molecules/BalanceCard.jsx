"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import Image from "next/image";

const BalanceCard = ({ balance }) => {
  const [displayedBalance, setDisplayedBalance] = useState(0);

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
  return (
    <Card>
      <CardHeader className="flex  items-center justify-between pb-2">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-semibold">Account</div>
          <div className="">
            <Image src="/wallet3.png" width={35} height={35} alt="visa" />
          </div>
        </div>
        <div className="w-full flex">
          <CardTitle className="text-sm font-medium text-gray-500">
            Current Balance
          </CardTitle>
          {/* <DollarSign className="w-4 h-4 text-gray-500" /> */}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="text-5xl font-semibold my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ${displayedBalance}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
