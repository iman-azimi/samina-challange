import axios from "axios";
import cookies from "vue-cookies";
import type { ILoginResponse } from "../types/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiManager = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

apiManager.defaults.headers.common["Content-Type"] = "application/json";
const token = cookies.get("token");
apiManager.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const refreshAccessTokenFn = async () => {
  const response = await apiManager.get<ILoginResponse>("auth/refresh");
  return response.data;
};
apiManager.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return apiManager(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default apiManager;
