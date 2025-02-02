"use client";
import useValidate from "../validate/useValidate";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

const defaultOptions: ValidateOptionsProps = {
    required: true,
    lengthBetween: [6, 64],
}

export default function usePassword(initialState: string = "", options: ValidateOptionsProps = {}){
    const mergedOptions = { ...defaultOptions, ...options };
    const { value, setValue, error, isValid } = useValidate({initialState, options: mergedOptions});
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    const reset = () => setValue(initialState);

    return { value, error, isValid, handleChange, reset }
}