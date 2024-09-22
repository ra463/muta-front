import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const server = "https://muta-back.onrender.com/api/order";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
