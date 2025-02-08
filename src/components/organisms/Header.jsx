"use client";

import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";
import { signOut } from "@/utils/auth";

export default function Header() {
  const router = useRouter();
  const { user } = useStore();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
