"use client";
import { useRouter } from "@app/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import { oauthService } from "../services";
import { tokenService } from "../services";

import { SignUpProps } from "@shared/types/system/oauth.interfaces";

export const useSignUpMutation = () => {
    const router = useRouter();
    const { mutate:signUp, isPending: isLoadingSignUp } = useMutation({
        mutationKey: ["sign up"],
        mutationFn: (data: SignUpProps) => oauthService.signUp(data),
        onError: (error) => console.warn(`Ошибка регистрации: ${error}`),
        onSuccess: (data) => {
            console.log("Регистрация успешна");
            tokenService.saveAccessToken(data.accessToken);
            router.push("/");
        }
    });

    return { signUp, isLoadingSignUp }
};