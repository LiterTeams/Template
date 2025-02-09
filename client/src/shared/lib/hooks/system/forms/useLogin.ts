"use client";
import { useValidate } from "../validate";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

const defaultOptions: ValidateOptionsProps = {
    lengthBetween: [6,36],
    lang: "eng",
    required: true,
    autoValidate: true,
}

export const useLogin = (initialState: string = "", options: ValidateOptionsProps = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const { value, error, isValid, validate, setValue } = useValidate({initialState, options: mergedOptions});
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    const reset = () => setValue(initialState);

    return { value, error, isValid, handleChange, validate, reset }
}