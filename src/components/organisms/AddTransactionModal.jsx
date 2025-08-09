"use client";

import { useState } from "react";
import { useStore } from "@/src/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AddTransactionModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Dining");
  const [transactionType, setTransactionType] = useState("expense");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addTransaction } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!category) {
      setError("Category is required");
      return;
    }

    setLoading(true);

    try {
      await addTransaction({
        title: title.trim(),
        description: description.trim() || undefined,
        amount: parseFloat(amount),
        category,
        transaction_type: transactionType,
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      });

      // Reset form
      setTitle("");
      setDescription("");
      setAmount("");
      setCategory("Food & Dining");
      setTransactionType("expense");
      onClose();
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError(error.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[1px] overflow-y-auto h-lvh w-full flex items-center justify-center">
      <div className="bg-white px-4  py-6 pt-4 rounded-xl shadow-xl w-[90%] ">
        <h2 className="text-xl font-bold mb-2">Add Transaction</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title *
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Lunch at restaurant"
              className="mt-1 block w-full rounded-lg px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details..."
              className="mt-1 block w-full rounded-lg px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount *
            </label>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div className="flex mt-2 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="w-full h-10 shadow-sm py-2 px-3 text-sm rounded-lg focus:outline-indigo-200 focus:ring-0 focus:outline-none">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {/* Expense Categories */}
                  <SelectItem
                    value="Food & Dining"
                    className="rounded-lg text-sm"
                  >
                    🍽️ Food & Dining
                  </SelectItem>
                  <SelectItem
                    value="Transportation"
                    className="rounded-lg text-sm"
                  >
                    🚗 Transportation
                  </SelectItem>
                  <SelectItem value="Shopping" className="rounded-lg text-sm">
                    🛒 Shopping
                  </SelectItem>
                  <SelectItem
                    value="Entertainment"
                    className="rounded-lg text-sm"
                  >
                    🎬 Entertainment
                  </SelectItem>
                  <SelectItem
                    value="Bills & Utilities"
                    className="rounded-lg text-sm"
                  >
                    ⚡ Bills & Utilities
                  </SelectItem>
                  <SelectItem value="Healthcare" className="rounded-lg text-sm">
                    🏥 Healthcare
                  </SelectItem>
                  <SelectItem value="Education" className="rounded-lg text-sm">
                    📚 Education
                  </SelectItem>
                  <SelectItem value="Travel" className="rounded-lg text-sm">
                    ✈️ Travel
                  </SelectItem>
                  <SelectItem value="Business" className="rounded-lg text-sm">
                    💼 Business
                  </SelectItem>
                  <SelectItem value="Other" className="rounded-lg text-sm">
                    📝 Other
                  </SelectItem>
                  {/* Income Categories */}
                  <SelectItem value="Salary" className="rounded-lg text-sm">
                    💰 Salary
                  </SelectItem>
                  <SelectItem value="Freelance" className="rounded-lg text-sm">
                    💻 Freelance
                  </SelectItem>
                  <SelectItem value="Investment" className="rounded-lg text-sm">
                    📈 Investment
                  </SelectItem>
                  <SelectItem value="Gift" className="rounded-lg text-sm">
                    🎁 Gift
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <Select
                onValueChange={setTransactionType}
                value={transactionType}
              >
                <SelectTrigger className="w-full h-10 shadow-sm py-2 px-3 text-sm rounded-lg focus:outline-indigo-200 focus:ring-0 focus:outline-none">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="expense" className="rounded-lg text-sm">
                    💸 Expense
                  </SelectItem>
                  <SelectItem value="income" className="rounded-lg text-sm">
                    💰 Income
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
