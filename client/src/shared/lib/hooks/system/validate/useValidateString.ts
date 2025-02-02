"use client";
import { useCallback } from "react";
import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";
import useError from "../general/useError";
import checkLanguage from "@shared/lib/helpers/system/checkLanguage";
import hasSpace from "@shared/lib/helpers/system/hasSpace";
import isLowerCase from "@shared/lib/helpers/system/isLowerCase";
import isUpperCase from "@shared/lib/helpers/system/isUpperCase";
import isUpperCaseFirstLetter from "@shared/lib/helpers/system/isUpperCaseFirstLetter";
import hasSpecialCharacters from "@shared/lib/helpers/system/hasSpecialCharacters";
import hasDigits from "@shared/lib/helpers/system/hasDigits";
import hasLetters from "@shared/lib/helpers/system/hasLetters";
import { formatPatterns } from "@shared/config/patterns";

export default function useValidateString(options?: ValidateOptionsProps) {
    const { error, setError, clearError } = useError(null);

    const validate = useCallback((inputValue: string): boolean => {
        if (!options) return true;

        if (options.lang && !checkLanguage(inputValue, options.lang)) {setError("language"); return false;}
        if (options.trim && hasSpace(inputValue)) { setError("trim"); return false; }
        if (options.lowercase && !isLowerCase(inputValue)) { setError("lowercase"); return false; }
        if (options.uppercase && !isUpperCase(inputValue)) { setError("uppercase"); return false; } // Error
        if (options.capitalize && !isUpperCaseFirstLetter(inputValue)) { setError("capitalize"); return false; } // Error
        if (options.noSpecialChars && hasSpecialCharacters(inputValue)) { setError("special-chars"); return false; }
        if (options.onlyDigits && !hasDigits(inputValue)) { setError("type-int"); return false; }
        if (options.onlyLetters && !hasLetters(inputValue)) { setError("type-str"); return false; }

        if (options.compareWith && inputValue !== options.compareWith) {setError("compare-password"); return false;}

        if (options.format && options.format in formatPatterns){
            const format = options.format;
            if (!formatPatterns[format].test(inputValue)) {setError(format); return false;}
        }

        if (options.lengthMin || options.lengthMax || options.lengthBetween){
            const min = options.lengthBetween ? options.lengthBetween[0] : options.lengthMin || 0;
            const max = options.lengthBetween ? options.lengthBetween[1] : options.lengthMax || Infinity;

            if (inputValue.length < min) { setError("str-min", min); return false; }
            if (inputValue.length > max) { setError("str-max", max); return false; }
        }

        clearError();
        return true;
    }, [clearError, options, setError]);

    return { validate, error };
}
