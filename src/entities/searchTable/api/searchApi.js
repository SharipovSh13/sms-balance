import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApiURL } from "@/shared/lib/api";

export const getSearch = createAsyncThunk(
  "search/getSearch",
  async (search = "", { rejectWithValue }) => {
    const query = search.trim() || "";
    try {
      const { data } = await axiosApiURL.get(`/api/sms-users?q=${query}`);
      return data?.data || data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Ошибка запроса" }
      );
    }
  }
);
