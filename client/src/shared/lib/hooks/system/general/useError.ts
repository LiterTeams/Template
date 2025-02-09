"use client";
import { useCallback, useMemo, useState } from "react";
import errors from "@shared/config/errors";

export const useError = (initialState: string | null = null, lang: "ru" | "eng" | "deu" = "ru") => {
    const [error, setError] = useState<string | null>(initialState);
    const errorsLang = useMemo(() => errors[lang], [lang]);

    const updateError = useCallback((newError: string) => setError(newError), []);

    const setErrorType = useCallback((errorType: string, value?: string | number) => {
        const replacements: Record<string, string> = {
            "required": errorsLang.required,
            "str-min": errorsLang.min.str.replace(":value", String(value)),
            "str-max": errorsLang.max.str.replace(":value", String(value)),
            "int-min": errorsLang.min.int.replace(":value", String(value)),
            "int-max": errorsLang.max.int.replace(":value", String(value)),
            "file-min": errorsLang.min.file.replace(":value", String(value)),
            "file-max": errorsLang.max.file.replace(":value", String(value)),
            "date-min": errorsLang.min.date.replace(":value", String(value)),
            "date-max": errorsLang.max.date.replace(":value", String(value)),
            "email": errorsLang.format.email,
            "tel": errorsLang.format.tel,
            "url": errorsLang.format.url,
            "IP": errorsLang.format.IP,
            "uuid": errorsLang.format.uuid,
            "special-chars": errorsLang.special.chars,
            "type-int": errorsLang.type.int,
            "type-str": errorsLang.type.str,
            "special-whitespace": errorsLang.special.whitespace,
            "lowercase": errorsLang.special.lowercase,
            "uppercase": errorsLang.special.uppercase,
            "capitalize": errorsLang.special.capitalize,
            "regex": errorsLang.regex,
            "language": errorsLang.lang[lang],
            "compare-password": errorsLang.compare.password,
            "mimes": errorsLang.mimes.replace(":value", String(value)),
        };

        setError(replacements[errorType] || null);
    }, [errorsLang, lang]);

    const clearError = useCallback(() => setError(null), []);

    return { error, setError: setErrorType, updateError, clearError };
}
