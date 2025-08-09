"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/src/store";
import { profileAPI } from "@/utils/api";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  KeyIcon,
  ShieldCheckIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { user, setUser, signOut } = useStore();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Fetch fresh profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getProfile();
      if (response.success) {
        setUser(response.data);
        setFormData({
          fullName: response.data.fullName || response.data.name || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          email: response.data.email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // Update profile
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await profileAPI.updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      });

      if (response.success) {
        setUser({ ...user, ...response.data });
        setEditMode(false);
        setSuccess("Profile updated successfully!");
      } else {
        setError(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await profileAPI.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordChange(false);
        setSuccess("Password updated successfully!");
      } else {
        setError(response.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update failed:", error);
      setError(
        "Failed to update password. Please check your current password."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        await signOut();
        router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  // Refresh profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading && !user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {user?.fullName || user?.name || "User"}
                  </h1>
                  <p className="text-indigo-100">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Profile Information */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <EditIcon className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm transition-colors ${
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MailIcon className="h-4 w-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-transparent bg-gray-50 rounded-lg shadow-sm text-gray-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm transition-colors ${
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="Enter your address"
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm transition-colors ${
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>
            </div>

            {/* Edit Mode Buttons */}
            {editMode && (
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setEditMode(false);
                    setError("");
                    setSuccess("");
                    // Reset form data
                    if (user) {
                      setFormData({
                        fullName: user.fullName || user.name || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        email: user.email || "",
                      });
                    }
                  }}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <XIcon className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SaveIcon className="h-4 w-4" />
                  <span>{loading ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="border-t border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Security Settings
              </h2>
              {!showPasswordChange && (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <KeyIcon className="h-4 w-4" />
                  <span>Change Password</span>
                </button>
              )}
            </div>

            {/* Change Password Form */}
            {showPasswordChange && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setShowPasswordChange(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setError("");
                      setSuccess("");
                    }}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <XIcon className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={
                      loading ||
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SaveIcon className="h-4 w-4" />
                    <span>{loading ? "Updating..." : "Update Password"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
