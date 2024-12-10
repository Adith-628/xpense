import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { fetchBalance } from "./asyncFn";

// Async thunk to fetch initial balance from Firebase

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    balance: null, // Will be updated after Firebase fetch
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    credit: (state, action) => {
      state.balance += action.payload; // Increase balance
    },
    debit: (state, action) => {
      state.balance -= action.payload; // Decrease balance
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { credit, debit } = transactionSlice.actions;

export default transactionSlice.reducer;
