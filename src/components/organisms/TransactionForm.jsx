import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { categoryAPI } from "@/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      category: "",
      transaction_type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const transactionType = watch("transaction_type");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await categoryAPI.getCategories();
        if (response.success) {
          setCategories(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (transaction) {
      setValue("title", transaction.title || "");
      setValue("description", transaction.description || "");
      setValue("amount", transaction.amount || "");
      setValue("category", transaction.category || "");
      setValue("transaction_type", transaction.transaction_type || "expense");
      setValue(
        "date",
        transaction.date || new Date().toISOString().split("T")[0]
      );
    }
  }, [transaction, setValue]);

  // Filter categories based on transaction type
  const getFilteredCategories = () => {
    return categories.filter((category) => {
      if (transactionType === "income") {
        return ["Salary", "Freelance", "Investment", "Gift"].includes(
          category.name
        );
      } else {
        return !["Salary", "Freelance", "Investment", "Gift"].includes(
          category.name
        );
      }
    });
  };

  const onFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      await onSubmit({
        ...data,
        amount: parseFloat(data.amount),
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      // You could show an error message here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Edit Transaction" : "Add New Transaction"}
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? "Update the transaction details below."
              : "Fill in the details to create a new transaction."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Lunch at restaurant"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Transaction Type */}
          <div>
            <label
              htmlFor="transaction_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type *
            </label>
            <select
              id="transaction_type"
              {...register("transaction_type", {
                required: "Transaction type is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.transaction_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transaction_type.message}
              </p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount ($) *
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                validate: (value) =>
                  !isNaN(parseFloat(value)) || "Please enter a valid number",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a category</option>
              {getFilteredCategories().map((category) => (
                <option key={category.id} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date *
            </label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Additional details about this transaction..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : transaction ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
