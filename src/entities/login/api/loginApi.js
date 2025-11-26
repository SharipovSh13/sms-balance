import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApiURL } from "@/shared/lib/api.js";
import { addToken, addRefreshToken } from "@/shared/lib/utils/token.js";
{
  ("");
}
export const login = createAsyncThunk(
  "auth/login",
  async (admin, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiURL.post("/api/sms-users/login", admin);
      addToken(data.access_token);
      addRefreshToken(data.refresh_token);

      return data.data || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Ошибка входа" }
      );
    }
  }
);
