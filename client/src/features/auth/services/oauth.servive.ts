import { AxiosError } from "axios";
import axiosInstance from "@shared/api/api.interceptor";

import { SignInProps, SignUpProps, OauthResponseProps } from "@shared/types/system/oauth.interfaces";

class OauthService {

    signUp = async (data: SignUpProps) => {
        try {
            const response = await axiosInstance.post<OauthResponseProps>("/oauth/sign-up", data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) throw new Error(`Ошибка регистрации: ${error.response?.data?.message || error.message}`);
            throw new Error(`Ошибка регистрации: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
        }
    }

    signIn = async (data: SignInProps) => {
        try {
            const response = await axiosInstance.post<OauthResponseProps>("/oauth/sign-in", data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) throw new Error(`Ошибка авторизации: ${error.response?.data?.message || error.message}`);
            throw new Error(`Ошибка авторизации: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
        }
    }

    signInUAK = async (UAK: string) => {
        try {
            const response = await axiosInstance.post<OauthResponseProps>("/oauth/uak", UAK);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) throw new Error(`Ошибка авторизации: ${error.response?.data?.message || error.message}`);
            throw new Error(`Ошибка авторизации: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
        }
    }

    logout = async () => {
        try {
            const response = await axiosInstance.post<OauthResponseProps>("/oauth/logout");
            return response;
        } catch (error) {
            if (error instanceof AxiosError) throw new Error(`Ошибка выхода: ${error.response?.data?.message || error.message}`);
            throw new Error(`Ошибка выхода: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
        }
    }
}

export const oauthService = new OauthService();