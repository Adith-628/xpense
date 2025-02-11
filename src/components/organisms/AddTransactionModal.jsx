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
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Need");
  const [type, setType] = useState("credit");
  const { addTransaction } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      amount: Number.parseFloat(amount),
      category,
      type,
      date: new Date().toISOString(),
    });
    console.log("Transaction added");
    onClose();
    setDescription("");
    setAmount("");
    setCategory("Need");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[1px] overflow-y-auto h-lvh w-full flex items-center justify-center">
      <div className="bg-white px-4  py-6 pt-4 rounded-xl shadow-xl w-[90%] ">
        <h2 className="text-xl font-bold mb-2">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className="flex mt-2  gap-4">
            <Select onValueChange={setCategory} className="w-[80px] text-xs ">
              <SelectTrigger className="w-fit h-fit  shadow-sm py-1 px-2 text-xs rounded-lg focus:outline-indigo-200 focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="w-fit  rounded-xl">
                <SelectItem value="Need" className="rounded-lg text-xs">
                  Need
                </SelectItem>
                <SelectItem value="Want" className="rounded-lg text-xs">
                  Want
                </SelectItem>
                <SelectItem value="Investment" className="rounded-lg text-xs">
                  Investment
                </SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setType} className="w-[80px] text-xs ">
              <SelectTrigger className="w-fit h-fit shadow-sm  py-1 px-2 text-xs rounded-lg focus:outline-indigo-200 focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="w-fit  rounded-xl">
                <SelectItem value="credit" className="rounded-lg text-xs">
                  Credit
                </SelectItem>
                <SelectItem value="debit" className="rounded-lg text-xs">
                  Debit
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
