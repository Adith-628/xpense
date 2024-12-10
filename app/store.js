import counterReducer from "@/src/features/counter/counterSlice";
import transactionReducer from "@/src/features/transaction/transactionSlice";
import userReducer from "@/src/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    counter: counterReducer,
    transaction: transactionReducer,
    user: userReducer,
  },
});
