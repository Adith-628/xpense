import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

//add transaction to firestore
export const addTransaction = async (transaction) => {
  try {
    const data = {
      ...transaction,
      createdAt: new Date(),
      userId: "xnzZNrWNO48O5Vx3Ha5y",
    };

    const transactionRef = collection(db, "transactions");

    const docRef = await addDoc(transactionRef, data);
    console.log("Document written with ID: ", docRef.id);
    return {
      status: "success",
      docId: docRef.id,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "failed",
      error: err.message,
    };
  }
};
