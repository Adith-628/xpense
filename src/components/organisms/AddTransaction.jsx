import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTransaction = ({ isOpen, setIsOpen, balance, fetchTransactions }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    console.log("category", category);
  }, [category]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Data</DialogTitle>
          <DialogDescription>
            Fill in the details below and submit the form to upload your data.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Field */}
          <div className="flex flex-col">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="border rounded p-2"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="need">Need</option>
              <option value="want">Want</option>
              <option value="investment">Investment</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="">
            <div className="">type</div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Amount Field */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="font-medium">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              {...register("amount", {
                required: "Amount is required",
                validate: (value) =>
                  value > 0 || "Amount must be greater than 0",
              })}
              className="border rounded p-2"
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Date Field */}
          <div className="flex flex-col">
            <label htmlFor="date" className="font-medium">
              Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
              className="border rounded p-2"
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
