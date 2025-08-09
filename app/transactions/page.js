"use client";
import FloatingNavBar from "@/src/components/molecules/NavBar";
import Header from "@/src/components/organisms/Header";
import TransactionManager from "@/src/components/organisms/TransactionManager";
import { useStore } from "@/src/store";
import React, { useEffect } from "react";

const TransactionsPage = () => {
  const { user, loading } = useStore();

  if (loading) {
    return (
      <div className="min-h-svh font-fira w-screen overflow-x-hidden p-2 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-svh font-fira w-screen overflow-x-hidden p-2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Please log in</h2>
          <p className="text-gray-600">
            You need to be logged in to view transactions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh font-fira w-screen overflow-x-hidden p-2">
      <Header />
      <div className="px-2 pb-20">
        <div className="text-2xl my-4 font-semibold text-slate-800">
          Transaction Management
        </div>
        <TransactionManager />
      </div>

      <FloatingNavBar />
    </div>
  );
};

export default TransactionsPage;
