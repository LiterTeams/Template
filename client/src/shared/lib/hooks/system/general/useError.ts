"use client";
import { useState } from "react";

import errors from "@shared/config/errors";

export default function useError(initialState: string | null = null, lang: "ru" | "eng" | "deu" = "ru"){
    const [error, setError] = useState(initialState);
    const errorsLang = errors[lang];

    const updateError = (newError: string) => setError(newError);

    const setErrorType = (errorType: string, value?: string | number) => {
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
            "email": errorsLang.format.email.replace(":value", String(value)),
            "tel": errorsLang.format.tel.replace(":value", String(value)),
            "url": errorsLang.format.url.replace(":value", String(value)),
            "IP": errorsLang.format.IP.replace(":value", String(value)),
            "uuid": errorsLang.format.uuid.replace(":value", String(value)),
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
    };

    const clearError = () => setError(null);

    return { error, setError: setErrorType, updateError, clearError }
}