import React, { useState, useEffect } from "react";
import { categoryAPI } from "@/utils/api";
import { CalendarIcon, FilterIcon, XIcon } from "lucide-react";

const TransactionFilters = ({ filters = {}, onFilterChange, onReset }) => {
  const [categories, setCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  // Fetch categories for filter options
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getCategories();
        if (response.success) {
          setCategories(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Update temp filters when filters prop changes
  useEffect(() => {
    setTempFilters(filters || {});
  }, [filters]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange(tempFilters);
  };

  // Reset filters
  const resetFilters = () => {
    const resetValues = {
      category: "",
      transaction_type: "",
      start_date: "",
      end_date: "",
      limit: 50,
      offset: 0,
    };
    setTempFilters(resetValues);
    onReset();
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      filters?.category ||
      filters?.transaction_type ||
      filters?.start_date ||
      filters?.end_date
    );
  };

  // Quick date presets
  const setDatePreset = (preset) => {
    const today = new Date();
    let start_date = "";
    let end_date = today.toISOString().split("T")[0];

    switch (preset) {
      case "today":
        start_date = today.toISOString().split("T")[0];
        break;
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        start_date = weekAgo.toISOString().split("T")[0];
        break;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        start_date = monthAgo.toISOString().split("T")[0];
        break;
      case "year":
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        start_date = yearAgo.toISOString().split("T")[0];
        break;
    }

    const newFilters = { ...tempFilters, start_date, end_date };
    setTempFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-gray-900">Filters</span>
            {hasActiveFilters() && (
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <button
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <XIcon className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {isExpanded ? "Hide" : "Show"} Filters
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filter Controls */}
      {isExpanded && (
        <div className="px-4 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Transaction Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={tempFilters.transaction_type}
                onChange={(e) =>
                  handleInputChange("transaction_type", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="">All Types</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={tempFilters.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={tempFilters.start_date}
                onChange={(e) =>
                  handleInputChange("start_date", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* End Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={tempFilters.end_date}
                onChange={(e) => handleInputChange("end_date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                min={tempFilters.start_date}
              />
            </div>
          </div>

          {/* Quick Date Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Date Filters
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDatePreset("today")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => setDatePreset("week")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Last 7 days
              </button>
              <button
                onClick={() => setDatePreset("month")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Last 30 days
              </button>
              <button
                onClick={() => setDatePreset("year")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Last year
              </button>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
