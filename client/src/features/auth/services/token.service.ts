"use client";
import { Cookies } from "react-cookie";
import { AxiosError } from "axios";
import axiosInstance from "@shared/api/api.interceptor";
import { oauthService } from "./oauth.servive";

import { JWTProps } from "@shared/types/system/oauth.interfaces";

class TokenService {
    private cookies = new Cookies();

    getAccessToken = () => this.cookies.get("accessToken") || null;

    saveAccessToken = (accessToken: string) => this.cookies.set("accessToken", accessToken, { path: "/" });

    removeAccessToken = () => this.cookies.remove("accessToken");

    refreshAccessToken = async () => {
        try {
            const response = await axiosInstance.post<JWTProps>("/oauth/refresh-access-token");
            return response.data.accessToken;
        } catch (error) {
            this.removeAccessToken();
            if (error instanceof AxiosError){
                if (error.response?.status === 401) oauthService.logout();
                throw new Error(`Ошибка обновления токена: ${error.response?.data?.message || error.message}`);
            }
            throw new Error(`Ошибка обновления токена: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
        }
    };
}

export const tokenService = new TokenService();