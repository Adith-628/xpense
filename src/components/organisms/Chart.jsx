"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useStore } from "@/src/store";
import { useEffect } from "react";

const COLORS = ["#3730A390", "#00C49F", "#FFBB28"];

export default function Chart() {
  const { transactions, stats, fetchStats } = useStore();
  console.log("stats", stats);

  useEffect(() => {
    fetchStats();
  }, []);

  const data = [
    { name: "Investment", value: 0 },
    { name: "Need", value: 0 },
    { name: "Want", value: 0 },
  ];

  transactions.forEach((transaction) => {
    const index = data.findIndex((item) => item.name === transaction.category);
    if (index !== -1) {
      data[index].value += Math.abs(transaction.amount);
    }
  });

  return (
    <div className="bg-[#E9F6F6] rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Satistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className="focus:outline-none"
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            labelStyle={{ color: "black", fontSize: "14px" }}
            contentStyle={{
              borderRadius: "8px",
              padding: "5px",
              fontSize: "14px",
            }}
            className="rounded-lg"
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
