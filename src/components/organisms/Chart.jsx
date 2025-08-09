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
  const { transactions = [], stats = [], fetchStats, dashboardInitialized } = useStore();
  console.log("stats", stats);

  useEffect(() => {
    // Only fetch stats if dashboard hasn't been initialized
    if (!dashboardInitialized) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    { name: "Investment", value: 0 },
    { name: "Need", value: 0 },
    { name: "Want", value: 0 },
  ];

  if (transactions && transactions.length > 0) {
    transactions.forEach((transaction) => {
      const index = data.findIndex(
        (item) => item.name === transaction.category
      );
      if (index !== -1) {
        const amount = parseFloat(transaction.amount) || 0;
        data[index].value += Math.abs(amount);
      }
    });
  }

  const hasData = data.some((item) => item.value > 0);

  return (
    <div className="bg-[#E9F6F6] rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Statistics</h2>
      {hasData ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Data Available
          </h3>
          <p className="text-sm text-gray-500">
            Add some transactions to see your spending statistics
          </p>
        </div>
      )}
    </div>
  );
}
