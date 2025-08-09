"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useStore } from "@/src/store";
import { useEffect, useState, useCallback } from "react";
import { transactionAPI } from "@/utils/api";

const EXPENSE_COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
];

export default function Chart() {
  const { user, dashboardInitialized } = useStore();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("pie"); // 'pie' or 'bar'

  const fetchCategoryStats = useCallback(async () => {
    if (!user || loading) return;

    setLoading(true);
    try {
      const response = await transactionAPI.getStatsCategories({
        transaction_type: "expense", // Focus on expenses for better insights
      });

      if (response.success && response.data) {
        // Format data for charts
        const formattedData = response.data
          .filter((item) => item.total_amount > 0)
          .map((item, index) => ({
            name: item.category,
            value: parseFloat(item.total_amount),
            count: item.transaction_count,
            color: EXPENSE_COLORS[index % EXPENSE_COLORS.length],
          }))
          .sort((a, b) => b.value - a.value) // Sort by amount descending
          .slice(0, 8); // Top 8 categories

        setChartData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching category stats:", error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    // Only fetch stats if dashboard hasn't been initialized
    if (!dashboardInitialized && user) {
      fetchCategoryStats();
    }
  }, [dashboardInitialized, user, fetchCategoryStats]);

  const hasData = chartData.length > 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-lg">
          <p className="font-medium text-gray-900">{data.payload.name}</p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="font-semibold text-green-600">
              ₹{data.value.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Transactions:{" "}
            <span className="font-semibold">{data.payload.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Expense Analytics</h2>
          <p className="text-sm text-gray-600">
            Category-wise spending breakdown
          </p>
        </div>

        {hasData && (
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType("pie")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                chartType === "pie"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pie
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                chartType === "bar"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Bar
            </button>
          </div>
        )}
      </div>
      {/* Chart Content */}
      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : hasData ? (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={40} // Donut chart
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontWeight: 500 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  fill={(entry, index) => chartData[index]?.color || "#3B82F6"}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
          <div className="mb-4 p-4 bg-gray-100 rounded-full">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Spending Data
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Start adding expenses to see your spending patterns and category
            breakdown
          </p>
        </div>
      )}
    </div>
  );
}
