"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@shared/lib/hooks/system/general/useToast";
import { oauthService } from "../services";

export const useLogoutMutation = () => {
    const { showToast } = useToast();
    const router = useRouter();
    const { mutate:logout, isPending: isLoadingLogout } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => oauthService.logout(),
        onError: (error) => showToast("Ошибка деавторизации",error.message,"error"),
        onSuccess: () => {
            showToast("Деавторизация","Выход из системы","success");
            router.push("/");
        }
    });

    return { logout, isLoadingLogout }
};