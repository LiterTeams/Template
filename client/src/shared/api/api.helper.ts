import { AxiosError } from "axios";

export const getContentType = (): Record<string, string> => ({
    "Content-Type": "application/json",
});

export const errorCatch = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;

        return errorMessage
            ? typeof errorMessage === "object"
                ? errorMessage[0]
                : errorMessage
            : error.message;
    }

    return "Произошла неизвестная ошибка";
};