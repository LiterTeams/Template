import { useCallback } from "react";
import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";
import useError from "../general/useError";

export default function useValidateNumber(options?: ValidateOptionsProps) {
    const { error, setError, clearError } = useError(null);

    const validate = useCallback((inputValue: number): boolean => {
        if (!options) return true;

        const min = options.quantityBetween ? options.quantityBetween[0] : options.quantityMin || 0;
        const max = options.quantityBetween ? options.quantityBetween[1] : options.quantityMax || Infinity;

        if (inputValue < min) { setError("int-min", min); return false; }
        if (inputValue > max) { setError("int-max", max); return false; }

        clearError();
        return true;
    }, [clearError, options, setError]);

    return { validate, error };
}
