import { createSlice } from "@reduxjs/toolkit";
import { getSearch } from "../api/searchApi.js";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.searchData = action.payload;
    });
  },
});

export default searchSlice.reducer;
