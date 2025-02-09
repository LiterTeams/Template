"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@shared/lib/hooks/system/general/useToast";
import { oauthService } from "../services";

import { SignInProps } from "@shared/types/system/oauth.interfaces";

export const useSignInMutation = () => {
    const { showToast } = useToast();
    const router = useRouter();
    const { mutate:signIn, isPending: isLoadingSignIn } = useMutation({
        mutationKey: ["sign in"],
        mutationFn: (data: SignInProps) => oauthService.signIn(data),
        onError: (error) => showToast("Ошибка авторизации",error.message,"error"),
        onSuccess: () => {
            showToast("Авторизация","Вход в систему","success");
            router.push("/");
        }
    });

    return { signIn, isLoadingSignIn }
};