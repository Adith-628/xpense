import { useStore } from "@/src/store";
import { authAPI, profileAPI } from "./api";

export async function signIn(email, password) {
  try {
    const response = await authAPI.login(email, password);

    if (response.user) {
      // Fetch user profile details
      const profile = await profileAPI.getProfile();

      // Store user details in Zustand
      useStore.getState().setUser({
        id: response.user.id,
        email: response.user.email || "",
        fullName: response.user.fullName || "",
        ...profile.data,
      });
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
}

export async function signOut() {
  try {
    await authAPI.logout();
    useStore.getState().setUser(null);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
}

export async function signUp(email, password, fullName, phone, address) {
  try {
    // Sign up the user with email, password, and fullName
    const response = await authAPI.register(email, password, fullName);

    if (response.user) {
      // Store user details in Zustand
      useStore.getState().setUser({
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.fullName,
        phone: phone || "",
        address: address || "",
      });
    }
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
}

export async function initAuth() {
  try {
    // Check if we have an auth token
    const token = localStorage.getItem("authToken");

    if (token) {
      // Try to fetch profile to verify token is valid
      const profile = await profileAPI.getProfile();

      if (profile.data) {
        useStore.getState().setUser({
          id: profile.data.id,
          email: profile.data.email || "",
          fullName: profile.data.fullName || "",
          phone: profile.data.phone || "",
          address: profile.data.address || "",
          total_balance: profile.data.total_balance || 0,
        });
      }
    }
  } catch (error) {
    console.error("Error initializing auth:", error);
    // If token is invalid, clear it
    localStorage.removeItem("authToken");
    useStore.getState().setUser(null);
  }
}
