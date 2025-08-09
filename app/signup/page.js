"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/auth"; // Ensure correct path to your signUp function
import Image from "next/image";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone,
        formData.address
      );
      router.push("/dashboard"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Sign-up failed:", error);
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Start tracking your expenses effortlessly.
        </p>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Sign-Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Extra Options */}
        <div className="w-full flex justify-between items-center mt-4 text-sm">
          <button
            onClick={() => router.push("/login")}
            className="text-indigo-600 hover:underline"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
