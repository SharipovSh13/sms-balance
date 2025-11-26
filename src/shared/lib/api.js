import axios from "axios";
import {
  getToken,
  getRefreshToken,
  addToken,
  removeToken,
  removeRefreshToken,
} from "@/shared/lib/utils/token.js";

export const axiosApiURL = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

// Подставляем access_token в каждый запрос
axiosApiURL.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Обработка 401 и автоматический refresh
axiosApiURL.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        removeToken();
        removeRefreshToken();
        window.location.href = "/"; // редирект на логин
        return;
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_API}/api/sms-users/refresh`,
          { refresh_token: refreshToken }
        );
        addToken(data.access_token);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        return axiosApiURL(originalRequest); // повторяем исходный запрос
      } catch (err) {
        removeToken();
        removeRefreshToken();
        window.location.href = "/";
        console.log(err);
      }
    }

    return Promise.reject(error);
  }
);
