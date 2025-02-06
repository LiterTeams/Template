import axios from "axios";
import { getContentType } from "./api.helper";
import { tokenService } from "@features/auth/services";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 2000,
    headers: getContentType(),
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = tokenService.getAccessToken();
    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            originalRequest._retry = originalRequest._retry ?? 0;

            if (!originalRequest._retry) originalRequest._retry = 0;
            
            if (originalRequest._retry >= 3) {
                console.warn("🚨 Достигнуто максимальное количество попыток обновления токена");
                return Promise.reject(error);
            }

            originalRequest._retry++;

            try {
                console.log(`🔄 Попытка обновления токена #${originalRequest._retry}`);

                const newAccessToken = await tokenService.refreshAccessToken();
                if (!newAccessToken) throw new Error("Failed to refresh access token");

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("🚨 Ошибка обновления токена:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;