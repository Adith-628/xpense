import { db } from "@/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

export const fetchBalance = createAsyncThunk(
  "transaction/fetchBalance",
  async (userId) => {
    const docRef = doc(db, "userData", "xnzZNrWNO48O5Vx3Ha5y"); // Adjust path as per your Firestore structure
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().balance; // Assume balance is stored in the 'balance' field
    } else {
      throw new Error("No such document!");
    }
  }
);
