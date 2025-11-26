import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/loginApi";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    succsess: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.succsess = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
