"use client";

import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";
import { signOut } from "@/utils/auth";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { user } = useStore();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="bg-white border-b w-full">
      <div className="w-full  px-2 py-2 flex justify-between items-center">
        <div className="flex  items-center gap-4">
          <div className="">
            <Image
              className="rounded-full object-contain"
              src={"/profile.jpg"}
              alt="profile"
              width={40}
              height={40}
            />
          </div>
          <div className="font-urbanist ">
            <h3 className="text-xs text-gray-800">Welcome! </h3>
            <h1 className="text-lg font-bold text-gray-900 ">{user?.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
