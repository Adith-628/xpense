"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import Image from "next/image";

const ExpenseCard = ({ balance = 0 }) => {
  return (
    <Card>
      <CardHeader className="flex  items-center justify-between pb-2">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-semibold">Total Spend</div>
          {/* <div className="">
            <Image src="/wallet3.png" width={35} height={35} alt="visa" />
          </div> */}
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
          ${balance}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
