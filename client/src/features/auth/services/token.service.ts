"use client";
import { AxiosError } from "axios";
import axiosInstance from "@shared/api/api.interceptor";
import { oauthService } from "./oauth.servive";

import { JWTProps } from "@shared/types/system/oauth.interfaces";

class TokenService {

    refreshAccessToken = async () => {
        try {
            const response = await axiosInstance.post<JWTProps>("/oauth/refresh-access-token");
            return response.data.accessToken;
        } catch (error) {
            if (error instanceof AxiosError){
                if (error.response?.status === 401) oauthService.logout();
                throw new Error(`Ошибка обновления токена: ${error.response?.data?.message || error.message}`);
            }
            throw new Error(`Ошибка обновления токена: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
        }
    };
}

export const tokenService = new TokenService();