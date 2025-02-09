"use client";
import { useState } from "react";
import { useValidate } from "../validate";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

const defaultOptions: ValidateOptionsProps = {
    required: true,
    lengthBetween: [6, 64],
}

export const usePassword = (initialState: string = "", options: ValidateOptionsProps = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const [isVisible, setIsVisible] = useState(false);
    const { value, error, isValid, validate, setValue } = useValidate({initialState, options: mergedOptions});
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const toggleVisible = () => setIsVisible(prev => !prev);
    
    const reset = () => setValue(initialState);

    return { value, error, isValid, isVisible, handleChange, toggleVisible, validate, reset }
}