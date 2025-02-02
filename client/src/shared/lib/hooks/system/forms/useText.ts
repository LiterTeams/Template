"use client";
import useValidate from "../validate/useValidate";

import { ValidateOptionsProps } from "@shared/types/system/validate.interfaces";

export default function useText(initialState: string = "", options: ValidateOptionsProps = {}){
    const { value, setValue, error, isValid } = useValidate({initialState, options});
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    const reset = () => setValue(initialState);

    return { value, error, isValid, handleChange, reset }
}