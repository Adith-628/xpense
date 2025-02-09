"use client";
import LoginForm from "@/src/components/organisms/LoginForm";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

import { initAuth } from "@/utils/auth";

const HomePage = () => {
  const router = useRouter();

  React.useEffect(() => {
    initAuth();
  }, []);

  return (
    <div className="h-svh w-screen flex items-center bg-slate-50 justify-center p-1">
      <div className=" font-fira  flex flex-col justify-end gap-5 items-centertext-center px-4">
        {/* Logo */}
        <div className="flex flex-col items-center ">
          <Image
            src="/logo2.png"
            unoptimized
            alt="Xpense Logo"
            width={100}
            height={100}
          />

          <Image
            src="/3d-plant.png"
            unoptimized
            alt="Xpense Logo"
            width={200}
            height={100}
            className="max-w-2/3 "
          />
        </div>

        {/* Catchy Tagline */}
        <div className="p-2">
          <h1 className="text-4xl self-start  leading-10 text-left font-bold text-gray-800">
            Take Control of Your <br /> Finances Today!
          </h1>
          <p className="text-gray-600 text-left  mt-2 max-w-md">
            Monitor your expenses, plan your budget, and achieve your financial
            goals with ease.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-6 flex w-full max-w-md flex-col gap-4 mb-8">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 w-full py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
