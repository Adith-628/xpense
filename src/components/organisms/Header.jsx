"use client";

import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";
import { initAuth, signOut } from "@/utils/auth";
import Image from "next/image";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const { user } = useStore();
  console.log(user);

  useEffect(() => {
    initAuth();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              className="rounded-full object-cover ring-2 ring-white/30 shadow-md"
              src={"/profile.jpg"}
              alt="profile"
              width={44}
              height={44}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="font-urbanist flex flex-col leading-tight">
            <span className="text-xs text-gray-600 font-medium">
              Welcome back!
            </span>
            <span className="text-lg font-bold text-gray-900">
              {user?.fullName || user?.name || "User"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
