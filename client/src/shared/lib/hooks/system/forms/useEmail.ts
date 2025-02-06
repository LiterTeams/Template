"use client";
import useValidate from "../validate/useValidate";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

const defaultOptions: ValidateOptionsProps = {
    format: "email",
    required: true,
}

export const useEmail = (initialState: string = "", options: ValidateOptionsProps = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const { value, error, isValid, validate, setValue } = useValidate({initialState, options: mergedOptions});
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    const reset = () => setValue(initialState);

    return { value, error, isValid, handleChange, validate, reset }
}