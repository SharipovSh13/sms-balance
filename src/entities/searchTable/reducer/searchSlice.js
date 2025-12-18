import { createSlice } from "@reduxjs/toolkit";
import { getSearch, getHistoryById } from "../api/searchApi.js";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
    historyData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.searchData = action.payload;
    });
    builder.addCase(getHistoryById.fulfilled, (state, action) => {
      state.historyData = action.payload;
    });
  },
});

export default searchSlice.reducer;
