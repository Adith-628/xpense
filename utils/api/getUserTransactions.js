import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const getUserTransactions = async (userId) => {
  try {
    const docRef = collection(db, "transactions");
    const q = query(docRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const transactions = [];

    querySnapshot.forEach((doc) => {
      transactions.push({
        id: doc.id, // Add the document ID
        ...doc.data(), // Add the document data
      });
    });

    console.log("Transactions with IDs", transactions);
    return {
      status: "success",
      data: transactions,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "failed",
      error: err.message,
    };
  }
};
