import counterReducer from "@/src/features/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
