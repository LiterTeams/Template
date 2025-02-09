"use client";
import { useState } from "react";
import { useError } from "../general";
import { useValidateString, useValidateNumber, useValidateFile, useValidateDate } from "./index";
import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

interface useValidateProps<T> {
    initialState: T;
    options: ValidateOptionsProps;
}

const defaultOptions: ValidateOptionsProps = {
    autoValidate: true,
}

export const useValidate = <T>({ initialState, options = {} }: useValidateProps<T>) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const [value, setValue] = useState<T>(initialState);
    const { error, setError, updateError, clearError } = useError(null);

    const { validate: validateString, error: validateStringError } = useValidateString(mergedOptions);
    const { validate: validateNumber, error: validateNumberError } = useValidateNumber(mergedOptions);
    const { validate: validateFile, error: validateFileError } = useValidateFile(mergedOptions);
    const { validate: validateDate, error: validateDateError } = useValidateDate(mergedOptions);

    const validate = (inputValue: T) => {
        if (!mergedOptions) return true;

        if (mergedOptions.required && !inputValue) {
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
        if (mergedOptions.autoValidate) validate(newValue);
    };

    return { value, validate, setValue: handleChange, error, isValid: !error };
}
