import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/entities/login/reducer/authSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
