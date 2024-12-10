import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteTransaction = async (docId) => {
  try {
    const docRef = doc(db, "transactions", docId);
    await deleteDoc(docRef);
    console.log(`Transaction with ID ${docId} deleted.`);
    return { status: "success" };
  } catch (err) {
    console.error(err);
    return {
      status: "failed",
      error: err.message,
    };
  }
};
