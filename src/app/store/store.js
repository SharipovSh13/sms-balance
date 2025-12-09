import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/entities/login/reducer/authSlice.js";
import searchReducer from "@/entities/searchTable/reducer/searchSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});
