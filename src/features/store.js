import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const server = "https://muta-engine.adaptable.app/api/order";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
