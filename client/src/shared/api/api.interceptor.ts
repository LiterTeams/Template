import axios from "axios";
import { getContentType } from "./api.helper";
import { tokenService, oauthService } from "@features/auth/services";
import { timeToMs } from "../lib/helpers/system";

interface FailedRequest {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: timeToMs("10s"),
    headers: getContentType(),
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Обработка ошибки сети
        if (error.message === "Network Error") {
            return Promise.reject(error);
        }

        // Обработка ошибки 401 (невалидный токен)
        if (error.response?.status === 401 && originalRequest.url === "/oauth/refresh-access-token") {
            console.error("❌ Ошибка обновления токена: Refresh Token недействителен");
            oauthService.logout(); // Разлогинить пользователя
            return Promise.reject(error);
        }

        // Обработка ошибки 401 (попытка обновить токен)
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Если уже идет процесс обновления токена, ставим запрос в очередь
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
            }

            isRefreshing = true;
            originalRequest._retry = true;

            try {
                console.log("🔄 Обновляем токен...");
                await tokenService.refreshAccessToken(); // Обновляем токен

                // Обрабатываем все запросы в очереди, после того как токен обновлен
                failedQueue.forEach((queuedRequest) => queuedRequest.resolve());
                failedQueue = []; // Очищаем очередь

                isRefreshing = false;
                return axiosInstance(originalRequest); // Повторяем запрос
            } catch (error) {
                console.error("🚨 Ошибка обновления токена:", error);
                failedQueue.forEach((queuedRequest) => queuedRequest.reject(error));
                failedQueue = []; // Очищаем очередь

                isRefreshing = false;
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;