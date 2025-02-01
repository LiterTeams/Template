"use client";

import { useState, useEffect } from "react";
import useError from "./useError";
import { ValidateOptionsProps } from "@shared/types/validate.interfaces";

interface useValidateProps {
    initialState: string | number | Date | File | File[] | null;
    options?: ValidateOptionsProps;
}

export default function useValidate({ initialState = null, options }: useValidateProps) {
    const [value, setValue] = useState<typeof initialState>(initialState);
    const [error, setError] = useError();

    // Функция валидации
    const validate = (inputValue: typeof initialState) => {
        let errorMessage = "";

        if (!options) return true;

        // Проверка на required
        if (options.required && !inputValue) {
            errorMessage = "Поле обязательно для заполнения.";
        }

        // Проверка формата (email, url, tel и т.д.)
        if (options.format) {
            const formatPatterns: Record<string, RegExp> = {
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                tel: /^\+?\d{10,15}$/,
                url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                IP: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
                uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
            };

            if (options.format in formatPatterns && !formatPatterns[options.format].test(String(inputValue))) {
                errorMessage = `Неверный формат: ${options.format}`;
            }
        }

        // Валидация длины
        if (typeof inputValue === "string" && options.lengthMin && inputValue.length < options.lengthMin) {
            errorMessage = `Минимальная длина — ${options.lengthMin} символов.`;
        }
        if (typeof inputValue === "string" && options.lengthMax && inputValue.length > options.lengthMax) {
            errorMessage = `Максимальная длина — ${options.lengthMax} символов.`;
        }

        // Валидация чисел
        if (typeof inputValue === "number") {
            if (options.quantityMin && inputValue < options.quantityMin) {
                errorMessage = `Число должно быть не меньше ${options.quantityMin}.`;
            }
            if (options.quantityMax && inputValue > options.quantityMax) {
                errorMessage = `Число должно быть не больше ${options.quantityMax}.`;
            }
        }

        // Валидация даты
        if (inputValue instanceof Date) {
            if (options.dateMin && inputValue < new Date(options.dateMin)) {
                errorMessage = `Дата не должна быть раньше ${options.dateMin}.`;
            }
            if (options.dateMax && inputValue > new Date(options.dateMax)) {
                errorMessage = `Дата не должна быть позже ${options.dateMax}.`;
            }
        }

            if (errorMessage) {setError(errorMessage); return false;}
            else {setError(null); return true;
        }
    };

    // Обработчик изменения значения
    const handleChange = (newValue: typeof value) => {
        setValue(newValue);
        validate(newValue);
    };

    // Автовалидация при загрузке
    useEffect(() => {
        validate(value);
    }, [value]);

    return { value, setValue: handleChange, error, isValid: !error };
}
