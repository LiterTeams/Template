import { useState } from "react";
import useError from "../general/useError";
import useValidateString from "./useValidateString";
import useValidateNumber from "./useValidateNumber";
import useValidateFile from "./useValidateFile";
import useValidateDate from "./useValidateDate";
import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

interface useValidateProps<T> {
    initialState: T;
    options?: ValidateOptionsProps;
}

export default function useValidate<T>({ initialState, options }: useValidateProps<T>) {
    const [value, setValue] = useState<T>(initialState);
    const { error, setError, updateError, clearError } = useError(null);

    const { validate: validateString, error: validateStringError } = useValidateString(options);
    const { validate: validateNumber, error: validateNumberError } = useValidateNumber(options);
    const { validate: validateFile, error: validateFileError } = useValidateFile(options);
    const { validate: validateDate, error: validateDateError } = useValidateDate(options);

    const validate = (inputValue: T) => {
        if (!options) return true;

        if (options.required && !inputValue) {
            setError("required");
            return;
        }

        if (typeof inputValue === "string" && !validateString(inputValue)){
            if (validateStringError) updateError(validateStringError);
            return;
        };
        if (typeof inputValue === "number" && !validateNumber(inputValue)){
            if (validateNumberError) updateError(validateNumberError);
            return;
        };
        if (inputValue instanceof File && !validateFile(inputValue)){
            if (validateFileError) updateError(validateFileError);
            return;
        };
        if (inputValue instanceof Date && !validateDate(inputValue)){
            if (validateDateError) updateError(validateDateError);
            return;
        };

        clearError();
    };

    const handleChange = (newValue: T) => {
        setValue(newValue);
        validate(newValue);
    };

    return { value, setValue: handleChange, error, isValid: !error };
}
