import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const server = "http://localhost:4000/api/order";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
