import { createSlice } from "@reduxjs/toolkit";

// Initialize from localStorage
const persistedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: persistedUser || null, // Use persisted user if available
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Sync to localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Clear from localStorage
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
