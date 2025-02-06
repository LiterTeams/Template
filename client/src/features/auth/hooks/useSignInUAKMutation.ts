"use client";
import { useRouter } from "@app/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import { oauthService } from "../services";
import { tokenService } from "../services";

export const useSignInUAKMutation = () => {
    const router = useRouter();
    const { mutate:signInUAK, isPending: isLoadingsignInUAK } = useMutation({
        mutationKey: ["sign in uak"],
        mutationFn: (UAK: string) => oauthService.signInUAK(UAK),
        onError: (error) => console.warn(`Ошибка авторизации: ${error}`),
        onSuccess: (data) => {
            console.log("Авторизация успешна");
            tokenService.saveAccessToken(data.accessToken);
            router.push("/");
        }
    });

    return { signInUAK, isLoadingsignInUAK }
};