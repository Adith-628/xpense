"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/src/store";
import { supabase } from "@/utils/supabase";

const UserProfile = () => {
  const { user, setUser } = useStore(); // Zustand store for global state
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    total_balance: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        total_balance: user.total_balance || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async () => {
    const { total_balance, phone, address } = formData;
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ total_balance, phone, address })
        .eq("id", user.id);

      if (error) throw error;

      // Update global store after successful update
      setUser({ ...user, total_balance, phone, address });
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="h-svh w-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <Image
            src="/profile-avatar.png"
            alt="Profile"
            width={80}
            height={80}
            className="mb-4 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Balance
            </label>
            <input
              type="number"
              id="total_balance"
              value={formData.total_balance}
              onChange={handleChange}
              disabled={!editMode}
              className={`mt-1 block w-full px-4 py-2 border ${
                editMode ? "border-gray-300" : "border-transparent"
              } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editMode}
              className={`mt-1 block w-full px-4 py-2 border ${
                editMode ? "border-gray-300" : "border-transparent"
              } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editMode}
              className={`mt-1 block w-full px-4 py-2 border ${
                editMode ? "border-gray-300" : "border-transparent"
              } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
