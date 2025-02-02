import { useCallback } from "react";
import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";
import useError from "../general/useError";

export default function useValidateDate(options?: ValidateOptionsProps) {
    const { error, setError, clearError } = useError(null);

    const validate = useCallback((inputValue: Date): boolean => {
        if (!options) return true;

        const min = new Date(options.dateBetween ? options.dateBetween[0] : options.dateMin || 0);
        const max = new Date(options.dateBetween ? options.dateBetween[1] : options.dateMax || 0);

        if (inputValue < min) { setError("date-min", min.toISOString()); return false; }
        if (inputValue > max) { setError("date-max", max.toISOString()); return false; }

        clearError();
        return true;
    }, [clearError, options, setError]);

    return { validate, error };
}
