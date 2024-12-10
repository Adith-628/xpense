import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updateBalance = async (userId, amount, type, isDelete = false) => {
  try {
    const balanceRef = doc(db, "userData", userId);

    // get amount from the database
    const docSnap = await getDoc(balanceRef);
    const currentBalance = docSnap.data().balance;

    if (!isDelete) {
      if (type === "credit") {
        amount = parseFloat(currentBalance) + parseFloat(amount);
      } else {
        amount = parseFloat(currentBalance) - parseFloat(amount);
      }
    } else {
      if (type === "credit") {
        amount = parseFloat(currentBalance) - parseFloat(amount);
      } else {
        amount = parseFloat(currentBalance) + parseFloat(amount);
      }
    }

    const docSnapShot = updateDoc(balanceRef, {
      balance: parseFloat(amount),
    });
    return {
      status: "success",
    };
  } catch (err) {
    console.log(err);
    return {
      status: "failed",
      error: err.message,
    };
  }

  // Update the balance
  await setDoc(docRef, { balance: currentBalance + amount });
};
