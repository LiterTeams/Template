"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@shared/lib/hooks/system/general/useToast";
import { oauthService } from "../services";

import { SignUpProps } from "@shared/types/system/oauth.interfaces";

export const useSignUpMutation = () => {
    const { showToast } = useToast();
    const router = useRouter();
    const { mutate:signUp, isPending: isLoadingSignUp } = useMutation({
        mutationKey: ["sign up"],
        mutationFn: (data: SignUpProps) => oauthService.signUp(data),
        onError: (error) => showToast("Ошибка регистрации",error.message,"error"),
        onSuccess: () => {
            showToast("Регистрация","Root пользователь создан","success");
            router.push("/");
        }
    });

    return { signUp, isLoadingSignUp }
};