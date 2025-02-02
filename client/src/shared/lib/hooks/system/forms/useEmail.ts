"use client";
import useValidate from "../validate/useValidate";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

const defaultOptions: ValidateOptionsProps = {
    format: "email",
    required: true,
}

export default function useEmail(initialState: string = "", options: ValidateOptionsProps = {}){
    const mergedOptions = { ...defaultOptions, ...options };
    const { value, setValue, error, isValid } = useValidate({initialState, options: mergedOptions});
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    const reset = () => setValue(initialState);

    return { value, error, isValid, handleChange, reset }
}