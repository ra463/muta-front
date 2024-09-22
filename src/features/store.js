import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const server = "https://muta-front.vercel.app/api/order";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
