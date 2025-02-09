"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/utils/auth";
import Image from "next/image";
import { useStore } from "@/src/store";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-svh w-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/logo2.png"
          alt="Xpense Logo"
          width={80}
          height={80}
          className="mb-4"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Sign in to continue tracking your expenses
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Extra Options */}
        <div className="w-full flex justify-between items-center mt-4 text-sm">
          <button
            onClick={() => router.push("/forgot-password")}
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="text-indigo-600 hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
