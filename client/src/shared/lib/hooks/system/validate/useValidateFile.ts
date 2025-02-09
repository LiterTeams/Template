"use client";
import { useCallback } from "react";
import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";
import { useError } from "../general";

import { convertFileSize, checkFileFormat, fileDestructurization } from "@shared/lib/helpers/system";

export const useValidateFile = (options?: ValidateOptionsProps) => {
    const { error, setError, clearError } = useError(null);

    const validate = useCallback((inputValue: File): boolean => {
        if (!options) return true;

        if (options.sizeMin || options.sizeMax || options.sizeBetween) {
            const min = convertFileSize(options.sizeBetween ? options.sizeBetween[0] : options.sizeMin || "0 B");
            const max = convertFileSize(options.sizeBetween ? options.sizeBetween[1] : options.sizeMax || "0 B");

            if (inputValue.size < min) { setError("file-min", options.sizeMin); return false; }
            if (inputValue.size > max) { setError("file-max", options.sizeMax); return false; }
        }

        if (options.extensions) {
            const { extension } = fileDestructurization(inputValue);
            if (!checkFileFormat(extension, options.extensions)) {
                const extensions = Array.isArray(options.extensions) ? options.extensions.join(" | ") : options.extensions;
                setError("mimes", extensions);
                return false;
            }
        }

        clearError();
        return true;
    }, [clearError, options, setError]);

    return { validate, error };
}
