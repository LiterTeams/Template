"use client";
import { useCallback } from "react";
import { useError } from "../general";

import { 
    checkLanguage, hasSpace, isLowerCase, hasLetters, hasDigits, 
    isUpperCase, isUpperCaseFirstLetter, hasSpecialCharacters,
} from "@shared/lib/helpers/system";

import { formatPatterns } from "@shared/config/patterns";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

const ERROR_MESSAGES = {
    language: "language",
    trim: "trim",
    lowercase: "lowercase",
    uppercase: "uppercase",
    capitalize: "capitalize",
    specialChars: "special-chars",
    typeInt: "type-int",
    typeStr: "type-str",
    comparePassword: "compare-password",
    strMin: "str-min",
    strMax: "str-max",
    email: "email",
    tel: "tel",
    url: "url",
    IP: "IP",
    uuid: "uuid",
} as const;

export const useValidateString = (options?: ValidateOptionsProps) => {
    const { error, setError, clearError } = useError(null);

    const validate = useCallback((inputValue: string): boolean => {
        if (!options) return true;
        
        const lengthMin = options.lengthBetween ? options.lengthBetween[0] : options.lengthMin || 0;
        const lengthMax = options.lengthBetween ? options.lengthBetween[1] : options.lengthMax || Infinity;

        const validations = [
            { condition: options.lang && !checkLanguage(inputValue, options.lang), errorKey: ERROR_MESSAGES.language },
            { condition: options.trim && hasSpace(inputValue), errorKey: ERROR_MESSAGES.trim },
            { condition: options.lowercase && !isLowerCase(inputValue), errorKey: ERROR_MESSAGES.lowercase },
            { condition: options.uppercase && !isUpperCase(inputValue), errorKey: ERROR_MESSAGES.uppercase },
            { condition: options.capitalize && !isUpperCaseFirstLetter(inputValue), errorKey: ERROR_MESSAGES.capitalize },
            { condition: options.noSpecialChars && hasSpecialCharacters(inputValue), errorKey: ERROR_MESSAGES.specialChars },
            { condition: options.onlyDigits && !hasDigits(inputValue), errorKey: ERROR_MESSAGES.typeInt },
            { condition: options.onlyLetters && !hasLetters(inputValue), errorKey: ERROR_MESSAGES.typeStr },
            { condition: options.compareWith && inputValue !== options.compareWith, errorKey: ERROR_MESSAGES.comparePassword },
            { condition: options.format && options.format in formatPatterns && !formatPatterns[options.format]?.test(inputValue), errorKey: options.format ? ERROR_MESSAGES[options.format as keyof typeof ERROR_MESSAGES] : undefined },
            { condition: inputValue.length < lengthMin, errorKey: ERROR_MESSAGES.strMin, value: lengthMin },
            { condition: inputValue.length > lengthMax, errorKey: ERROR_MESSAGES.strMax, value: lengthMax },
        ];

        for (const { condition, errorKey, value } of validations) {
            if (condition) {
                if (errorKey) setError(errorKey, value);
                return false;
            }
        }

        clearError();
        return true;
    }, [clearError, options, setError]);

    return { validate, error };
}
