"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@shared/lib/hooks/system/general/useToast";
import { oauthService } from "../services";

export const useSignInUAKMutation = () => {
    const { showToast } = useToast();
    const router = useRouter();
    const { mutate:signInUAK, isPending: isLoadingsignInUAK } = useMutation({
        mutationKey: ["sign in uak"],
        mutationFn: (UAK: string) => oauthService.signInUAK(UAK),
        onError: (error) => showToast("Ошибка авторизации",error.message,"error"),
        onSuccess: () => {
            showToast("Авторизация","Вход в систему через UAK","success");
            router.push("/");
        }
    });

    return { signInUAK, isLoadingsignInUAK }
};